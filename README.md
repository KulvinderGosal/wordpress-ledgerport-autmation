# LedgerPort — WordPress Plugin QA Automation

Playwright test automation suite for the **LedgerPort** WordPress plugin, which syncs WooCommerce store data with QuickBooks Online.

> **Staging site:** `https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport`

---

## What This Covers

| Plugin Page | Tests | What's Verified |
|---|---|---|
| **Dashboard** | 6 | Overview heading, Sync Health/Orders/Needs Attention cards, date filter, Sync Now button, View All → Audit Logs nav, Manage Settings → Sync Config nav |
| **Connection** | 2 | Page load, QuickBooks + WooCommerce cards |
| **Mappings** | 6 | Products/Variations/Customers/Payment Methods tabs, filter input, Automap + Refresh buttons |
| **Manual Sync** | 2 | "Send to QuickBooks" heading, all 5 entity tabs |
| **Audit Logs** | 3 | URL slug regression guard (`ledgerport-logs` not `ledgerport-audit-logs`), no WP error, status badges |
| **Sync Config** | 4 | "Settings" heading, General/Orders/Products/Customers tabs, tab switching |
| **Debug Logs** | 2 | Heading + Refresh button, table or empty state |
| **Sidebar Nav** | 2 | All 7 LedgerPort nav links, dark mode toggle |

---

## Documentation

- **[User Guide](docs/USER_GUIDE.md)** — full setup walkthrough, session auth, all commands, gotchas, troubleshooting, and how to add new tests

---

## Quick Start

```bash
# 1. Install dependencies
npm install
npx playwright install chromium

# 2. Copy env file and fill in credentials
cp .env.example .env

# 3. Save an authenticated session (opens a browser — log in past Turnstile)
node scripts/save-auth.js

# 4. Run the AI Fridays demo (28 tests, ~60 seconds)
npm run test:demo

# 5. Run with a visible browser (great for presentations)
npm run test:demo:headed
```

---

## Run Commands

### Demo & Smoke
```bash
npm run test:demo          # 28 lightweight demo tests — all 7 pages
npm run test:demo:headed   # Same, with browser visible (for live demos)
npm run test:smoke         # 9 quick smoke tests
```

### Per Section
```bash
npm run test:dashboard     # Dashboard page tests
npm run test:connection    # Connection page tests
npm run test:mappings      # Mappings (all 4 tabs)
npm run test:manual-sync   # Manual Sync / Send to QuickBooks
npm run test:audit-logs    # Audit Logs (includes URL slug regression)
npm run test:sync-config   # Sync Config / Settings (all tabs)
npm run test:debug-logs    # Debug Logs page
```

### Full Regression
```bash
npm run test:regression    # All 7 section folders (~156 tests)
npm run test:legacy        # Legacy spec files (regression, connected, disconnected)
```

### View Results
```bash
npx playwright show-report  # Open the HTML test report in your browser
```

---

## Authentication

The staging site uses **Cloudflare Turnstile CAPTCHA** on the login page, which blocks headless browsers. Authentication is handled via a saved session:

1. Run `node scripts/save-auth.js` — opens a visible Chromium window
2. Log in manually past the CAPTCHA
3. Session is saved to `.auth/admin.json`
4. All subsequent test runs reuse the saved session automatically

> `.auth/` and `.env` are gitignored — never committed.

---

## Project Structure

```
ledgerport-wp-plugin/
├── tests/
│   ├── demo/                    # AI Fridays demo (28 tests)
│   ├── smoke/                   # Quick smoke tests
│   ├── 01-dashboard/            # Dashboard section tests
│   ├── 02-connection/           # Connection section tests
│   ├── 03-mappings/             # Mappings (4 tabs)
│   ├── 04-manual-sync/          # Manual Sync section
│   ├── 05-audit-logs/           # Audit Logs + URL slug regression
│   ├── 06-sync-config/          # Sync Config / Settings tabs
│   ├── 07-debug-logs/           # Debug Logs section
│   └── helpers/
│       └── auth.ts              # loginAsAdmin(), goToPluginPage(), CORRECT_PAGES
├── reporters/                   # SQLite + coverage reporters
├── global-setup.ts              # Session reuse (skips Turnstile on re-runs)
├── playwright.config.ts
├── .env.example
└── .gitignore
```

---

## Environment Variables

```bash
# .env  (copy from .env.example — never commit)
BASE_URL=https://qastaging.pushengage.com
WP_ADMIN_USER=your_username
WP_ADMIN_PASS=your_password
```

---

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- TypeScript
- `@axe-core/playwright` — WCAG 2.1 AA accessibility checks
- `better-sqlite3` — SQLite test result persistence
- `dotenv` — credential management via `.env`
