import os
import re

repo_root = "/home/ari/dev/ff/ff-story"
site_root = "/home/ari/dev/ff/forgotten-future-site"

# 1. Update FULL_MANUSCRIPT.md in site
source_full = os.path.join(repo_root, "manuscript/FULL_MANUSCRIPT.md")
dest_full_dir = os.path.join(site_root, "public/manuscript")
os.makedirs(dest_full_dir, exist_ok=True)
dest_full = os.path.join(dest_full_dir, "FULL_MANUSCRIPT.md")

with open(source_full, "r", encoding="utf-8") as f:
    full_content = f.read()
with open(dest_full, "w", encoding="utf-8") as f:
    f.write(full_content)

# 2. Update individual chapters in site (assuming same structure under public if it existed, or just keep it summarized)
# Currently site points to public/manuscript/text if we had one. Let's create it.
dest_chapters_dir = os.path.join(dest_full_dir, "text")
os.makedirs(dest_chapters_dir, exist_ok=True)

chapters_src_dir = os.path.join(repo_root, "manuscript/text")
chapter_files = sorted([f for f in os.listdir(chapters_src_dir) if f.startswith("chapter_") and f.endswith(".md")])

for filename in chapter_files:
    with open(os.path.join(chapters_src_dir, filename), "r", encoding="utf-8") as f:
        content = f.read()
    with open(os.path.join(dest_chapters_dir, filename), "w", encoding="utf-8") as f:
        f.write(content)

print("Synchronized files to site/public/manuscript")

# 3. Update app/manuscript/page.tsx with new chapter list
def get_title_and_summary(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    # Title from first line # Chapter X: Title
    title_match = re.search(r"# Chapter \d+:\s*(.*)", content)
    title = title_match.group(1).strip() if title_match else "Untitled"
    
    # Summary from ## Draft (first paragraph) or ## Concept
    summary_match = re.search(r"## (?:Draft|Concept)\n+(.*?)\n", content, re.DOTALL)
    summary = summary_match.group(1).strip() if summary_match else "No summary available."
    return title, summary

new_chapters = []
for filename in chapter_files:
    match = re.search(r"chapter_(\d+)_", filename)
    if not match: continue
    idx = int(match.group(1))
    title, summary = get_title_and_summary(os.path.join(chapters_src_dir, filename))
    # Escape single quotes for JS
    summary = summary.replace("'", "\\'")
    title = title.replace("'", "\\'")
    new_chapters.append(f"        {{ id: {idx}, title: '{title}', summary: '{summary}' }},")

chapters_js = "\n".join(new_chapters)

# Sections for the new 32-chapter structure
new_sections = """        {
            id: 'lunar-mission',
            title: 'Part I: The Lunar Mission',
            range: [1, 7],
            summary: "The arrival of Lynn, the launch to the Moon, and the initial encounter with Rahu."
        },
        {
            id: 'the-long-watch',
            title: 'Part II: The Long Watch',
            range: [8, 15],
            summary: "The aftermath of the Moon's fall and Lem's awakening in the Technocratic Core."
        },
        {
            id: 'the-northern-rebellion',
            title: 'Part III: The Northern Rebellion',
            range: [16, 25],
            summary: "Resistance in the White Forest and the struggle against the Core's expansion."
        },
        {
            id: 'the-final-transmission',
            title: 'Part IV: The Final Resolution',
            range: [26, 32],
            summary: "The return to the Moon and the broadcast that ends the Fallacy."
        },"""

page_path = os.path.join(site_root, "app/manuscript/page.tsx")
with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

# Replace chapters constant
page_content = re.sub(r"const chapters = \[.*?\];", f"const chapters = [\n{chapters_js}\n    ];", page_content, flags=re.DOTALL)
# Replace sections constant
page_content = re.sub(r"const sections = \[.*?\];", f"const sections = [\n{new_sections}\n    ];", page_content, flags=re.DOTALL)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)

print("Updated app/manuscript/page.tsx with 32 chapters")
