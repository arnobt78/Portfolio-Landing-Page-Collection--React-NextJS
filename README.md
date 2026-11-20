# Portfolio Landing Page Collection

A collection of 21 independently developed portfolio interfaces, consolidated for easier browsing and maintenance. Each directory remains a standalone application with its own dependencies, scripts, assets, and documentation.

The collection uses React with Next.js or Vite. Individual projects also use technologies including TypeScript, Tailwind CSS, Three.js, React Three Fiber, GSAP, and Framer Motion; consult each project for its exact stack and requirements.

## Projects

| Project | Stack | Overview |
| --- | --- | --- |
| [1](portfolio-ui-design-1/README.md) | Next.js, TypeScript, Tailwind CSS | Animated developer portfolio with a 3D globe and project sections. |
| [2](portfolio-ui-design-2/README.md) | React/Vite, JavaScript, Tailwind CSS | 3D astronaut portfolio with interactive sections and a contact form. |
| [3](portfolio-ui-design-3/README.md) | React/Vite, JavaScript, Tailwind CSS | 3D portfolio with animation and a contact form. |
| [4](portfolio-ui-design-4/README.md) | React/Vite, JavaScript, Tailwind CSS | Developer portfolio with 3D visuals and an experience timeline. |
| [5](portfolio-ui-design-5/README.md) | React/Vite, JavaScript, Tailwind CSS | Portfolio with 3D visuals and scroll-triggered animation. |
| [6](portfolio-ui-design-6/README.md) | React/Vite, JavaScript, Tailwind CSS | Dark-themed portfolio with a contact form. |
| [7](portfolio-ui-design-7/README.md) | React/Vite, JavaScript | Animated section-based portfolio using mock data. |
| [8](portfolio-ui-design-8/README.md) | React/Vite, JavaScript, Tailwind CSS | 3D developer portfolio with project and experience sections. |
| [9](portfolio-ui-design-9/README.md) | Next.js, TypeScript, Tailwind CSS | TypeScript portfolio with CSS scroll animations. |
| [10](portfolio-ui-design-10/README.md) | React/Vite, JavaScript, Tailwind CSS | Developer profile with skills and project cards. |
| [11](portfolio-ui-design-11/README.md) | React/Vite, JavaScript | Portfolio with an Express contact API and newsletter signup. |
| [12](portfolio-ui-design-12/README.md) | React/Vite, JavaScript | Scroll-snap portfolio with 3D visuals and a contact form. |
| [13](portfolio-ui-design-13/README.md) | React/Vite, JavaScript, Tailwind CSS | Portfolio with animated cards, experience and contact sections. |
| [14](portfolio-ui-design-14/README.md) | React/Vite, TypeScript | 3D character portfolio with physics and scroll animation. |
| [15](portfolio-ui-design-15/README.md) | React/Vite, JavaScript, Tailwind CSS | Portfolio with animated sections and data-driven content. |
| [16](portfolio-ui-design-16/README.md) | React/Vite, JavaScript | Portfolio with project gallery and contact form. |
| [17](portfolio-ui-design-17/README.md) | Next.js, TypeScript, Tailwind CSS | Developer portfolio and MDX blog with optional Supabase integration. |
| [18](portfolio-ui-design-18/README.md) | Next.js, TypeScript, Tailwind CSS | Developer portfolio with experience, projects and contact sections. |
| [19](portfolio-ui-design-19/README.md) | Next.js, JavaScript, Tailwind CSS | Creative portfolio with 3D visuals and optional contact integration. |
| [20](portfolio-ui-design-20/README.md) | Next.js, TypeScript, Tailwind CSS | Portfolio and MDX blog with dynamic Open Graph images. |
| [21](portfolio-ui-design-21/README.md) | Next.js, TypeScript, Tailwind CSS | Portfolio with blog, theme switching and contact integration. |

Individual READMEs contain screenshots and further details. Historical demo links may no longer work: the former GitHub repositories and Vercel projects were reported deleted, and no live demos have been verified.

## Run a project

Use the Node.js version required by the chosen project. For example, project 1 uses Node 26. Then install and run from that project’s directory:

```sh
cd portfolio-ui-design-1
npm ci
npm run dev
```

Replace `1` with the project number. Consult its README and environment templates for configuration; do not commit real credentials. Run `npm run build`, `npm run lint`, and any documented tests within the same directory. Project 11 also has a separate local Express server.

Projects are intentionally independent: there are no shared workspaces or root dependency installs. The [deployment guide](docs/VERCEL_MIGRATION.md) covers future per-project Vercel setup.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). The collection is maintained by Arnob Mahmud and licensed under the [MIT License](LICENSE); preserve individual project notices and third-party attribution.
