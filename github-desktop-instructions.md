# GitHub Desktop Instructions for Publishing ecosystem-b

Since GitHub Desktop is offering to commit to "master" branch instead of "main", here's a step-by-step guide that addresses this issue:

## Publish Using GitHub Desktop

### Step 1: Commit Your Changes

1. Open GitHub Desktop
2. Make sure your repository is selected (`ecosystem-b`)
3. You should see all your files in the changes list
4. Enter a commit message: "Initial commit: Clean implementation of UB Reader"
5. Click "Commit to master" (It's OK if it says "master" instead of "main" for now)

### Step 2: Publish the Repository

1. After committing, click "Publish repository" in the top right
2. In the dialog that appears:
   - Confirm "ecosystem-b" as the name
   - Add a description if you wish
   - Choose whether you want it to be public or private
   - Make sure "GitHub.com" is selected as the location
   - **UNCHECK** "Keep this code private" if you want a public repository
3. Click "Publish Repository"

### Step 3: Rename the Branch (After Publishing)

After publishing to GitHub, you'll want to rename the branch from "master" to "main":

1. In GitHub Desktop, click on "Current Branch" at the top
2. Click on "master" (your current branch)
3. Click the gear icon (⚙️) or "..." menu
4. Select "Rename branch"
5. Enter "main" as the new branch name
6. Click "Rename"
7. Finally, click "Publish branch" to push the renamed branch to GitHub

### Step 4: Set as Default Branch on GitHub

1. Go to your repository on GitHub: https://github.com/emen7/ecosystem-b
2. Click "Settings" tab near the top
3. In the left sidebar, click "Branches"
4. Under "Default branch", click the switch icon
5. Select "main" from the dropdown
6. Click "Update"
7. Confirm the change

## After Publishing

Once your repository is published with your code:

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Find and select your GitHub repository (`ecosystem-b`)
4. Keep the default Next.js settings
5. Click "Deploy"

Vercel will automatically detect your Next.js project and deploy it!
