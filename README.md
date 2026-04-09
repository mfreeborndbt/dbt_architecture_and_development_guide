# dbt Story - An Interactive Educational Website

A beautiful, interactive website that tells the story of how dbt works. Built for data professionals who want to understand dbt's core concepts, architecture, and development workflow.

## Overview

This website guides users through:

1. **Core Concepts** - Understanding dbt's foundational ideas
   - Project Architecture: How data flows through dbt
   - Environments: Development, testing, and production separation
   - Runtime Architecture: What happens when dbt runs

2. **Development & Deployment Workflow** - The complete journey from code to production
   - Step 1: Developer creates features in dev environment
   - Step 2: CI/CD validation and testing
   - Step 3: Production deployment workflow

## Features

- 🎨 **Modern, Clean Design** - Inspired by contemporary data tools
- ⚡ **Interactive Components** - Smooth animations and state management
- 📱 **Fully Responsive** - Works beautifully on all device sizes
- 🎯 **Educational Focus** - Designed for data people new to dbt
- 🚀 **Performance Optimized** - Built with Vite for fast development

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and interactions
- **Lucide React** - Beautiful icons

## Getting Started

```bash
# Navigate to the project directory
cd dbt-story

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Customization

Edit files in `src/components/` to customize:
- Content and text
- Colors in `tailwind.config.js`
- Animations in component files

## Next Steps

1. Add visual diagrams from your reference screenshots
2. Create interactive data flow visualizations
3. Add real dbt artifact examples
4. Build environment simulator
5. Add knowledge assessments

## References

- [dbt Documentation](https://docs.getdbt.com)
- [dbt Labs](https://www.getdbt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
