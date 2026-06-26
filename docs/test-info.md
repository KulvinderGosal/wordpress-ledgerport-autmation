# LedgerPort WordPress Plugin — Test Info

**Product:** LedgerPort WooCommerce↔QuickBooks WordPress plugin (distinct from the PushEngage WP plugin and the LedgerPort SaaS dashboard).
**Skill:** `qa-ledgerport-wp-plugin` · **Coverage:** `coverage/component-test-sheet.csv`
**Own git remote:** github.com/KulvinderGosal/wordpress-ledgerport-autmation
**Credentials master (private):** "QA of LedgerPort" Sheet. Local secrets in `.env` (see `.env.example`).

## Targets
- Staging WP: https://qastaging.pushengage.com (same install as PushEngage WP, different `?page=ledgerport`).
- `BASE_URL` overridable; creds via `WP_ADMIN_USER`/`WP_ADMIN_PASS`.

## Suites
- `tests/*.spec.ts` legacy regression: connection, mappings, dashboard, restricted-pages, debug-logs, regression(+fixes), connected-sync-config, connected-regression, e2e order/customer/product sync, disconnected-state. (Pre-auth via `global-setup.ts` → `.auth/admin.json`.)
- `tests/modern/` newer e2e/a11y/smoke (admin-walkthrough, verify-abhishek-fixes, verify-open-issues, focus-visible). (Fixture-managed login → `tests/modern/.auth/wp-admin.json`.)

## Key scenarios
- Connect/disconnect QuickBooks; account mappings.
- Order/customer/product sync WooCommerce → QuickBooks.
- Sync config (frequency, skip types, field sync, triggers); restricted-page access control.

## How to run
`npm test` · `npm run test:modern` · `npm run test:e2e-all`.
