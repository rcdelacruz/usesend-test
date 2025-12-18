# Documentation

This project now includes comprehensive documentation built with Nextra.

## Running the Documentation Site

### Development

To run the documentation site locally in development mode:

```bash
npm run docs:dev
```

This will start the Next.js development server. Open http://localhost:3000 in your browser to view the documentation.

### Building for Production

To build the documentation for production:

```bash
npm run docs:build
```

This creates an optimized production build in the `.next` directory.

### Starting Production Server

To start the production server:

```bash
npm run docs:start
```

Note: You must run `docs:build` first before starting the production server.

## Documentation Structure

The documentation is organized into the following sections:

- **Introduction** - Overview of the useSend Testing Suite
- **Getting Started** - Installation and setup instructions
- **Configuration** - Environment variable configuration guide
- **Running Tests** - How to execute the test suite
- **API Examples** - Code examples for using the useSend API
- **AWS SES Sandbox** - Guide for working with AWS SES sandbox mode
- **Troubleshooting** - Solutions to common problems
- **Project Structure** - Codebase organization and architecture

## Documentation Files

All documentation content is located in the `content/` directory:

- `content/index.mdx` - Introduction page
- `content/getting-started.mdx` - Getting started guide
- `content/configuration.mdx` - Configuration reference
- `content/running-tests.mdx` - Testing guide
- `content/api-examples.mdx` - API usage examples
- `content/aws-ses-sandbox.mdx` - AWS SES guide
- `content/troubleshooting.mdx` - Troubleshooting guide
- `content/project-structure.mdx` - Project structure documentation

## Technology Stack

- **Next.js** - React framework
- **Nextra** - Documentation site generator
- **nextra-theme-docs** - Documentation theme with built-in features:
  - Full-text search
  - Dark mode
  - Responsive design
  - Syntax highlighting
  - Table of contents
  - Breadcrumbs
  - GitHub integration

## Customization

### Theme Configuration

The theme and layout are configured in `app/layout.jsx`. You can customize:

- Logo and branding
- GitHub project link
- Footer content
- Sidebar behavior
- Table of contents settings

### Navigation

The page order and navigation structure is defined in `content/_meta.json`.

## Deployment

The documentation site can be deployed to various platforms:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The documentation can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Your own server

## Development Tips

- Edit MDX files in `content/` to update documentation
- Changes are reflected immediately in dev mode (hot reload)
- Use MDX components from Nextra for callouts, tabs, cards, etc.
- Syntax highlighting works automatically for code blocks
