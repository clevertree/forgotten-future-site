import os
import re

def find_src_attributes(directory):
    # Regex to find tags and their attributes
    # This is a bit rough but should work for identifying the tag name
    tag_pattern = re.compile(r'<([a-zA-Z0-9]+)\s+[^>]*?(src\s*=\s*(?:"[^"]*"|\{[^}]*\}))', re.DOTALL)
    
    results = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Find each match and get line number
                    for match in re.finditer(r'src\s*=\s*(?:"[^"]*"|\{[^}]*\})', content):
                        src_text = match.group(0)
                        start_pos = match.start()
                        
                        # Find the start of the tag this src belongs to
                        # We look backwards for the nearest '<'
                        bracket_pos = content.rfind('<', 0, start_pos)
                        if bracket_pos != -1:
                            # Extract the tag name
                            tag_match = re.search(r'<([a-zA-Z0-9\.]+)', content[bracket_pos:])
                            if tag_match:
                                tag_name = tag_match.group(1)
                                # Get line number
                                line_no = content.count('\n', 0, start_pos) + 1
                                results.append((path, line_no, tag_name, src_text))
                                    
    return results

if __name__ == "__main__":
    app_dir = "/home/ari/dev/ff/forgotten-future-site/app"
    matches = find_src_attributes(app_dir)
    if not matches:
        print("No matches found.")
    for path, line, tag, src in matches:
        print(f"{path}:{line} (Tag: <{tag}>, {src})")
