import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { getServerSession } from "next-auth/next";

const octokit = new Octokit({
    auth: process.env.GITHUB_APP_TOKEN,
});

const REPO_OWNER = "clevertree";
const REPO_NAME = "ff-story";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { path, anchorId, comment, author, email, isAnonymous } = data;

        if (!comment || !path || !anchorId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // 1. Generate unique filename and branch name
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const sanitizedAuthor = author.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        const branchName = `feedback/${sanitizedAuthor}-${timestamp}`;
        const fileName = `comments/${path === 'manuscript' ? 'chapters' : 'media'}/${anchorId}/${sanitizedAuthor}-${timestamp}.md`;

        // 2. Prepare file content
        const fileContent = `---
author: "${author}"
email: "${email}"
path: "${path}"
anchorId: "${anchorId}"
timestamp: "${new Date().toISOString()}"
isAnonymous: ${isAnonymous}
---

${comment}
`;

        // 3. Get the default branch SHA (e.g., main)
        const { data: refData } = await octokit.rest.git.getRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: "heads/main",
        });
        const baseSha = refData.object.sha;

        // 4. Create new branch
        await octokit.rest.git.createRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `refs/heads/${branchName}`,
            sha: baseSha,
        });

        // 5. Create the file
        await octokit.rest.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: fileName,
            message: `Community Feedback from ${author} on ${path}#${anchorId}`,
            content: Buffer.from(fileContent).toString("base64"),
            branch: branchName,
        });

        // 6. Create Pull Request
        const { data: prData } = await octokit.rest.pulls.create({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            title: `Feedback: ${author} on ${anchorId}`,
            head: branchName,
            base: "main",
            body: `### New Community Feedback
      
**Source:** ${path}
**Section:** ${anchorId}
**Author:** ${author} (${isAnonymous ? 'Anonymous' : 'GitHub Verified'})

---
${comment}

---
*Created via Forgotten Future Site Feedback System*`,
        });

        return NextResponse.json({
            message: "Comment submitted successfully as a Pull Request",
            prUrl: prData.html_url
        });

    } catch (error: any) {
        console.error("GitHub API Error:", error);
        return NextResponse.json({
            message: "Failed to submit comment to GitHub",
            error: error.message
        }, { status: 500 });
    }
}
