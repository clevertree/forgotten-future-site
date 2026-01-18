#!/usr/bin/env python3
import urllib.request
import os

MANUSCRIPT_URLS = {
    '13plus': 'https://raw.githubusercontent.com/clevertree/ff-story/main/manuscript/MANUSCRIPT_13_PLUS.md',
    'youngadult': 'https://raw.githubusercontent.com/clevertree/ff-story/main/manuscript/MANUSCRIPT_YOUNG_ADULT.md'
}

def fetch_and_save():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(os.path.dirname(script_dir), "public", "manuscript")
    os.makedirs(output_dir, exist_ok=True)

    for version, url in MANUSCRIPT_URLS.items():
        print(f"Fetching {version} manuscript...")
        try:
            with urllib.request.urlopen(url) as response:
                content = response.read().decode('utf-8')
                filename = f"manuscript_{version}.md"
                output_path = os.path.join(output_dir, filename)
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Saved to {output_path}")
        except Exception as e:
            print(f"Error fetching {version}: {e}")

if __name__ == "__main__":
    fetch_and_save()
