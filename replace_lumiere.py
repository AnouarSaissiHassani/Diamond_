import os

target_path = r"D:\antigravity webapp\Diamond\src\app\soins\page.tsx"

with open(target_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace case-sensitively
content = content.replace("Lumière", "Diamond")
content = content.replace("lumière", "diamond")

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Replacement complete!")
