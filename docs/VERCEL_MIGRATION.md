# Future Vercel setup

The previous GitHub repositories and Vercel projects were reported deleted. The historical remotes below are inventory only; no deployment or URL is verified. A new GitHub repository and Vercel projects must be configured separately.

For each application, connect the future monorepo to its own Vercel project and set the root directory below. Review the project README, lockfile, Node version, framework preset, build command (`npm run build`), output settings, and applicable environment variables. Preserve existing `vercel.json` settings. Preview and verify each deployment independently before assigning a production domain. Never copy secret values into source control.

Environment names below come from checked-in example/template files only and may not be exhaustive. Determine required values from each project’s documentation and integrations.

| Project / root directory | Historical GitHub repository | Framework | Environment names in templates |
| --- | --- | --- | --- |
| `portfolio-ui-design-1` | `https://github.com/arnobt78/portfolio-ui-1.git` | Next.js | `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` |
| `portfolio-ui-design-2` | `https://github.com/arnobt78/portfolio-ui-2.git` | React/Vite | None found in templates |
| `portfolio-ui-design-3` | `https://github.com/arnobt78/portfolio-ui-3.git` | React/Vite | None found in templates |
| `portfolio-ui-design-4` | `https://github.com/arnobt78/portfolio-ui-4.git` | React/Vite | `VITE_APP_EMAILJS_PUBLIC_KEY`, `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID` |
| `portfolio-ui-design-5` | `https://github.com/arnobt78/portfolio-ui-5.git` | React/Vite | None found in templates |
| `portfolio-ui-design-6` | `https://github.com/arnobt78/portfolio-ui-6.git` | React/Vite | None found in templates |
| `portfolio-ui-design-7` | `https://github.com/arnobt78/portfolio-ui-7.git` | React/Vite | None found in templates |
| `portfolio-ui-design-8` | `https://github.com/arnobt78/portfolio-ui-8.git` | React/Vite | None found in templates |
| `portfolio-ui-design-9` | `https://github.com/arnobt78/portfolio-ui-9.git` | Next.js | None found in templates |
| `portfolio-ui-design-10` | `https://github.com/arnobt78/10-tailwind-portfolio.git` | React/Vite | None found in templates |
| `portfolio-ui-design-11` | `https://github.com/arnobt78/portfolio-ui-11--not-.git` | React/Vite | `EMAIL_PASS`, `EMAIL_TO`, `EMAIL_USER`, `PORT`, `VITE_MAILCHIMP_ID`, `VITE_MAILCHIMP_U`, `VITE_MAILCHIMP_URL` |
| `portfolio-ui-design-12` | `https://github.com/arnobt78/portfolio-ui-12.git` | React/Vite | None found in templates |
| `portfolio-ui-design-13` | `https://github.com/arnobt78/portfolio-ui-13.git` | React/Vite | `VITE_PUBLIC_KEY`, `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID` |
| `portfolio-ui-design-14` | `https://github.com/arnobt78/portfolio-ui-14.git` | React/Vite | None found in templates |
| `portfolio-ui-design-15` | `https://github.com/arnobt78/portfolio-ui-15.git` | React/Vite | None found in templates |
| `portfolio-ui-design-16` | `https://github.com/arnobt78/portfolio-ui-16.git` | React/Vite | `DISABLE_ESLINT_PLUGIN`, `GENERATE_SOURCEMAP` |
| `portfolio-ui-design-17` | `https://github.com/arnobt78/portfolio-ui-17.git` | Next.js | `GITHUB_TOKEN`, `LOOPS_API_KEY`, `NEXT_PUBLIC_SUPABASE_ANON`, `NEXT_PUBLIC_SUPABASE_URL`, `PAGESPEED_API_KEY`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY` |
| `portfolio-ui-design-18` | `https://github.com/arnobt78/portfolio-ui-18.git` | Next.js | None found in templates |
| `portfolio-ui-design-19` | `https://github.com/arnobt78/portfolio-ui-19.git` | Next.js | `NEXT_PUBLIC_GITHUB_STATS_URL`, `NEXT_PUBLIC_GITHUB_STREAK_STATS_URL`, `NEXT_PUBLIC_PUBLIC_KEY`, `NEXT_PUBLIC_SERVICE_ID`, `NEXT_PUBLIC_TEMPLATE_ID` |
| `portfolio-ui-design-20` | `https://github.com/arnobt78/portfolio-ui-20.git` | Next.js | None found in templates |
| `portfolio-ui-design-21` | `https://github.com/arnobt78/portfolio-ui-21.git` | Next.js | None found in templates |

Project 11 includes an Express contact server: a static Vite deployment alone does not establish that API. Project 17 has optional server-side integrations and generated content; verify their configuration independently.

Project 14 includes a restored GLB and a nested Git LFS attribute. Git LFS is configured for the collection; ensure the LFS object is uploaded and available to GitHub Actions and the deployment provider. The workflow requests LFS checkout. Do not delete the restored local asset until its published copy is verified.

Do not assume an existing domain, environment configuration, or working deployment survives the deleted projects.
