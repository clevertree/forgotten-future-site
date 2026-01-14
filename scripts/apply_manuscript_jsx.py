import os
import re

page_path = "/home/ari/dev/ff/forgotten-future-site/app/manuscript/full-text/page.tsx"
jsx_output_path = "/home/ari/dev/ff/forgotten-future-site/scripts/manuscript_jsx_output.txt"

with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

with open(jsx_output_path, "r", encoding="utf-8") as f:
    jsx_output = f.read()

# Extract Sidebar
sidebar_match = re.search(r"SIDEBAR_START\n(.*?)\nSIDEBAR_END", jsx_output, re.DOTALL)
if sidebar_match:
    new_sidebar = "SIDEBAR_START\n" + sidebar_match.group(1).strip() + "\nSIDEBAR_END"
    # Find the sidebar in the page.tsx (it's inside <div className="space-y-8"> ... </div>)
    # We'll use a larger anchor to be safe.
    old_sidebar_pattern = r"(<div className=\"space-y-8\">\n).*?(                        </div>\n                    </div>\n                </aside>)"
    page_content = re.sub(old_sidebar_pattern, r"\1" + new_sidebar + r"\n\2", page_content, flags=re.DOTALL)

# Extract Article
article_match = re.search(r"ARTICLE_START\n(.*?)\nARTICLE_END", jsx_output, re.DOTALL)
if article_match:
    new_article = "ARTICLE_START\n" + article_match.group(1).strip() + "\nARTICLE_END"
    # Find the article in the page.tsx (it's inside <article ...> ... </article>)
    old_article_pattern = r"(<article className=\"lg:w-3/4 space-y-24 pb-\[80vh\] order-1 lg:order-2\">\n).*?(                </article>)"
    page_content = re.sub(old_article_pattern, r"\1" + new_article + r"\n\2", page_content, flags=re.DOTALL)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)

print("Updated page.tsx with full manuscript content and markers.")
