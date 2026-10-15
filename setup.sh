#!/bin/bash
# Setup script for Abdulla Thaslim Portfolio
# Run this script once to copy AI-generated images into the project.

ARTIFACT_DIR="/home/abdullah/.gemini/antigravity-ide/brain/5ff6889c-a511-4947-a06e-68965d32632a"
PROJECT_DIR="/home/abdullah/Desktop/my-portfolio"

echo "Creating directories..."
mkdir -p "$PROJECT_DIR/assets/images/projects"
mkdir -p "$PROJECT_DIR/assets/icons"

echo "Copying images..."
cp "$ARTIFACT_DIR/profile_avatar_1792078807992.png"    "$PROJECT_DIR/assets/images/profile.png"
cp "$ARTIFACT_DIR/project_ai_saas_1792078828936.png"   "$PROJECT_DIR/assets/images/projects/perception-mapper.png"
cp "$ARTIFACT_DIR/project_tourism_1792078885883.png"   "$PROJECT_DIR/assets/images/projects/mawanella-tourism.png"
cp "$ARTIFACT_DIR/project_queue_1792078953324.png"     "$PROJECT_DIR/assets/images/projects/smart-queue.png"
cp "$ARTIFACT_DIR/project_chatbot_1792078966803.png"   "$PROJECT_DIR/assets/images/projects/mars-chatbot.png"

echo ""
echo "✅ Setup complete! Project structure:"
find "$PROJECT_DIR" -not -path '*/.git/*' -not -name '.git' | sort
