# Deployment Instructions for UB Reader Clean

This document provides step-by-step instructions for deploying your new UB Reader Clean implementation to GitHub and Vercel.

## 1. Create a New GitHub Repository

1. Go to https://github.com/new
2. Name your repository (e.g., `ub-reader-clean`)
3. Choose public or private visibility as preferred
4. Click "Create repository"
5. Once created, follow the instructions to push an existing repository from the command line:

```bash
# Make sure you're in the ub-reader-clean directory
cd /path/to/ub-reader-clean

# Add the remote repository URL (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/ub-reader-clean.git

# Push your changes to the GitHub repository
git push -u origin main
```

## 2. Deploy to Vercel

1. Go to https://vercel.com/
2. Log in or sign up for an account
3. Click "Add New..." > "Project"
4. Import your GitHub repository (`ub-reader-clean`)
5. Keep the default settings (Vercel will automatically detect Next.js)
6. Click "Deploy"

Vercel will automatically build and deploy your project. Once the deployment is complete, you'll get a URL like `https://ub-reader-clean.vercel.app` where your application is live.

## 3. Configure Custom Domain (Optional)

If you have a custom domain:

1. Go to your project on Vercel dashboard
2. Click "Settings" > "Domains"
3. Add your domain and follow the instructions to configure DNS settings

## 4. Set Up Automatic Deployments

Your project is already configured for automatic deployments:

1. Any push to the `main` branch will trigger a new deployment
2. You can work on feature branches locally
3. Create pull requests and merge them to `main` when ready to deploy

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel deployment logs for specific errors
2. Ensure all required dependencies are properly installed
3. Verify that your project structure matches the expected Next.js layout
4. Consider manually triggering a new deployment from the Vercel dashboard

## Local Development

To continue development locally:

```bash
# Start the development server
npm run dev

# Build the project
npm run build

# Start the production server
npm start
```

Visit http://localhost:3000 to see your application running locally.
