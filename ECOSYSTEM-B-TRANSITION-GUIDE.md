# Urantia Book Reader: ecosystem-b Project Guide

This guide provides everything you need to know about the new ecosystem-b project, which is now deployed at https://ecosystem-b2.vercel.app/. It contains instructions for continuing development in your new VSCode instance.

## Project Overview

The ecosystem-b project is a clean implementation of the Urantia Book reader with:

- Proper Next.js 14 structure with App Router
- React components with TypeScript
- Theme system with light/dark/sepia modes
- Dynamic routing for papers, sections, and paragraphs
- JSON data structure for content
- Clean build and deployment process

## Key Directories & Files

```
ecosystem-b/
├── app/                      # Core application code
│   ├── components/           # React components
│   │   ├── ClientThemeLayout.tsx
│   │   ├── ReadingArea.tsx
│   │   └── ...
│   ├── contexts/             # Context providers
│   │   └── ThemeContext.tsx
│   ├── paper/                # Paper routes
│   │   └── [paperNumber]/    # Dynamic paper pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # App layout
│   ├── page.tsx              # Home page
│   └── ui-fixes.css          # CSS fixes
├── public/                   # Static assets
│   └── json/                 # Book content
│       └── 001.json          # Paper 1 data
└── [config files]            # Various configuration files
```

## Development Workflow

1. **Make Changes Locally**

   - Edit files in your new VSCode instance
   - Run development server with `npm run dev` to see changes locally
   - Test functionality before committing

2. **Commit & Push**

   - Use Git in VSCode or GitHub Desktop
   - Make meaningful commits with descriptive messages
   - Push to the `main` branch

3. **Automatic Deployment**
   - Vercel will automatically detect changes
   - Builds and deploys updates automatically
   - Check deployment status at Vercel dashboard

## Current Issues to Address

1. **Uncorrected Content**: The deployed site still shows the uncorrected version. Check and verify:

   - `app/layout.tsx`: Should include ClientThemeLayout
   - `app/components/ReadingArea.tsx`: Should have updated styles
   - `app/contexts/ThemeContext.tsx`: Should have proper theme implementation
   - `app/page.tsx`: Should use the ReadingArea component

2. **Testing Required**: After making any fixes, verify:
   - Proper styling and text centering
   - Theme switching functionality
   - Paper/section navigation
   - Responsive design

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Check for linting errors
npm run lint
```

## Recommended VSCode Extensions

For the best development experience:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- JavaScript and TypeScript Nightly
- GitLens

## Git & GitHub Configuration

The repository is set up with:

- Remote: https://github.com/emen7/ecosystem-b
- Default branch: `main`
- Deployment: Connected to Vercel

## Vercel Deployment

- Project: ecosystem-b2
- Production branch: `main`
- URL: https://ecosystem-b2.vercel.app/
- Framework: Next.js
- Node.js version: 18.x (default)

## Next Steps for Development

1. Verify deployment is correct
2. Fix any issues with the content presentation
3. Implement improvements to the UI
4. Add more paper content as needed
5. Enhance navigation and search capabilities

This clean implementation provides a solid foundation for future development with a proper structure and automated deployment pipeline.
