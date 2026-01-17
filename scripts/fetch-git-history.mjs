import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repos = [
  { id: 'ff-story', name: 'Story', path: '../../ff-story', branch: 'main', versionFile: 'VERSION', repoUrl: 'https://github.com/clevertree/ff-story' },
  { id: 'ff-teaser', name: 'Teaser', path: '../../ff-teaser', branch: 'main', versionFile: 'VERSION', repoUrl: 'https://github.com/clevertree/ff-teaser' },
  { id: 'forgotten-future-site', name: 'Site', path: '../', branch: 'master', versionFile: 'package.json', repoUrl: 'https://github.com/clevertree/forgotten-future-site' }
];

function getGitHistory() {
  const history = {};

  for (const r of repos) {
    const repoPath = path.resolve(__dirname, r.path);
    console.log(`Processing local repo: ${r.name} at ${repoPath}`);
    
    if (!fs.existsSync(repoPath)) {
      console.warn(`Warning: Repository path ${repoPath} does not exist. Skipping local fetch.`);
      continue;
    }

    try {
      // Get commits
      const gitLog = execSync('git log --oneline -n 3', { cwd: repoPath }).toString();
      const commits = gitLog.trim().split('\n').map(line => {
        const [sha, ...msgParts] = line.split(' ');
        return {
          sha,
          message: msgParts.join(' '),
          url: `${r.repoUrl}/commit/${sha}` 
        };
      });

      // Get version
      let version = 'v0.0.0';
      const versionPath = path.join(repoPath, r.versionFile);
      if (fs.existsSync(versionPath)) {
        const content = fs.readFileSync(versionPath, 'utf8').trim();
        if (r.versionFile === 'package.json') {
          version = `v${JSON.parse(content).version}`;
        } else {
          version = `v${content}`;
        }
      }

      history[r.id] = {
        name: r.name,
        version,
        commits,
        repoUrl: `${r.repoUrl}/commits/${r.branch}/`
      };
    } catch (e) {
      console.error(`Error processing repo ${r.name}: ${e.message}`);
    }
  }

  const outputPath = path.join(__dirname, '..', 'lib', 'git-history.json');
  fs.writeFileSync(outputPath, JSON.stringify(history, null, 2));
  console.log(`Successfully updated git history from local repos at ${outputPath}`);
}

getGitHistory();
