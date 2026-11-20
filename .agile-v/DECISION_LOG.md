# Decision log

| Date | Decision | Rationale | Requirements |
| --- | --- | --- | --- |
| 2026-11-20 | Treat the user's report of deleted GitHub and Vercel projects as superseding the attached scenario's live-deployment assumption. | Avoid asserting active deployments or recoverable remotes without evidence. | REQ-0001, REQ-0003 |
| 2026-11-20 | Preserve complete nested Git directories outside the collection before requesting cleanup approval. | Remote deletion makes local history particularly valuable; backups retain refs, reflogs, dangling objects, and the pre-existing invalid ref. | REQ-0001, REQ-0002 |
| 2026-11-20 | Stop before cleanup and record the missing LFS model and project 11 Git error. | Exact cleanup approval and preservation review are required by the agreed plan. | REQ-0001, REQ-0002, REQ-0006 |
| 2026-11-20 | User approved the exact cleanup targets and complete plan; restore the original GLB from the project's encrypted copy. | Its decrypted size and SHA-256 exactly match the LFS pointer. | REQ-0001, REQ-0002, REQ-0006 |
| 2026-11-20 | User approved sequential dependency, runtime and guardrail assessment across all 21 projects. | Extend C1 with REQ-0007–0009; validate upgrades and preserve application behavior. | REQ-0007, REQ-0008, REQ-0009 |
