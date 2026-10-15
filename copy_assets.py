#!/usr/bin/env python3
"""
Setup script for Abdulla Thaslim Portfolio
Run this once to copy AI-generated images and create the full directory structure.
Usage: python3 copy_assets.py
"""
import os
import shutil

ARTIFACT_DIR = "/home/abdullah/.gemini/antigravity-ide/brain/5ff6889c-a511-4947-a06e-68965d32632a"
PROJECT_DIR = "/home/abdullah/Desktop/my-portfolio"

# Create directories
dirs = [
    os.path.join(PROJECT_DIR, "assets/images/projects"),
    os.path.join(PROJECT_DIR, "assets/icons"),
]
for d in dirs:
    os.makedirs(d, exist_ok=True)
    print(f"✓ Created: {d}")

# Copy images
images = [
    ("profile_avatar_1792078807992.png",   "assets/images/profile.png"),
    ("project_ai_saas_1792078828936.png",  "assets/images/projects/perception-mapper.png"),
    ("project_tourism_1792078885883.png",  "assets/images/projects/mawanella-tourism.png"),
    ("project_queue_1792078953324.png",    "assets/images/projects/smart-queue.png"),
    ("project_chatbot_1792078966803.png",  "assets/images/projects/mars-chatbot.png"),
]

for src_name, dst_relative in images:
    src = os.path.join(ARTIFACT_DIR, src_name)
    dst = os.path.join(PROJECT_DIR, dst_relative)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"✓ Copied: {dst_relative}")
    else:
        print(f"✗ Source not found: {src}")

print("\n✅ Setup complete!")
print(f"Open your portfolio: file://{PROJECT_DIR}/index.html")
