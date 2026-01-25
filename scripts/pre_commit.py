#!/usr/bin/env python3
import sys
import os
import json
import subprocess
import re
import argparse

def bump_version(version_str):
    parts = version_str.strip().split('.')
    if len(parts) >= 3:
        parts[-1] = str(int(parts[-1]) + 1)
    return '.'.join(parts)

def get_repo_info(path):
    version = "unknown"
    version_file = os.path.join(path, "VERSION")
    if not os.path.exists(version_file):
        # Check package.json for site
        pkg_file = os.path.join(path, "package.json")
        if os.path.exists(pkg_file):
            try:
                with open(pkg_file, 'r') as f:
                    pkg = json.load(f)
                    version = pkg.get('version', 'unknown')
            except:
                pass
    else:
        with open(version_file, 'r') as f:
            version = f.read().strip()
    
    commits = []
    try:
        output = subprocess.check_output(["git", "log", "-n", "3", "--oneline"], cwd=path).decode('utf-8')
        for line in output.strip().split('\n'):
            if line:
                parts = line.split(' ', 1)
                hash_ = parts[0]
                msg = parts[1] if len(parts) > 1 else ""
                commits.append({"hash": hash_, "msg": msg})
    except:
        pass
    
    return version, commits

def fetch_manuscripts():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    fetch_script = os.path.join(script_dir, "fetch-manuscript.py")
    if os.path.exists(fetch_script):
        print("Fetching latest manuscripts...")
        try:
            subprocess.check_call([sys.executable, fetch_script])
        except subprocess.CalledProcessError as e:
            print(f"Error fetching manuscripts: {e}")

def update_dashboard():
    # Use absolute paths or relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    site_dir = os.path.dirname(script_dir)
    
    # 0. Fetch latest manuscripts before anything else
    fetch_manuscripts()
    
    base_dir = os.path.dirname(site_dir)
    
    story_dir = os.path.join(base_dir, "ff-story")
    teaser_dir = os.path.join(base_dir, "ff-teaser")

    # 1. Get Info (Refresh all for accurate dashboard)
    story_v, story_commits = get_repo_info(story_dir)
    teaser_v, teaser_commits = get_repo_info(teaser_dir)
    site_v, site_commits = get_repo_info(site_dir)

    # 2. Update app/page.tsx
    page_path = os.path.join(site_dir, "app/page.tsx")
    if not os.path.exists(page_path):
        print(f"Error: {page_path} not found")
        return

    with open(page_path, 'r') as f:
        content = f.read()

    def update_repo_section(content, repo_name, version, commits):
        # Update version
        content = re.sub(
            rf'<h3 className="text-xs font-bold uppercase tracking-widest">Repository: {repo_name}</h3>\s*<span className="text-\[10px\] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v.*?</span>',
            f'<h3 className="text-xs font-bold uppercase tracking-widest">Repository: {repo_name}</h3>\n                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v{version}</span>',
            content
        )
        
        # Update commits
        commit_html = '\n                            <div className="text-[10px] text-muted font-mono leading-tight">'
        for c in commits:
            commit_html += f'''
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">{c['hash']}</span>
                                    <span className="truncate">{c['msg']}</span>
                                </div>'''
        commit_html += '\n                            </div>\n                        '
        
        # Match the entire space-y-3 mb-6 block by looking for the next GitHub Source link
        # This is more robust as it captures the entire div structure
        repo_block_regex = rf'(Repository: {repo_name}.*?<div className="space-y-3 mb-6">)(.*?)(</div>\s+<a href)'
        new_content = re.sub(repo_block_regex, rf'\1{commit_html}\3', content, flags=re.DOTALL)
        # We don'\''t print warnings here as it'\''s common for content to be same
        return new_content

    content = update_repo_section(content, "Story", story_v, story_commits)
    content = update_repo_section(content, "Teaser", teaser_v, teaser_commits)
    content = update_repo_section(content, "Site", site_v, site_commits)

    with open(page_path, 'w') as f:
        f.write(content)
    
    print("Dashboard updated in app/page.tsx")
    # Only add if we are in the site repo git context
    try:
        subprocess.run(["git", "add", "app/page.tsx"], cwd=site_dir, check=True)
    except:
        pass

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only-dashboard", action="store_true")
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    site_dir = os.path.dirname(script_dir)

    if not args.only_dashboard:
        # Bump package.json
        pkg_path = os.path.join(site_dir, "package.json")
        if os.path.exists(pkg_path):
            with open(pkg_path, 'r') as f:
                pkg = json.load(f)
            old_v = pkg['version']
            new_v = bump_version(old_v)
            pkg['version'] = new_v
            with open(pkg_path, 'w') as f:
                json.dump(pkg, f, indent=2)
                f.write('\n')
            print(f"Bumped Site version: {old_v} -> {new_v}")
            subprocess.run(["git", "add", "package.json"], cwd=site_dir)

        # Update COMMIT_HISTORY.md
        history_file = os.path.join(site_dir, "COMMIT_HISTORY.md")
        with open(history_file, 'w') as f:
            subprocess.run(["git", "log", "--oneline"], stdout=f, cwd=site_dir)
        subprocess.run(["git", "add", "COMMIT_HISTORY.md"], cwd=site_dir)

    update_dashboard()

if __name__ == "__main__":
    main()
