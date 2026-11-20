# C1 build manifest

- REQ-0001: restored project 14's original GLB using the existing encrypted asset, verified against its LFS pointer. Preserved the existing encrypted copy, application source, project documentation, manifests, locks, and project configurations.
- REQ-0002: backed up and verified all 21 nested Git directories, removed the approved originals, and initialized a single root Git repository and task branch.
- REQ-0003 and REQ-0004: added root README, MIT license, contribution and security guidance, deployment guide, `.gitignore`, `.editorconfig`, and `.gitattributes`.
- REQ-0005: added a read-only-permissions, non-deploying per-project GitHub Actions workflow. The baseline push and PR runs completed successfully on GitHub.
- REQ-0006: initialized and updated the C1 state, requirements, risks, approvals, checkpoint, decisions, inventory, security review, and validation evidence.
