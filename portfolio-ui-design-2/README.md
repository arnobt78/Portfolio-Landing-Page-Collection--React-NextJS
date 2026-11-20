# Portfolio Landing Page 2 - React, Vite, JavaScript, Three.js, TailwindCSS Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-green)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blueviolet)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.173-black)](https://threejs.org/)
[![Motion](https://img.shields.io/badge/Motion-12.4-purple)](https://motion.dev/)

A modern, immersive portfolio template built with React and Vite. Features a 3D astronaut hero, parallax scrolling, interactive globe, animated testimonials, and a contact form powered by EmailJS—all without a backend. Ideal for developers, designers, or anyone looking to showcase their work with a standout single-page site.

- **Live Demo:** [https://portfolio-ui-2-3d.vercel.app/](https://portfolio-ui-2-3d.vercel.app/)

![Screenshot 2026-03-07 at 11 20 22](https://github.com/user-attachments/assets/0792a384-54c9-4826-ab2e-4caf0bda7db2)
![Screenshot 2026-03-07 at 11 20 46](https://github.com/user-attachments/assets/e9793218-c98e-4285-a650-acfd4d2c4552)
![Screenshot 2026-03-07 at 11 21 04](https://github.com/user-attachments/assets/afab707f-1563-4859-b56e-38795cd1e7e1)
![Screenshot 2026-03-07 at 11 21 19](https://github.com/user-attachments/assets/613bf888-b0f0-44cf-aab4-8f6a04946a47)
![Screenshot 2026-03-07 at 11 21 34](https://github.com/user-attachments/assets/92043c20-11ef-4f87-9ebf-ee6548873db5)
![Screenshot 2026-03-07 at 11 22 13](https://github.com/user-attachments/assets/e602e1e1-16f1-4a67-bb7b-1e17e8a6d4d9)

## Table of Contents

- [Overview](#overview)
- [Features & Functionalities](#features--functionalities)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Walkthrough](#project-walkthrough)
- [Components Guide](#components-guide)
- [Reusing Components](#reusing-components)
- [API & Backend](#api--backend)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)

---

## Overview

This is a **single-page portfolio** built with React, Vite, and Tailwind CSS. It showcases a developer's projects, experience, testimonials, and contact form with a modern, immersive design featuring **3D graphics** (Three.js), **parallax scrolling**, **animated text**, and **interactive elements**. The project is fully frontend—no backend server required—and uses **EmailJS** for contact form submissions.

---

## Features & Functionalities

| Feature                  | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **3D Hero**              | Animated astronaut model (GLB) with mouse-follow camera and floating effect               |
| **Parallax Background**  | Multi-layer scroll-based parallax (sky, mountains, planets)                               |
| **FlipWords**            | Cycling headline words with blur/scale animation (e.g., "Secure" → "Modern" → "Scalable") |
| **Interactive Globe**    | COBE-based 3D globe with drag-to-rotate and city markers                                  |
| **Orbiting Tech Stack**  | Frameworks displayed in circular orbits (clockwise + counter-clockwise)                   |
| **Draggable Cards**      | About section cards (SOLID, Design Patterns, etc.) with drag constraints                  |
| **Project Preview**      | Hover over projects to see floating image that follows cursor                             |
| **Project Modal**        | "Read More" opens full project details (image, description, tags)                         |
| **Timeline**             | Scroll-linked work experience timeline with animated progress line                        |
| **Testimonial Marquee**  | Dual-row infinite scroll of client reviews (pause on hover)                               |
| **Contact Form**         | EmailJS integration—sends emails without backend                                          |
| **Particles Background** | Canvas particles with mouse magnetism in Contact section                                  |
| **Responsive Navbar**    | Fixed header with mobile hamburger menu and smooth animations                             |

---

## Technology Stack

| Technology            | Purpose                                     |
| --------------------- | ------------------------------------------- |
| **React 19**          | UI library                                  |
| **Vite 6**            | Build tool, dev server, HMR                 |
| **Tailwind CSS 4**    | Utility-first styling, theme variables      |
| **Three.js**          | 3D rendering                                |
| **React Three Fiber** | React renderer for Three.js                 |
| **@react-three/drei** | Helpers (Float, Html, useProgress, useGLTF) |
| **Motion**            | Animations (successor to Framer Motion)     |
| **COBE**              | Lightweight 3D globe (canvas-based)         |
| **EmailJS**           | Client-side email sending (no backend)      |
| **Maath**             | Math utilities (easing for 3D)              |
| **react-responsive**  | Media queries for responsive logic          |
| **tailwind-merge**    | Merge Tailwind classes without conflicts    |

---

## Project Structure

```bash
portfolio-ui-2/
├── public/
│   ├── assets/           # SVGs, logos, social icons
│   ├── models/           # 3D GLB files (astronaut)
│   ├── vite.svg          # Favicon
│   └── (sky.jpg, mountain-*.png, planets.png)  # Parallax images
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Alert.jsx
│   │   ├── Astronaut.jsx
│   │   ├── Card.jsx
│   │   ├── CopyEmailButton.jsx
│   │   ├── FlipWords.jsx
│   │   ├── Frameworks.jsx
│   │   ├── globe.jsx
│   │   ├── HeroText.jsx
│   │   ├── Loader.jsx
│   │   ├── Marquee.jsx
│   │   ├── OrbitingCircles.jsx
│   │   ├── parallaxBackground.jsx
│   │   ├── Particles.jsx
│   │   ├── Project.jsx
│   │   └── ProjectDetails.jsx
│   │   └── Timeline.jsx
│   ├── sections/        # Page sections
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experiences.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── Testimonial.jsx
│   ├── constants/
│   │   └── index.js     # Projects, socials, experiences, reviews
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-ui-2

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Preview with:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

The **Contact form** uses **EmailJS** to send emails. For production, store credentials in environment variables.

### Step 1: Create EmailJS Account

1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create an **Email Service** (e.g., Gmail)
3. Create an **Email Template** with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, etc.
4. Note your **Service ID**, **Template ID**, and **Public Key**

### Step 2: Create `.env` File

Create `.env` in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** Vite only exposes variables prefixed with `VITE_` to the client.

### Step 3: Use in Code

In `src/sections/Contact.jsx`, replace hardcoded values:

```jsx
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    to_name: "John Doe",
    from_email: formData.email,
    to_email: "johndoe@email.com",
    message: formData.message,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
);
```

### `.env.example` (Optional)

Create `.env.example` for documentation (do not commit secrets):

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

## Project Walkthrough

### 1. Entry Point

`main.jsx` mounts the app with React 18+ `createRoot` and `StrictMode`:

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### 2. App Layout

`App.jsx` composes all sections in order. Navigation uses anchor links (`#home`, `#about`, `#work`, `#contact`) for smooth scrolling.

### 3. Hero Section

- **HeroText**: Staggered Motion animations + FlipWords for cycling adjectives
- **ParallaxBackground**: `useScroll` + `useTransform` for layer movement
- **Canvas**: Three.js scene with Astronaut (Float), Rig (camera follows mouse), Loader (progress)

### 4. About Section

- **Grid 1**: Intro + profile image
- **Grid 2**: "CODE IS CRAFT" with draggable Card components (text + tech logos)
- **Grid 3**: Time zone + Globe
- **Grid 4**: CTA + CopyEmailButton
- **Grid 5**: Tech stack + Frameworks (OrbitingCircles)

### 5. Projects Section

- `handleMouseMove` updates `x`, `y` motion values
- Spring values drive floating preview image position
- Each Project row calls `setPreview(image)` on hover
- "Read More" opens ProjectDetails modal

### 6. Experiences Section

- Timeline receives `experiences` from constants
- `useScroll` + `useTransform` animate gradient line height with scroll

### 7. Testimonial Section

- Reviews split into `firstRow` and `secondRow`
- Two Marquee components: one normal, one `reverse`
- `pauseOnHover` pauses animation for readability

### 8. Contact Section

- Particles canvas background
- Form state: `formData`, `isLoading`, `showAlert`
- `handleSubmit` calls EmailJS; Alert shows success/error

---

## Components Guide

### FlipWords

Cycles through words with blur/scale exit animation.

**Props:** `words` (array), `duration` (ms), `className`

```jsx
<FlipWords
  words={["Secure", "Modern", "Scalable"]}
  duration={3000}
  className="font-black text-8xl"
/>
```

---

### Marquee

Infinite horizontal or vertical scroll.

**Props:** `reverse`, `pauseOnHover`, `vertical`, `repeat`, `className`

```jsx
<Marquee pauseOnHover reverse className="[--duration:20s]">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</Marquee>
```

---

### OrbitingCircles

Places children in orbit around center.

**Props:** `reverse`, `duration`, `radius`, `path`, `iconSize`, `speed`

```jsx
<OrbitingCircles iconSize={40} radius={160} duration={20}>
  {icons.map((icon, i) => (
    <img key={i} src={icon} />
  ))}
</OrbitingCircles>
```

---

### Card (Draggable)

Text or image card with drag constraints.

**Props:** `style`, `text`, `image`, `containerRef`

```jsx
const containerRef = useRef();
<Card
  style={{ rotate: "45deg", top: "50%", left: "50%" }}
  text="SOLID"
  containerRef={containerRef}
/>;
```

---

### Globe

Interactive 3D globe (COBE).

**Props:** `className`, `config` (optional overrides)

```jsx
<Globe className="w-full max-w-[400px]" />
```

---

### Particles

Canvas particle background with mouse magnetism.

**Props:** `quantity`, `ease`, `color`, `refresh`, `className`

```jsx
<Particles quantity={100} ease={80} color="#ffffff" refresh />
```

---

### Alert

Toast notification for success/error.

**Props:** `type` ("success" | "danger"), `text`

```jsx
<Alert type="success" text="Message sent!" />
```

---

### Timeline

Scroll-linked work experience timeline.

**Props:** `data` (array of `{ title, job, date, contents }`)

```jsx
<Timeline data={experiences} />
```

---

## Reusing Components

### In Another React Project

1. **Copy the component file** (e.g., `FlipWords.jsx`, `Marquee.jsx`)
2. **Install dependencies** if needed:

   ```bash
   npm install motion tailwind-merge
   ```

3. **Copy related CSS** from `index.css` (e.g., `@keyframes marquee`, `--animate-orbit`)
4. **Import and use**:

   ```jsx
   import { FlipWords } from "./components/FlipWords";
   <FlipWords words={["Fast", "Reliable"]} />;
   ```

### Standalone Usage Example

```jsx
// Marquee in a marketing site
<Marquee repeat={6} pauseOnHover>
  {partners.map(p => <img key={p.id} src={p.logo} alt={p.name} />)}
</Marquee>

// OrbitingCircles for skills
<OrbitingCircles iconSize={32} radius={120} reverse speed={1.5}>
  {skills.map(s => <SkillBadge key={s} name={s} />)}
</OrbitingCircles>
```

---

## API & Backend

This project has **no backend**. It is a static SPA.

| Service      | Usage                                                        |
| ------------ | ------------------------------------------------------------ |
| **EmailJS**  | Client-side email sending via their API. No server required. |
| **Robohash** | Used for testimonial avatars (`https://robohash.org/{name}`) |

### EmailJS Flow

1. User submits form → `emailjs.send()` called
2. EmailJS API receives request with template variables
3. Email sent to configured inbox
4. Success/error handled in `try/catch`

---

## Keywords

`portfolio`, `React`, `Vite`, `Tailwind CSS`, `Three.js`, `3D`, `WebGL`, `parallax`, `animation`, `Motion`, `EmailJS`, `frontend`, `SPA`, `responsive`, `globe`, `marquee`, `timeline`, `contact form`, `open source`, `educational`, `developer portfolio`

---

## Conclusion

This portfolio demonstrates modern frontend techniques: **3D with Three.js**, **scroll-based animations**, **reusable components**, and **no-backend contact forms**. The structure is modular—sections and components can be reused or replaced. Customize content via `src/constants/index.js` and styling via `src/index.css` and Tailwind theme variables.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
