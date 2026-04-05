# Michal Kaczor | Fullstack Developer Portfolio

A personal portfolio website focused on clean UI, smooth interactions, and practical presentation of real projects.

Built to showcase selected work, technology stack, and contact options in a fast and responsive single-page experience.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Motion-Framer-0055FF)
![i18next](https://img.shields.io/badge/i18n-i18next-26A69A)

## Live

- Production: [https://mkaczor.me](https://mkaczor.me)

## About

This portfolio is a production-style frontend project built with a focus on:

- intentional visual design with animated sections,
- bilingual content (English and Polish),
- responsive layout across mobile and desktop,
- clean component architecture with reusable UI primitives.

## Features

- **Hero section** with CV download and project CTA.
- **Project showcase** with interactive cards and links to live demos/repos.
- **Filterable tech stack** grouped by categories.
- **Contact form** with Formspree integration and fallback state.
- **Internationalization** using locale JSON files (`en` / `pl`).
- **Section-aware navigation** with active hash updates while scrolling.
- **SEO baseline** (canonical URL, Open Graph, Twitter meta, sitemap, robots).

## Tech Stack

| Layer         | Technology                 |
| ------------- | -------------------------- |
| Framework     | React 19 + Vite            |
| Language      | TypeScript                 |
| Styling       | Tailwind CSS 4             |
| UI Primitives | shadcn/ui, Base UI         |
| Animation     | Framer Motion              |
| Forms         | Formspree                  |
| Icons         | Tabler Icons, Simple Icons |
| i18n          | i18next, react-i18next     |
| Notifications | Sonner                     |
| Tooling       | ESLint, Prettier           |

## Project Structure

```text
src/
  components/
    ui/
  pages/
    Home/
    Projects/
    Stack/
    Contact/
  locales/
    en/
    pl/
  lib/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Environment Variables

For contact form support, define:

```bash
VITE_FORMSPREE_ENDPOINT=your_formspree_form_id_or_endpoint
```

If missing, the app shows a fallback contact message instead of sending.

## Notes

- This repository is focused on frontend experience and presentation.
- Content and interactions are actively iterated as part of ongoing portfolio improvements.
