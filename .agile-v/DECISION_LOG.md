# Decision log

| Date | Decision | Rationale | Requirements |
| --- | --- | --- | --- |
| 2026-11-20 | Treat the user's report of deleted GitHub and Vercel projects as superseding the attached scenario's live-deployment assumption. | Avoid asserting active deployments or recoverable remotes without evidence. | REQ-0001, REQ-0003 |
| 2026-11-20 | Preserve complete nested Git directories outside the collection before requesting cleanup approval. | Remote deletion makes local history particularly valuable; backups retain refs, reflogs, dangling objects, and the pre-existing invalid ref. | REQ-0001, REQ-0002 |
| 2026-11-20 | Stop before cleanup and record the missing LFS model and project 11 Git error. | Exact cleanup approval and preservation review are required by the agreed plan. | REQ-0001, REQ-0002, REQ-0006 |
| 2026-11-20 | User approved the exact cleanup targets and complete plan; restore the original GLB from the project's encrypted copy. | Its decrypted size and SHA-256 exactly match the LFS pointer. | REQ-0001, REQ-0002, REQ-0006 |
| 2026-11-20 | User approved sequential dependency, runtime and guardrail assessment across all 21 projects. | Extend C1 with REQ-0007–0009; validate upgrades and preserve application behavior. | REQ-0007, REQ-0008, REQ-0009 |
| 2026-11-21 | Rename project folders 1–9 with leading zeroes and update their documentation and CI paths. | GitHub sorts folder names as text; padding produces the expected numeric order. | REQ-0001, REQ-0003, REQ-0005, REQ-0006 |
| 2026-11-24 | Upgrade project 12 to compatible React 19, Vite 8 and Three.js stack; retain visible 3D fallback and configure EmailJS through public build variables. | Remove dependency advisories and preserve usable content when visuals or contact configuration are unavailable. | REQ-0005, REQ-0007, REQ-0008, REQ-0009 |
| 2026-11-24 | Preserve navigation and other sections during delayed or failed chunks, guard pending form submissions, and use local Stage lighting for project 12. | Independent review reproduced navigation, mobile overlay, input race and external HDR failures. | REQ-0005, REQ-0007, REQ-0009 |
| 2026-11-25 | Modernize project 13 on Node 26 and Vite 8 while retaining its current animation and media design; fix contact, navigation and player defects. | Reduce dependency findings and preserve accessible, usable interactions without unnecessary deployment changes. | REQ-0005, REQ-0007, REQ-0008, REQ-0009 |
| 2026-11-25 | Correct project 13 external audio pause state, contact error associations and hidden budget, reduced-motion carousel, and keyboard navbar visibility. | Independent verification reproduced functional and accessibility defects. | REQ-0005, REQ-0007, REQ-0009 |
| 2026-11-25 | Recover project 13 audio after media errors and show all skills when reduced motion is enabled. | PR review and independent browser testing exposed retry and accessibility failures. | REQ-0005, REQ-0007, REQ-0009 |
