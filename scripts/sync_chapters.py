import os
import re

manuscript_dir = '/home/ari/dev/ff/ff-story/manuscript/text'
output_file = '/home/ari/dev/ff/forgotten-future-site/app/manuscript/full-text/chapters.ts'

chapters = []

# Get all .md files and sort them by chapter number
files = [f for f in os.listdir(manuscript_dir) if f.endswith('.md')]

def get_chapter_id(filename):
    match = re.search(r'chapter_(\d+)', filename)
    return int(match.group(1)) if match else 0

files.sort(key=get_chapter_id)

for filename in files:
    chapter_id = get_chapter_id(filename)
    if chapter_id == 0:
        continue
        
    path = os.path.join(manuscript_dir, filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read().strip()
        
    # Extract title from the first line (e.g., # Chapter 1: Invasion)
    lines = content.split('\n')
    title_line = lines[0]
    title_match = re.search(r'# Chapter \d+: (.*)', title_line)
    if not title_match:
        # Try a simpler match if the format is different
        title_match = re.search(r'# (.*)', title_line)
        
    title = title_match.group(1).strip() if title_match else filename
    
    # Remove the title line from content
    chapter_content = '\n'.join(lines[1:]).strip()
    
    # Escape backticks in content
    chapter_content = chapter_content.replace('`', '\\`')
    
    chapters.append({
        'id': chapter_id,
        'title': title,
        'content': chapter_content
    })

ts_content = "export interface Chapter {\n  id: number;\n  title: string;\n  content: string;\n}\n\nexport const chapters: Chapter[] = [\n"

for ch in chapters:
    ts_content += f"  {{\n    id: {ch['id']},\n    title: `{ch['title']}`,\n    content: `{ch['content']}`\n  }},\n"

ts_content += "];\n"

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully synced {len(chapters)} chapters to {output_file}")

# Also update ff-story/manuscript/FULL_MANUSCRIPT.md
full_manuscript_path = '/home/ari/dev/ff/ff-story/manuscript/FULL_MANUSCRIPT.md'
full_manuscript_content = "# FORGOTTEN FUTURE: THE COMPLETE FIRST EDITION\n\n"

for ch in chapters:
    full_manuscript_content += f"# Chapter {ch['id']}: {ch['title']}\n\n"
    # Content already has escaped backticks for TS, need to unescape them for MD
    content_md = ch['content'].replace('\\`', '`')
    full_manuscript_content += f"{content_md}\n\n---\n\n"

with open(full_manuscript_path, 'w', encoding='utf-8') as f:
    f.write(full_manuscript_content)

print(f"Successfully updated {full_manuscript_path}")
