# UB Reader - Clean Implementation

A clean, modern implementation of the Urantia Book reader application, focused on delivering an optimal reading experience with proper text formatting and styling.

## Project Overview

This project provides a web-based reader for the Urantia Book with:

- Clean, readable text layout with proper width constraints
- Responsive design for all screen sizes
- Theme customization (light, dark, sepia)
- Font family, size, and spacing options
- Paper and section navigation

The application is built with:

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

## Directory Structure

```
├── app/                   # Main application code
│   ├── components/        # React components
│   ├── contexts/          # Context providers
│   ├── paper/             # Dynamic routes for papers
│   └── ui-fixes.css       # Custom CSS fixes
├── public/                # Static assets
│   └── json/              # JSON data files for book content
└── ...                    # Configuration files
```

## Key Features

- **Optimized Reading Experience**: Text is properly formatted with optimal line length (65-70 characters), appropriate spacing, and careful typography.
- **Theme Support**: Light, dark, and sepia modes, with appropriate color schemes for each.
- **Font Customization**: Choose between serif and sans-serif fonts, with multiple size and spacing options.
- **Responsive Design**: Works on all screen sizes from mobile to desktop.
- **Performance Focused**: Fast loading times and smooth navigation.

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/username/ub-reader-clean.git
cd ub-reader-clean
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for easy deployment to Vercel:

1. Push to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Next.js configuration and deploy it

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
