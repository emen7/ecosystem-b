@echo off
echo GitHub Push Fix for ecosystem-b
echo ================================
echo.

echo This script will help fix Git initialization and push issues with your new repository.
echo.

echo 1. Go to your ecosystem-b directory...
cd C:\Users\neufe\Documents\aaWebHub\ecosystem-b

echo 2. First let's check if Git is initialized in this directory...
if not exist .git (
  echo No .git directory found. Initializing Git...
  git init
  echo Git repository initialized!
) else (
  echo Git is already initialized in this directory.
)

echo 3. Checking the current branch...
for /f "tokens=*" %%a in ('git branch --show-current') do set CURRENT_BRANCH=%%a
echo Current branch: %CURRENT_BRANCH%

echo 4. Adding all files to git...
git add .
echo Files added to Git!

echo 5. Committing changes with message...
git commit -m "Initial commit: Clean implementation of UB Reader"
echo Changes committed!

echo 6. Rename the branch to main if not already...
if "%CURRENT_BRANCH%"=="main" (
  echo Branch is already "main", continuing...
) else (
  echo Renaming current branch to "main"...
  git branch -M main
)

echo 7. Remove any existing origin remote to avoid conflicts...
git remote remove origin

echo 8. Adding GitHub remote repository...
git remote add origin https://github.com/emen7/ecosystem-b.git
echo Remote added!

echo 9. Pushing to GitHub...
git push -u origin main

echo.
echo If you see errors above, try the following manual steps:
echo 1. Ensure you have access to GitHub.com
echo 2. Try using the GitHub CLI: gh auth login
echo 3. Alternatively, you can upload the files directly from GitHub.com web interface
echo.
pause
