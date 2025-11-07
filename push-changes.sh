#!/bin/bash

# Script to push changes to development branch
# This handles the git corruption issue

echo "Creating backup of changes..."
cp -r tests /tmp/tests-backup
cp -r composables /tmp/composables-backup  
cp -r models /tmp/models-backup
cp -r pages /tmp/pages-backup
cp -r services /tmp/services-backup
cp package.json /tmp/package.json-backup
cp bun.lockb /tmp/bun.lockb-backup
cp vitest.config.ts /tmp/vitest.config.ts-backup
cp TESTING.md /tmp/TESTING.md-backup
cp .gitignore /tmp/.gitignore-backup

echo "Backup created in /tmp/"
echo ""
echo "To push your changes, please run these commands manually:"
echo ""
echo "1. Clone a fresh copy of the repo:"
echo "   cd /tmp && git clone https://github.com/ingscjoshua/sample-prime-vue.git sample-prime-vue-fresh"
echo ""
echo "2. Switch to development branch:"
echo "   cd sample-prime-vue-fresh && git checkout development"
echo ""
echo "3. Copy the backed up files:"
echo "   cp -r /tmp/tests-backup tests/"
echo "   cp -r /tmp/composables-backup/* composables/"
echo "   cp -r /tmp/models-backup/* models/"
echo "   cp -r /tmp/pages-backup/* pages/"
echo "   cp -r /tmp/services-backup/* services/"
echo "   cp /tmp/package.json-backup package.json"
echo "   cp /tmp/bun.lockb-backup bun.lockb"
echo "   cp /tmp/vitest.config.ts-backup vitest.config.ts"
echo "   cp /tmp/TESTING.md-backup TESTING.md"
echo "   cp /tmp/.gitignore-backup .gitignore"
echo "   rm middleware/auth.global.ts"
echo ""
echo "4. Commit and push:"
echo "   git add -A"
echo "   git commit -m 'fix: resolve code errors and add comprehensive unit testing'"
echo "   git push origin development"
echo ""
echo "5. Return to your original directory and pull the changes:"
echo "   cd $(pwd)"
echo "   git fetch origin development"
echo "   git reset --hard origin/development"
