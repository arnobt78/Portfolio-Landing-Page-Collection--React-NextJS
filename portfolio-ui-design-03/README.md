# Portfolio Landing Page 3 - React, Vite, TailwindCSS, Three.js, React Three Fiber, Framer Motion, Javascript Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.1.0-green)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.2.6-blueviolet)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.149.0-red)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-8.11.1-blue)](https://github.com/pmndrs/react-three-fiber)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-9.0.7-purple)](https://www.framer.com/motion/)

A modern, single-page portfolio template built with React, Vite, and Tailwind CSS. It features 3D visuals (Three.js / React Three Fiber), smooth animations (Framer Motion), and a contact form powered by EmailJS. Use it as a learning reference, a starter for your own portfolio, or as a demo of a full-featured frontend stack.

- **Live Demo:** [https://portfolio-ui-3.vercel.app/](https://portfolio-ui-3.vercel.app/)

![Screenshot 2026-03-07 at 11 26 32](https://github.com/user-attachments/assets/0e80eb28-55f1-47bd-99c1-3df503dd0ff5)
![Screenshot 2026-03-07 at 11 26 46](https://github.com/user-attachments/assets/aad21ffd-b904-4781-86f9-d07c11e188e9)
![Screenshot 2026-03-07 at 11 27 01](https://github.com/user-attachments/assets/3cf61950-05ed-49ec-aa0d-6ca7164fdb82)
![Screenshot 2026-03-07 at 11 27 16](https://github.com/user-attachments/assets/0590f22c-56a2-4451-a636-3a995dc38b34)
![Screenshot 2026-03-07 at 11 28 06](https://github.com/user-attachments/assets/fb2e24d5-84dd-4114-93dc-322ce24e8be6)
![Screenshot 2026-03-07 at 11 28 15](https://github.com/user-attachments/assets/efcb35cb-0715-49fc-b9a3-e960cfd690e6)
![Screenshot 2026-03-07 at 11 28 27](https://github.com/user-attachments/assets/ec38a283-a831-4bdb-96a1-cb885c22e9b8)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Features & Functionality](#features--functionality)
- [Components Walkthrough](#components-walkthrough)
- [Reusing Components in Other Projects](#reusing-components-in-other-projects)
- [Routes & Navigation](#routes--navigation)
- [APIs & Backend](#apis--backend)
- [Styling & Theming](#styling--theming)
- [Keywords & Learning Topics](#keywords--learning-topics)
- [Conclusion](#conclusion)
- [License](#license)

---

## Overview

This project is a **frontend-only** portfolio site. It includes:

- **Hero** section with 3D computer scene (React Three Fiber + GLTF)
- **About** section with tilt cards (react-parallax-tilt) and service highlights
- **Experience** section with vertical timeline (react-vertical-timeline-component)
- **Tech** section with 3D ball icons (Three.js decals)
- **Works** section with project cards and GitHub links
- **Testimonials** section with feedback cards
- **Contact** section with form and 3D Earth, plus EmailJS for sending emails
- **Stars** background canvas for visual depth

There is **no custom backend**. Data is driven by in-repo constants and assets; only the contact form uses the EmailJS service (client-side).

---

## Tech Stack

| Category     | Technology                                                     |
| ------------ | -------------------------------------------------------------- |
| Framework    | React 18                                                       |
| Build tool   | Vite 4                                                         |
| Styling      | Tailwind CSS 3                                                 |
| 3D / Canvas  | Three.js, @react-three/fiber, @react-three/drei                |
| Animations   | Framer Motion                                                  |
| Routing      | React Router DOM (used for base path; sections use hash links) |
| Contact form | EmailJS (@emailjs/browser)                                     |
| UI effects   | react-parallax-tilt, react-vertical-timeline-component         |
| Utilities    | maath (random for stars)                                       |

---

## Project Structure

```bash
portfolio-ui-3/
├── public/
│   ├── logo.svg              # Favicon / app icon
│   ├── desktop_pc/
│   │   └── scene.gltf         # 3D model for Hero computers
│   └── planet/
│       └── scene.gltf         # 3D model for Contact Earth
├── src/
│   ├── assets/               # Images, icons, company logos
│   │   ├── tech/              # Tech stack icons
│   │   ├── company/            # Company logos (experience)
│   │   ├── logo.svg, menu.svg, close.svg, github.png
│   │   └── carrent.png, jobit.png, tripguide.png  # Project thumbnails
│   ├── components/
│   │   ├── canvas/            # 3D components (Ball, Computers, Earth, Stars)
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Feedbacks.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx         # Canvas loading indicator
│   │   ├── Navbar.jsx
│   │   ├── Tech.jsx
│   │   ├── Works.jsx
│   │   └── index.js           # Barrel exports
│   ├── constants/
│   │   └── index.js           # navLinks, services, technologies, experiences, testimonials, projects
│   ├── hoc/
│   │   ├── SectionWrapper.jsx # Wraps sections with motion + hash span for scroll
│   │   └── index.js
│   ├── utils/
│   │   └── motion.js          # Framer Motion variants (fadeIn, textVariant, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css              # Tailwind + custom gradients/globals
│   └── styles.js              # Shared Tailwind class strings
├── index.html
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 16+ (recommended 18 or 20)
- **npm** (or yarn / pnpm)

### Installation

```bash
# Clone the repository (or download)
git clone <your-repo-url>
cd portfolio-ui-3

# Install dependencies
npm install
```

### Run locally

```bash
# Development server (default: http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Lint

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix where possible
```

---

## Environment Variables

The **Contact** form uses [EmailJS](https://www.emailjs.com/) to send emails from the browser. You must create an EmailJS account and add these variables.

### Required variables

Create a `.env` file in the project root (and optionally `.env.local` for local overrides). Vite only exposes variables prefixed with `VITE_`.

| Variable                       | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| `VITE_APP_EMAILJS_SERVICE_ID`  | Your EmailJS **Service ID** (e.g. `service_xxxxx`)   |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | Your EmailJS **Template ID** (e.g. `template_xxxxx`) |
| `VITE_APP_EMAILJS_PUBLIC_KEY`  | Your EmailJS **Public Key** (e.g. `xxxxxxxx`)        |

### How to get them

1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/).
2. **Email Services**: Add an email service (Gmail, Outlook, etc.) and copy the **Service ID**.
3. **Email Templates**: Create a template. Use placeholders such as `{{from_name}}`, `{{from_email}}`, `{{message}}`, and optionally `{{to_name}}`, `{{to_email}}`. Copy the **Template ID**.
4. **Account**: In the dashboard, find your **Public Key**.
5. In the project root, create `.env`:

```env
VITE_APP_EMAILJS_SERVICE_ID=service_xxxxxxxx
VITE_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxxx
VITE_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

1. Restart the dev server (`npm run dev`) after changing `.env`.

### Optional: `.env.example`

You can add a `.env.example` (without real values) and keep `.env` in `.gitignore` so others know what to set:

```env
# EmailJS (https://www.emailjs.com/)
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

If these variables are missing, the contact form will still render; the `emailjs.send()` call will fail and the error handler (e.g. alert) will run.

---

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start Vite dev server                |
| `npm run build`    | Production build (output in `dist/`) |
| `npm run preview`  | Serve `dist/` locally                |
| `npm run lint`     | Run ESLint                           |
| `npm run lint:fix` | Run ESLint with auto-fix             |

---

## Features & Functionality

- **Responsive layout**: Mobile menu, breakpoints via Tailwind (`sm:`, `xl:`, etc.), and a mobile-adjusted 3D computer in the Hero.
- **Scroll behavior**: Navbar links use `#about`, `#work`, `#contact`; sections are wrapped with `SectionWrapper` and a `hash-span` for scroll targets.
- **Animations**: Framer Motion for section titles, cards, and form; stagger and viewport-based triggers.
- **3D sections**:
  - **Hero**: GLTF desktop scene with orbit controls and responsive scale.
  - **Tech**: Orbiting balls with technology decals.
  - **Contact**: Rotating Earth GLTF.
  - **Background**: Starfield with `maath` random positions.
- **Contact form**: Name, email, message; submitted via EmailJS with env-based config.

---

## Components Walkthrough

### App and entry

- **`main.jsx`**: Renders `App` into `#root` with `React.StrictMode`.
- **`App.jsx`**: Uses `BrowserRouter` and composes the single-page layout: Navbar, Hero, About, Experience, Tech, Works, Feedbacks, Contact, and StarsCanvas.

### Layout and navigation

- **`Navbar.jsx`**: Fixed top bar; logo + “John Doe | Portfolio”; desktop nav links (`#about`, `#work`, `#contact`); mobile hamburger menu; background changes on scroll.
- **`SectionWrapper` (HOC)**: Wraps a section with a motion container and a `hash-span` so in-page links align correctly. Usage: `export default SectionWrapper(Component, "sectionId")`.

### Sections

- **`Hero.jsx`**: Headline, subtext, and `ComputersCanvas` (3D desktop). Scroll-down indicator at bottom.
- **`About.jsx`**: Intro text and a grid of `ServiceCard` (Tilt + motion) using `services` from constants.
- **`Experience.jsx`**: `VerticalTimeline` and `ExperienceCard` for each item in `experiences`.
- **`Tech.jsx`**: Renders `BallCanvas` for each item in `technologies` (icon passed as decal).
- **`Works.jsx`**: Grid of `ProjectCard` (image, title, description, tags, GitHub link) from `projects`.
- **`Feedbacks.jsx`**: Grid of `FeedbackCard` from `testimonials`.
- **`Contact.jsx`**: Form (name, email, message) + `EarthCanvas`. On submit, calls EmailJS with `VITE_APP_*` env vars.

### 3D / Canvas

- **`Loader.jsx`**: Shows loading progress for 3D scenes (uses `useProgress` from Drei).
- **`Ball.jsx` / `BallCanvas`**: Icosahedron with decal texture; used in Tech section.
- **`Computers.jsx` / `ComputersCanvas`**: Loads `public/desktop_pc/scene.gltf`; uses `matchMedia` for mobile scaling.
- **`Earth.jsx` / `EarthCanvas`**: Loads `public/planet/scene.gltf`; auto-rotate orbit.
- **`Stars.jsx` / `StarsCanvas`**: Point cloud with `maath` random positions; used as background.

### Data and styling

- **`constants/index.js`**: Exports `navLinks`, `services`, `technologies`, `experiences`, `testimonials`, `projects`. Edit this file to change copy and links.
- **`styles.js`**: Shared Tailwind class strings (e.g. `paddingX`, `heroHeadText`, `sectionHeadText`).
- **`utils/motion.js`**: Framer Motion variants: `textVariant`, `fadeIn`, `zoomIn`, `slideIn`, `staggerContainer`.

---

## Reusing Components in Other Projects

### Using a single section

1. Copy the component file (e.g. `About.jsx`).
2. Copy its dependencies: `styles`, `constants` (or the slice you need), `SectionWrapper`, `utils/motion`, and any UI libs (e.g. `react-parallax-tilt`, `framer-motion`).
3. Provide the same data shape (e.g. `services` with `title`, `icon`) or adapt the component to your data.

Example: reuse the motion + tilt card pattern without the rest of the app:

```jsx
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const Card = ({ title, icon }) => (
  <Tilt tiltMaxAngleX={45} tiltMaxAngleY={45} scale={1}>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <img src={icon} alt="" />
      <h3>{title}</h3>
    </motion.div>
  </Tilt>
);
```

### Using the SectionWrapper HOC

```jsx
import SectionWrapper from "./hoc/SectionWrapper";

const MySection = () => <div>...</div>;
export default SectionWrapper(MySection, "my-section");
```

Then link with `href="#my-section"`.

### Using 3D canvases

Copy the canvas component and its Loader. Ensure `Canvas` from `@react-three/fiber` and components from `@react-three/drei` are installed. For GLTF, place models in `public/` and load with `useGLTF("/path/to/scene.gltf")`.

### Using motion variants

Copy `utils/motion.js` and use the same variants in your components:

```jsx
import { fadeIn, textVariant } from "./utils/motion";

<motion.div variants={textVariant()}>...</motion.div>
<motion.div variants={fadeIn("up", "spring", 0.2, 0.75)}>...</motion.div>
```

---

## Routes & Navigation

- The app uses **React Router** only for the root path (`/`); there are no route definitions for other paths.
- **In-page navigation** is hash-based: `#about`, `#work`, `#contact`. These match the IDs used in `SectionWrapper(..., "about")`, `SectionWrapper(..., "work")`, and `SectionWrapper(..., "contact")`.
- Nav links are defined in `constants/navLinks` and rendered in `Navbar.jsx`.

---

## APIs & Backend

- **No custom backend.** All content is static (constants + assets).
- **EmailJS** is the only external service: the Contact form sends email via EmailJS from the client using `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, and `VITE_APP_EMAILJS_PUBLIC_KEY`.
- Testimonials use placeholder image URLs (e.g. `https://randomuser.me/...`); you can replace them in `constants/index.js` with your own URLs.

---

## Styling & Theming

- **Tailwind**: Utility-first CSS; config in `tailwind.config.cjs` (content paths, theme extensions).
- **`index.css`**: Imports Tailwind base/components/utilities; sets Poppins font, smooth scroll, and custom classes (e.g. `.black-gradient`, `.violet-gradient`, `.green-pink-gradient`, `.blue-text-gradient`, `.canvas-loader`).
- **`styles.js`**: Centralizes repeated Tailwind strings for padding, hero text, and section headings so components stay consistent.

To change colors or fonts, edit `tailwind.config.cjs` and `index.css`; for section layout, adjust classes in components and `styles.js`.

---

## Keywords & Learning Topics

- React 18, functional components, hooks
- Vite, ESM, fast refresh
- Tailwind CSS, responsive design
- Framer Motion (variants, viewport, stagger)
- React Three Fiber, Three.js, Drei (useGLTF, OrbitControls, Decal, Points, etc.)
- GLTF/GLB 3D models
- EmailJS (client-side email)
- Higher-order components (HOC), section wrappers
- Hash-based navigation, scroll-into-view
- Environment variables in Vite (`VITE_*`)
- ESLint (React, React Hooks, React Refresh)

---

## Conclusion

This repo is a **frontend portfolio template** with 3D visuals, animations, and a contact form. You can run it locally with `npm install` and `npm run dev`, configure EmailJS via `.env` for the contact form, and customize content in `src/constants` and assets. Use individual components or the full layout as a reference for building your own portfolio or learning the stack.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
