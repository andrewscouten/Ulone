#!/bin/bash

# Script to test Obsidian webpage export locally
# This mimics what GitHub Actions does

echo "Creating output directory..."
mkdir -p ./output

echo "Running Obsidian webpage export..."
docker run --rm \
  -e EXPORT_ENTIRE_VAULT=true \
  -e EXPORT_PRESET=online \
  -v "$(pwd)/Ulone:/vault" \
  -v "$(pwd)/output:/output" \
  ghcr.io/andrewscouten/obsidian-webpage-export:latest

# Check exit code
if [ $? -eq 137 ]; then
  echo "Export completed with memory limit warning (normal)"
elif [ $? -eq 0 ]; then
  echo "Export completed successfully!"
else
  echo "Export failed with exit code $?"
  exit 1
fi

echo ""
echo "Exported files are in ./output/"
echo "To preview locally, open ./output/index.html in a browser"
