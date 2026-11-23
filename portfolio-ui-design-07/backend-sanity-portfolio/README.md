# Backend: Sanity CMS for Portfolio

Optional **Sanity Studio** backend for the [Portfolio Landing Page 7](https://github.com/arnobt78/portfolio-ui-7) frontend. Use this to manage portfolio content (abouts, works, skills, experiences, testimonials, brands, contact submissions) in a headless CMS. The frontend currently runs on **mock data** and does not require this backend.

---

## Overview

- **Stack:** Sanity v2 (Content Studio), React 17, styled-components
- **Role:** Content management for the portfolio sections; contact form submissions can be stored here if the frontend is wired to Sanity
- **Config:** `sanity.json` (project id, dataset, plugins, schema path)

---

## Prerequisites

- Node.js (see root project or Sanity docs)
- A [Sanity.io](https://www.sanity.io) account (for your own projectId/dataset)

---

## Project structure

```bash
backend-sanity-portfolio/
├── sanity.json           # Studio config: projectId, dataset, plugins, schema part
├── package.json
├── tsconfig.json
├── config/               # Sanity layout/login/form config
├── schemas/
│   ├── schema.js         # Registers all document types
│   ├── abouts.js         # About cards (title, description, imgUrl)
│   ├── works.js          # Portfolio items (title, description, links, imgUrl, tags)
│   ├── skills.js         # Skills (name, bgColor, icon)
│   ├── experiences.js    # Experience years + array of workExperience
│   ├── workExperience.js # Nested: name, company, desc
│   ├── testimonials.js    # name, company, imgurl, feedback
│   ├── brands.js         # name, imgUrl
│   └── contact.js        # Contact form (name, email, message)
├── static/               # Static assets (e.g. favicon)
└── plugins/              # Custom plugins (optional)
```

---

## Setup & run

```bash
cd backend-sanity-portfolio
npm install
npm start
```

Studio runs at **<http://localhost:3333>** (or the URL printed in the terminal). Log in with your Sanity account; create a project or use an existing one and set `projectId` and `dataset` in `sanity.json` to match.

---

## Schemas (document types)

| Type               | Purpose                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **abouts**         | About section cards: `title`, `description`, `imgUrl` (image)                                           |
| **works**          | Portfolio items: `title`, `description`, `projectLink`, `codeLink`, `imgUrl`, `tags` (array of strings) |
| **skills**         | Skill items: `name`, `bgColor`, `icon` (image)                                                          |
| **experiences**    | Year blocks: `year`, `works` (array of workExperience)                                                  |
| **workExperience** | Nested under experiences: `name`, `company`, `desc`                                                     |
| **testimonials**   | Testimonials: `name`, `company`, `imgurl` (image), `feedback`                                           |
| **brands**         | Brand logos: `name`, `imgUrl` (image)                                                                   |
| **contact**        | Contact submissions: `name`, `email`, `message`                                                         |

Schema is registered in `schemas/schema.js` and wired in `sanity.json` via `parts` → `part:@sanity/base/schema` → `./schemas/schema`.

---

## Linking to the frontend

The main app uses **mock data** in `src/mockData.js` and does not call Sanity. Connecting this Studio requires a separate implementation and security review; environment variables alone do not enable it. Configure the project, dataset and allowed origins for that integration through the [Sanity project settings](https://www.sanity.io/manage).

Never put a private Sanity API token in a `VITE_*` variable or frontend bundle. Restricted operations require an appropriate server-side integration with authorization and server-side secret storage.

---

## Scripts

| Command         | Description                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `npm start`     | Start Sanity Studio in development                                                                  |
| `npm run build` | Build the studio for deployment (e.g. deploy to [sanity.io](https://www.sanity.io/docs/deployment)) |

---

## License

See root repository license. This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
