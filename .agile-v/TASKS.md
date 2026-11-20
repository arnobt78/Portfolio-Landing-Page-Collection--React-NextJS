# Prioritized tasks

1. REQ-0001, REQ-0002: Completed model restoration, verified metadata backups, approved nested Git cleanup, and root Git initialization. Retain the private backup.
2. REQ-0003, REQ-0004: Root documentation and ignore/configuration are in place. Before publication, review whether project 17's pre-existing ignored `.claude` and `.vscode` files should be included and choose an LFS policy for project 14.
3. REQ-0005: Retry dependency installs and checks for projects 1, 2, 8, 10, 12–18, 20, and 21 when registry access is stable. Run the new workflow in GitHub after a repository exists; it has not been exercised remotely.
4. REQ-0005: Review the existing dependency advisories recorded in SECURITY_REVIEW.md in a separate remediation scope; retry the seven timed-out audits.
5. REQ-0006: Complete independent verification and the eval gate once missing checks are available. No commit, push, or deployment without explicit approval.
