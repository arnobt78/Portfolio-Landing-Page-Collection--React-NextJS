# C1 project and Git inventory

The private backup is stored outside the repository. It contains `verification.json`, `working-tree-baseline.json`, `repository-inventory.json`, and one complete `.git` copy per project. Keep it private.

At discovery, all 21 used npm lockfiles and had READMEs; none had installed node_modules. Each nested repository was on local `main`, had one worktree, and showed a modified LICENSE plus six untracked files. Remote-tracking refs were local snapshots, not proof of remote availability. The cleanup paths below are historical; projects 1–9 were later renamed with leading zeroes.

| Project | Framework | Scripts | Vercel config | Exact proposed cleanup target |
| --- | --- | --- | --- | --- |
| 1 | Next.js | dev, build, start, lint, deploy | no | `portfolio-ui-design-1/.git` |
| 2 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-2/.git` |
| 3 | React/Vite | dev, build, preview, lint, lint:fix | no | `portfolio-ui-design-3/.git` |
| 4 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-4/.git` |
| 5 | React/Vite | dev, build, lint, lint:fix, preview | no | `portfolio-ui-design-5/.git` |
| 6 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-6/.git` |
| 7 | React/Vite | start, dev, build, preview, lint, lint:fix | yes | `portfolio-ui-design-7/.git` |
| 8 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-8/.git` |
| 9 | Next.js | dev, build, start, lint | no | `portfolio-ui-design-9/.git` |
| 10 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-10/.git` |
| 11 | React/Vite | start, dev, server, build, preview, test, lint, lint:fix | no | `portfolio-ui-design-11/.git` |
| 12 | React/Vite | dev, build, preview, lint | yes | `portfolio-ui-design-12/.git` |
| 13 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-13/.git` |
| 14 | React/Vite | dev, build, lint, preview | no | `portfolio-ui-design-14/.git` |
| 15 | React/Vite | dev, build, lint, preview | yes | `portfolio-ui-design-15/.git` |
| 16 | React/Vite | dev, start, build, preview, lint, lint:fix, predeploy, deploy | yes | `portfolio-ui-design-16/.git` |
| 17 | Next.js | dev, build, start, lint, generate-previews, fix-previews | no | `portfolio-ui-design-17/.git` |
| 18 | Next.js | dev, dev:webpack, build, start, lint | no | `portfolio-ui-design-18/.git` |
| 19 | Next.js | dev, build, start, lint | no | `portfolio-ui-design-19/.git` |
| 20 | Next.js | dev, build, start, lint, lint:fix | no | `portfolio-ui-design-20/.git` |
| 21 | Next.js | dev, build, start, lint, type-check | yes | `portfolio-ui-design-21/.git` |

Project 7 declares Node `>=20 <25`; project 20 declares Node `>=18.0.0`. Other projects need their dependency requirements checked before choosing CI Node versions.

At discovery, project 14 contained an LFS pointer for `public/models/character.glb`, and its 1,537,316-byte object was absent from the local LFS store. The object was recovered from the existing encrypted asset, verified against its pointer, and restored. Project 11 had an invalid `refs/.DS_Store` entry; it remains in the private backup and was removed from the collection with the approved nested Git metadata cleanup.

Private backup data records source filenames and hashes, refs, Git statuses, and remote URLs; real environment contents are omitted from the working-tree baseline. Backup metadata may itself contain sensitive historical data.
