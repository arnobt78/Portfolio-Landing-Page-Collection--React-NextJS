# C1 security review

Project 09's clean Node 26 audit reported zero vulnerabilities after updates. Its demo API still returns the same static public response; local image optimization is restricted to `/images/**` and quality 75, and requests for external and other local sources returned 400 in local tests. Vercel firewall and deployment settings were not changed.

Project 08 uses browser-visible EmailJS configuration; it must not contain private credentials and does not replace provider-side abuse controls. Missing configuration and mocked provider failure preserve input; no live delivery was tested. Node 26 clean-install audit reported zero advisories. No Vercel firewall settings were changed.

A limited scan of 1,341 Git-eligible text files up to 5 MiB found no high-confidence private-key, AWS access key, GitHub token, or Google API key patterns. This is not an exhaustive secret review. No eligible real `.env` files or generated dependency/build directories were found. No eligible files exceeded 50 MiB.

Before baseline publication, Gitleaks scanned the staged changes and reported two matches. Manual review identified a Spotify image URL and a Vemetric browser tracking token; Vemetric documents that token as public. Neither match was identified as a private credential. This scan is not exhaustive; the existing project 17 tracking integration remains in place.

The user requested closure of GitGuardian incident 27937045 on 2026-11-23. The flagged value is used as a client-visible Vemetric project tracking token, consistent with [Vemetric's integration example](https://vemetric.com/); the provider distinguishes its [private API keys](https://vemetric.com/docs/api/getting-started) from the tracking script. The incident remains open because the available GitGuardian token has scan-only and honeytoken-check scopes, not incident-management permission. Removing the value from the current file would not remove its historical occurrences or classify the incident.

Lockfile-only `npm audit` was attempted on each project. Counts below are advisories reported by npm for that project, including development dependencies; they are not deduplicated across projects. Projects 1–4 reflect their updated lockfiles; most other rows are from the earlier consolidation audit and may have changed. Registry timeouts remain unverified.

| Project | Low | Moderate | High | Critical | Status |
| --- | ---: | ---: | ---: | ---: | --- |
| 1 | 0 | 16 | 21 | 0 | Updated full audit on 2026-11-22; all remaining findings are in the development Vercel CLI tree. Production-only audit reports zero. |
| 2 | 0 | 0 | 0 | 0 | Updated lockfile audit passed on 2026-11-20; original lockfile had 19 advisories |
| 3 | 0 | 0 | 0 | 0 | Updated dependency audit passed on 2026-11-21; original lockfile had 32 advisories |
| 4 | 0 | 0 | 0 | 0 | Updated dependency audit passed on 2026-11-22; original lockfile had 16 advisories. |
| 5 | 0 | 0 | 0 | 0 | Node 26 clean-install audit passed on 2026-11-23 after local dependency updates; deployment not verified. |
| 6 | 0 | 0 | 0 | 0 | Node 26 clean-install audit passed on 2026-11-23 after dependency updates. EmailJS uses public browser configuration; provider-side abuse controls and live delivery were not verified. |
| 7 | 0 | 0 | 0 | 0 | Frontend clean-install audit passed on 2026-11-23. The separate unused Sanity 2 Studio lockfile reported 173 advisories (14 critical, 53 high); its migration was explicitly deferred. Frontend ESLint 8 is end-of-life but retained due to the existing Airbnb configuration's peer range. |
| 8 | 1 | 10 | 14 | 0 | Advisories reported |
| 9 | — | — | — | — | Timed out or audit error |
| 10 | 1 | 3 | 10 | 0 | Advisories reported |
| 11 | — | — | — | — | Timed out or audit error |
| 12 | 1 | 3 | 12 | 0 | Advisories reported |
| 13 | 2 | 2 | 13 | 0 | Advisories reported |
| 14 | 1 | 3 | 11 | 0 | Advisories reported |
| 15 | 2 | 3 | 12 | 0 | Advisories reported |
| 16 | 1 | 5 | 8 | 0 | Advisories reported |
| 17 | 1 | 9 | 12 | 1 | Advisories reported |
| 18 | 1 | 2 | 11 | 1 | Advisories reported |
| 19 | 0 | 6 | 10 | 1 | Advisories reported |
| 20 | 1 | 8 | 18 | 1 | Advisories reported |
| 21 | 1 | 5 | 14 | 1 | Advisories reported |

The CI workflow uses read-only repository permissions and does not deploy. Action execution and dependency lifecycle scripts run code from the checked-in lockfiles; review updates and workflow changes before enabling on a public repository.

Project 2's form no longer logs submitted personal data to the console. Its browser-side EmailJS identifiers are public client configuration; they do not provide a server-side abuse boundary. Contact success and failure were tested with mocked requests, not live delivery. A zero-advisory audit is not a guarantee that the application or its integrations are secure.

Project 3's scoped override updates Drei's UUID dependency to 11.1.1, outside Drei's declared major range; Drei's installed code uses the named v4 API and the project does not directly use its Cloud component. Clean install, peer checks, build and limited browser checks passed; reassess the override when upgrading the 3D stack. Its EmailJS failure path no longer logs errors and restores the submit button even if configuration is missing. Email delivery was mocked.

Project 1's Vercel CLI is a development dependency. The remaining advisories are in its optional fallback dependency tree, which the lockfile restricts to platforms other than macOS and Linux; the native CLI is used on the tested macOS environment. Audits excluding development dependencies or optional dependencies each reported zero; the full lockfile audit still reported 21 high and 16 moderate findings. Its scoped `@vercel/container` tar override selects a patched 7.5.x release outside the package's exact pin; the CLI version command passed, but the fallback container extraction path was not exercised. Reassess the override and remaining CLI advisories on future upgrades. Project 4's EmailJS failures no longer log response details and preserve entered values; tests mocked requests and did not verify live delivery.
