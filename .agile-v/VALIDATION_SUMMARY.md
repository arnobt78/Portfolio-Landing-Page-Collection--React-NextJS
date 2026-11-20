# Validation summary

## Node 26 and guardrail follow-up

- Project 1: clean `npm ci`, lint, `tsc --noEmit`, and production build passed on Node 26.13.1. Its package and lockfile now declare `26.x`; its CI matrix entry selects Node 26.
- Project 1's current image sources are local. With `remotePatterns: []`, a local production server returned HTTP 200 for the homepage and its local optimized PNG, and HTTP 400 for an unapproved remote image. Independent static review found no current remote image sources; it did not independently run browser checks.
- A headless Chrome smoke test loaded the homepage at 1280×800 and 390×844, with no observed document overflow, broken completed images, or uncaught JavaScript exceptions. Its temporary browser-profile cleanup reported a nonempty-directory error; rendering, interactions, WebGL, and browsers were not exhaustively tested.
- Fresh project 1 `npm audit --package-lock-only` reported 2 critical, 26 high, 10 moderate, and 2 low advisories. The installed Next.js 14 is unsupported, and the installed Vercel CLI is older than the version required for Node 26 prebuilt functions.
- A private isolated Next 16/React 19/Three.js candidate passed type checking, production build, local image endpoint checks, and limited Chrome desktop/mobile smoke checks. Its network clean install succeeded. Its audit still reports 1 critical, 21 high, and 16 moderate advisories. After retaining Next's current core-web-vitals rules and fixing the development command, lint reported 54 errors in existing animation and globe code. Independent review found that resolving them needs careful visual, 3D, and Safari regression testing. The candidate remains isolated and has not been applied.
- Project 2's original lockfile audit reported 10 high, 6 moderate, and 3 low advisories. Updated compatible lockfile dependencies, Vite to 8.3.8, its React plugin to 6.3.0, EmailJS to 5.0.3, Motion to 14.14.0, and Three.js and its types to 0.187.0; the resulting audit reports zero advisories, and clean install, lint, and build pass on Node 26.13.1. Its engine and CI entry select 26. Removed contact-form debug logging of submitted personal data; headless browser tests exercised the mobile menu, project modal, and mocked EmailJS success and failure without sending messages. Baseline and updated desktop/mobile hero screenshots showed matching layout and visible 3D rendering. These are limited checks; interactions, physical-GPU rendering, and browsers were not exhaustive. The current Three.js chunk is 1,220.39 kB versus the original 808.84 kB, exceeding the existing build warning threshold; aggregate emitted JavaScript gzip sizes are similar, which does not establish actual load performance. The existing `rollupOptions` compatibility alias is deprecated. Other package major-version upgrades remain unassessed.
- Project 2's isolated COBE 2 candidate passed lint/build/audit but changed the visible globe and produced a DOM `removeChild` exception. Its v2 package no longer has the existing `onRender` API and wraps the canvas, so it was not applied. A baseline browser run also produced one intermittent exception without capturing details; a repeat did not reproduce it. Project 2's ESLint React version is now detected from the installed React package and lint passes. ESLint 10 cannot be installed without overriding the current React plugin's declared peer range.
- Project 2's React Hooks and React Refresh plugins and globals were updated to compatible current versions. The existing particle effects were moved below their helper declarations without changing their order, bodies, dependencies, or cleanup. Clean install, lint, build and audit passed; browser smoke observed particle animation, resize, menu/modal and mocked contact success/failure. A later COBE 2 experiment used an explicit animation loop and restored map rendering, but its markers still differed visually and lifecycle and GPU compatibility were not established; it remains isolated. `npm outdated` lists only COBE, ESLint, and `@eslint/js` as behind their latest majors.
- Project 3: Node 26.13.1 clean offline install, lint, build, development-server HTTP check, lockfile peer validation and audit passed; audit declined from 32 advisories to zero. Updated Vite, React plugin, router, EmailJS, Motion and compatible dependencies; retained React 18 and pinned Drei 9.97 and Three 0.151.3 after newer Three candidates visibly darkened the 3D scene. A scoped UUID 11.1.1 override addresses the remaining audit advisory outside Drei's declared major range. Headless Chrome desktop/mobile smoke exercised navigation, project links, mocked contact success/failure and missing configuration; the desktop 3D screenshot matched the baseline. Live email, real GPUs, other browsers and exhaustive interactions were not verified. Vite reports a guarded BatchedMesh import warning and a 1,229.75 kB minified bundle warning. ESLint and three-mesh-bvh also issue deprecation warnings; see RISKS.md.

