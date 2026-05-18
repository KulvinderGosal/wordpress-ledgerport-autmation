# LedgerPort WordPress Plugin — Playwright Test Suite

End-to-end automated tests for the **LedgerPort** WooCommerce ↔ QuickBooks sync plugin.

## Setup

```bash
cd QA-Automations/WordPress-Ledgerport
npm install
npx playwright install chromium
```

## Running Tests

```bash
# All tests
npm test

# Dashboard only
npm run test:dashboard

# Headed (watch the browser)
npm run test:headed

# With HTML report
npm test && npm run report
```

## Environment

| Key        | Value                                    |
|------------|------------------------------------------|
| Base URL   | `https://qastaging.pushengage.com`       |
| Username   | `kgosal`                                 |
| WP Page    | `/wp-admin/admin.php?page=ledgerport`    |

Credentials live in `tests/helpers/auth.ts`. Move them to a `.env` file before running in CI.

---

## Test Files

| File | Screen | Tests |
|------|--------|-------|
| `tests/dashboard.spec.ts` | Dashboard (Overview) | 114 test cases |
| `tests/connection.spec.ts` | Connection settings | _coming next_ |
| `tests/mappings.spec.ts` | Mappings | _coming next_ |
| `tests/manual-sync.spec.ts` | Manual Sync | _coming next_ |
| `tests/audit-logs.spec.ts` | Audit Logs | _coming next_ |
| `tests/sync-config.spec.ts` | Sync Config | _coming next_ |
| `tests/debug-logs.spec.ts` | Debug Logs | _coming next_ |

---

## Dashboard Test Coverage (`dashboard.spec.ts`)

### Sections Covered

1. **Page Load & Title** — URL resolution, page title, no JS console errors
2. **Header Branding** — Logo, brand name, bell icon, dark/light toggle, help icon
3. **Overview Heading** — H1 text and sub-heading copy
4. **Date Filter Toolbar** — "Syncing your store" label, dropdown (default + open), date range display, calendar icon, last-sync badge + dot, **Sync Now** button (visible, enabled, clickable)
5. **Sync Health Card** — Label, success rate %, total syncs count, **View error log →** CTA
6. **Orders Card** — Label, orders count, success rate, **View report →** CTA
7. **Needs Attention Card** — Label, items count, sub-text, **Review issues →** CTA
8. **Data Health Overview** — Products / Orders / Customers / Inventory counts + status badges (Needs attention, Healthy ×2, Critical) with correct visual styling classes
9. **Recent Activity Feed** — Heading, **View all** CTA, individual entries (text, tags, timestamps), status badges (success, partial_success, failed)
10. **Setup Checklist** — All 4 items visible with completion indicators
11. **Connections Widget** — QuickBooks + WooCommerce listed, Connected status, gear icons, avatars
12. **Configuration Widget** — Method (Sales Receipt), Frequency (Hourly), Auto sync (Automatic), row icons, **Manage settings →** CTA
13. **Sidebar Navigation** — All 7 plugin menu items visible with correct hrefs
14. **Footer** — WordPress credit text, link, version number
15. **Accessibility & Layout** — Links have href, logo has alt, keyboard focus, no duplicate headings

### Test ID Convention

`LP-DASH-NNN` — LedgerPort · Dashboard · Sequential number
