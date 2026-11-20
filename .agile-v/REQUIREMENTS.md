# C1 requirements

| ID | Requirement | Evidence / acceptance |
| --- | --- | --- |
| REQ-0001 | Preserve the 21 independent applications and their existing working files, including uncommitted changes. | Compare the saved working-tree inventory before and after cleanup; investigate missing LFS content. |
| REQ-0002 | Preserve local Git history and remove only approved nested metadata after verified backup and explicit approval. | Verify backups and approved targets; confirm no nested repositories remain and one root repository exists. |
| REQ-0003 | Initialize a simple root collection and accurately document projects, licensing, setup, security, and contribution practices. | Review root files against actual projects and license texts; no shared application tooling by default. |
| REQ-0004 | Exclude secrets and generated files from the root repository without excluding legitimate source or lockfiles. | Test ignore rules and inspect prospective staged contents without revealing secrets. |
| REQ-0005 | Validate available project scripts and use minimal non-deploying CI only when safe. | Record commands, outcomes, and skipped checks; separately approve dependency installation. |
| REQ-0006 | Record Agile V state, risks, decisions, traceability, and durable human gates. | Maintain state and checkpoint records; gate implementation and Git cleanup as required. |
| REQ-0007 | Assess and upgrade each project's dependencies to secure, compatible stable versions without intentional behavior loss. | Per-project before/after dependency, advisory, install and regression evidence; record unresolved incompatibilities. |
| REQ-0008 | Validate each project on Node 26 and select Node 24 only where Node 26 is incompatible. | Node version, install, available lint, tests, type checks, build and applicable runtime evidence for each project; align CI with validated versions. |
| REQ-0009 | Assess applicable Vercel production guardrails and security risks without imposing speculative restrictions or degrading normal behavior. | Per-project route, image, integration and security review; preserve external settings and document unverified platform behavior. |