- Discovery and preservation: 21 projects and their READMEs, manifests and npm lockfiles are present. Full private backups of all 21 Git metadata directories passed file-by-file SHA-256 verification before cleanup. At the end of consolidation, before the follow-up modernization, a comparison with all 2,175 original baseline entries found no missing files and one changed file: the intentionally restored project 14 GLB. Follow-up changes to projects 1 and 2 are described above.
- Project 14's GLB was decrypted from the pre-existing encrypted asset; its SHA-256, size, and GLB header match the original LFS pointer. Git LFS is configured locally for publication; verify the remote object after pushing.
- Git: exactly one root `.git` directory remains. Project 11's invalid metadata was removed with its approved nested repository and preserved in the private backup. The public baseline uses a reusable `preview-branch` PR into `main`.
- Ignore checks: representative environment paths and generated dependencies/build outputs are excluded; environment templates, lockfiles, the model and project 1's VS Code configuration are eligible. Project 17's original ignore file excludes its `.claude` and `.vscode` files, which remain on disk.
- Root README's local links and 21 catalog entries were checked; the workflow parses as YAML. GitHub Actions has not been run. Independent review identified and confirmed fixes for the VS Code ignore and workflow check sequencing issues.
- Security: a limited high-confidence credential pattern scan found no matches; lockfile-only audit results and limitations are in SECURITY_REVIEW.md.

## Local project checks

Node 22.22.3, npm 12.0.2. Each project was attempted with `npm ci --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000`; a 180-second cap was used for the batch. After successful installs, available `npm run lint`, `npm run test`, `npm run type-check`, and `npm run build` scripts were run. Projects 6 and 7 were retried after earlier concurrent install attempts were stopped. The remaining 15 were also attempted using `npm ci --offline --no-audit --no-fund`; cached packages allowed projects 9 and 19 to complete, while 13 projects still could not install. Their downstream checks were not run. Logs are in the private backup's `validation-logs` directory.

| Project | Result |
| --- | --- |
| 1 | install: TIMEOUT |
| 2 | install: TIMEOUT |
| 3 | install: PASS; lint: PASS; build: PASS |
| 4 | install: PASS; lint: PASS; build: PASS |
| 5 | install: PASS; lint: PASS; build: PASS |
| 6 | install: PASS; lint: PASS; build: PASS |
| 7 | install: PASS; lint: PASS; build: PASS |
| 8 | install: TIMEOUT |
| 9 | install-offline: PASS; lint: PASS; build: PASS |
| 10 | install: TIMEOUT |
| 11 | install: PASS; lint: PASS; test: PASS; build: PASS |
| 12 | install: TIMEOUT |
| 13 | install: TIMEOUT |
| 14 | install: TIMEOUT |
| 15 | install: FAIL (1) |
| 16 | install: FAIL (1) |
| 17 | install: TIMEOUT |
| 18 | install: FAIL (1) |
| 19 | install-offline: PASS; lint: PASS; build: PASS |
| 20 | install: TIMEOUT |
| 21 | install: TIMEOUT |

The earlier consolidation did not include browser checks; limited follow-up headless Chrome checks for projects 1 through 3 are described above. Accessibility, production deployment, remote GitHub, and actual GitHub Actions checks have not been run. No production deployment is claimed. EvalGate: NOT RUN; Gate 2 and release acceptance are not approved.
