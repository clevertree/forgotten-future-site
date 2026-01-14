import os
import re

base_path = "/home/ari/dev/ff/ff-story/manuscript/text/"
files = sorted([f for f in os.listdir(base_path) if f.startswith("chapter_") and f.endswith(".md")])

chapters_data = []

for filename in files:
    match = re.search(r"chapter_(\d+)", filename)
    if not match:
        continue
    cid = int(match.group(1))
    
    f_path = os.path.join(base_path, filename)
    with open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract title
    title_match = re.search(r"^# Chapter \d+: (.*)$", content, re.MULTILINE)
    ctitle = title_match.group(1).strip() if title_match else filename
    
    # Extract prose (everything after ## Draft but before next ##)
    prose = ""
    prose_parts = content.split("## Draft")
    if len(prose_parts) > 1:
        prose_main = prose_parts[1].strip()
        # Find next ## section if any
        sections = re.split(r"\n## ", prose_main)
        prose = sections[0].strip()
    else:
        # Fallback if ## Draft is missing, try to find first ##
        prose_parts = content.split("## ")
        if len(prose_parts) > 1:
            prose = prose_parts[1].strip()
        else:
            prose = content.strip()
    
    chapters_data.append((cid, ctitle, prose))

sections = [
    ('I: Lunar Mission', 1, 7),
    ('II: Long Watch', 8, 15),
    ('III: Northern Rebellion', 16, 25),
    ('IV: Final Resolution', 26, 32),
]

def generate_sidebar():
    lines = []
    for title, start, end in sections:
        lines.append(f'                            <div>')
        lines.append(f'                                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">')
        lines.append(f'                                    {title}')
        lines.append(f'                                </h3>')
        lines.append(f'                                <ul className="space-y-2 border-l border-white/5 pl-4">')
        for cid, ctitle, _ in chapters_data:
            if start <= cid <= end:
                lines.append(f'                                    <li>')
                lines.append(f'                                        <a href="#chapter-{cid}" className="text-[10px] text-zinc-400 hover:text-cyan-400 transition-colors block py-0.5 leading-tight uppercase tracking-tighter">')
                lines.append(f'                                            {cid}. {ctitle}')
                lines.append(f'                                        </a>')
                lines.append(f'                                    </li>')
        lines.append(f'                                </ul>')
        lines.append(f'                            </div>')
    return "\n".join(lines)

def generate_article():
    lines = []
    for cid, ctitle, cprose in chapters_data:
        lines.append(f'                    <section id="chapter-{cid}" className="prose prose-invert max-w-none scroll-mt-32">')
        lines.append(f'                        <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">')
        lines.append(f'                            <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">Chapter {cid}</span>')
        lines.append(f'                            {ctitle}')
        lines.append(f'                        </h3>')
        lines.append(f'                        <div className="text-zinc-300 leading-[2] text-lg space-y-6">')
        
        # Split by double newlines for paragraphs
        paragraphs = re.split(r"\n\s*\n", cprose)
        for p in paragraphs:
            p_text = p.strip()
            if p_text:
                # Escape curly braces for JSX
                p_text = p_text.replace("{", '{"{"}').replace("}", '{"}"}')
                # Escape double quotes if inside a string, but here we're outputting literal text for p tags
                lines.append(f'                            <p>{p_text}</p>')
        
        lines.append(f'                        </div>')
        lines.append(f'                    </section>')
    return "\n".join(lines)

print("SIDEBAR_START")
print(generate_sidebar())
print("SIDEBAR_END")
print("ARTICLE_START")
print(generate_article())
print("ARTICLE_END")
