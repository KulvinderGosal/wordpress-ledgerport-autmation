# LedgerPort QA Automation — User Guide

This guide walks you through everything you need to set up, run, and extend the LedgerPort WordPress plugin test suite using Playwright.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [First-Time Setup](#2-first-time-setup)
3. [Saving Your Login Session](#3-saving-your-login-session)
4. [Running the Tests](#4-running-the-tests)
5. [Understanding the Test Output](#5-understanding-the-test-output)
6. [Test Structure Explained](#6-test-structure-explained)
7. [The Demo Test (AI Fridays)](#7-the-demo-test-ai-fridays)
8. [Known Gotchas](#8-known-gotchas)
9. [Adding New Tests](#9-adding-new-tests)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

Make sure you have these installed before starting:

| Tool | Version | Check |
|---|---|---|
| Node.js | 18 or higher | `node --version` |
| npm | 9 or higher | `npm --version` |
| Git | any | `git --version` |

---

## 2. First-Time Setup

```bash
# Clone the repo
git clone https://github.com/KulvinderGosal/wordpress-ledgerport-autmation.git
cd wordpress-ledgerport-autmation

# Install dependencies
npm install

# Install Playwright's Chromium browser
npx playwright install chromium

# Copy the environment file
cp .env.example .env
```

Open `.env` and fill in your staging credentials:

```bash
BASE_URL=https://qastaging.pushengage.com
WP_ADMIN_USER=your_username
WP_ADMIN_PASS=your_password
QA_ENV=staging
QA_TESTER=yourname
```

> **Never commit `.env`** — it is gitignored for security.

---

## 3. Saving Your Login Session

The staging site uses **Cloudflare Turnstile CAPTCHA** which blocks automated (headless) logins. You need to log in manually once so the test suite can reuse your authenticated session.

### Step 1 — Save the session

Run the auth helper script. A **visible browser window** will open:

```bash
node scripts/save-auth.js
```

> If `scripts/save-auth.js` doesn't exist yet, run this one-liner instead:
> ```bash
> node -e "
> const {chromium} = require('@playwright/test'), fs = require('fs'), path = require('path');
> (async () => {
>   const b = await chromium.launch({headless: false});
>   const ctx = await b.newContext();
>   const p = await ctx.newPage();
>   await p.goto('https://qastaging.pushengage.com/wp-login.php');
>   console.log('Log in manually, then wait...');
>   await p.waitForURL(/wp-admin/, {timeout: 120000});
>   fs.mkdirSync('.auth', {recursive: true});
>   await ctx.storageState({path: '.auth/admin.json'});
>   console.log('Session saved!');
>   await b.close();
> })();
> "
> ```

### Step 2 — Log in manually

1. The browser window opens to the WP login page
2. Enter your username and password
3. Complete the Turnstile CAPTCHA if it appears
4. Once the WordPress Dashboard loads, the script saves your session automatically

### Step 3 — Verify the session was saved

```bash
ls -la .auth/admin.json
# Should show a file around 2-5 KB
```

> **Your session lasts approximately 2 weeks.** Re-run Step 1 if tests start failing with "not allowed" or login redirect errors.

---

## 4. Running the Tests

### Demo tests (best for presentations — ~3 minutes)

```bash
npm run test:demo            # headless — fastest
npm run test:demo:headed     # browser visible — great for live demos
```

### Per-section tests

Run only the section you care about:

```bash
npm run test:dashboard       # Dashboard page (6 tests)
npm run test:connection      # Connection page (2 tests)
npm run test:mappings        # Mappings — all 4 tabs (6 tests)
npm run test:manual-sync     # Manual Sync / Send to QuickBooks (2 tests)
npm run test:audit-logs      # Audit Logs + URL slug regression (3 tests)
npm run test:sync-config     # Sync Config / Settings tabs (4 tests)
npm run test:debug-logs      # Debug Logs (2 tests)
```

### Full regression suite (~156 tests)

```bash
npm run test:regression      # All 7 section folders
npm run test:smoke           # 9 quick smoke tests only
```

### View the HTML report

After any test run:

```bash
npx playwright show-report
```

This opens an interactive browser report at `http://localhost:9323` with pass/fail status, screenshots of failures, and video recordings.

---

## 5. Understanding the Test Output

When you run `npm run test:demo`, you'll see output like:

```
✓   1 📊 Dashboard › loads with Overview heading and LedgerPort branding (7.2s)
✓   2 📊 Dashboard › shows Sync Health, Orders, and Needs Attention cards (5.7s)
✓   3 📊 Dashboard › date filter switches to Yesterday (5.5s)
...
✓  27 🧭 Sidebar Navigation › dark mode toggle is present (6.8s)

  27 passed (2.8m)
```

Each line shows:
- **Test number** — order it ran
- **Emoji section** — which plugin page was tested
- **Test name** — what was verified
- **Time** — how long that test took

If a test fails, Playwright saves:
- A **screenshot** of what the page looked like
- A **video** recording of the test run
- An **error-context.md** file with the exact failure and page structure

All failure artifacts are in `test-results/`.

---

## 6. Test Structure Explained

```
tests/
├── demo/
│   └── ai-fridays-demo.spec.ts    ← 27 lightweight tests, all 7 pages
├── smoke/
│   └── plugin-smoke.spec.ts       ← 9 quick sanity checks
├── 01-dashboard/                  ← 5 detailed dashboard test files
├── 02-connection/                 ← 3 connection state test files
├── 03-mappings/                   ← 4 tab-specific test files
├── 04-manual-sync/                ← 2 files (load + sync trigger)
├── 05-audit-logs/                 ← 2 files (load + log table)
├── 06-sync-config/                ← 4 tab-specific test files
├── 07-debug-logs/                 ← 1 file
└── helpers/
    └── auth.ts                    ← shared login + page URL helpers
```

### The auth helper (`tests/helpers/auth.ts`)

Every test file imports from here:

```typescript
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';
```

- **`loginAsAdmin(page)`** — navigates to `/wp-admin/`, confirms you're logged in (falls back to credential login if session expired)
- **`goToPluginPage(page, url)`** — navigates to any plugin URL and waits for the page to fully load
- **`CORRECT_PAGES`** — typed map of all 7 plugin page URLs (prevents typos in slugs)

### Important URL slugs

| Page | Correct slug | Wrong slug (causes "not allowed") |
|---|---|---|
| Audit Logs | `page=ledgerport-logs` | ~~`page=ledgerport-audit-logs`~~ |
| Dashboard | `page=ledgerport` | — |
| Connection | `page=ledgerport-connection` | — |
| Mappings | `page=ledgerport-mappings` | — |
| Manual Sync | `page=ledgerport-manual-sync` | — |
| Sync Config | `page=ledgerport-sync-config` | — |
| Debug Logs | `page=ledgerport-debug-logs` | — |

> The Audit Logs URL is a known regression trap — the test suite explicitly asserts the correct slug on every run.

---

## 7. The Demo Test (AI Fridays)

`tests/demo/ai-fridays-demo.spec.ts` is designed for live presentations. It covers all 7 plugin pages in 27 fast, readable tests that complete in under 3 minutes.

### What each section verifies

| Section | Tests | Key Assertions |
|---|---|---|
| 📊 Dashboard | 6 | Overview heading, 3 stat cards, date filter, Sync Now button, navigation links |
| 🔗 Connection | 2 | Page loads, QuickBooks + WooCommerce cards visible |
| 🗺️ Mappings | 6 | All 4 tabs open, filter input works, action buttons present |
| ⚡ Manual Sync | 2 | "Send to QuickBooks" heading, all 5 entity tabs visible |
| 📋 Audit Logs | 3 | URL slug regression, no WP error, log entries with badges |
| ⚙️ Sync Config | 4 | "Settings" heading, all tabs open correctly |
| 🪲 Debug Logs | 2 | Heading + Refresh button, table or empty state |
| 🧭 Navigation | 2 | All 7 sidebar links, dark mode toggle |

### Running for a live demo

```bash
# Start the run 3 minutes before you want to show it
npm run test:demo:headed
```

The browser will open and you can screen-share it while Playwright navigates through all 7 pages automatically.

---

## 8. Known Gotchas

### Turnstile CAPTCHA blocks headless login

The site uses Cloudflare Turnstile which headless browsers cannot solve. **Always use the manual headed login** to save your session (see Section 3). Do not try to run login scripts headlessly.

### Session expires after ~2 weeks

If you see `Sorry, you are not allowed to access this page` or tests redirecting to `/wp-login.php`, your session has expired. Re-save it by running the save-auth script again.

### "Data Health Overview" strict mode error

The Dashboard page has both an `h1 "Overview"` and an `h3 "Data Health Overview"`. Always use `{ exact: true }` when selecting the main heading:

```typescript
// ✓ Correct
page.getByRole('heading', { name: 'Overview', exact: true })

// ✗ Wrong — matches both headings
page.getByRole('heading', { name: 'Overview' })
```

### "Dashboard" link appears 3 times

WordPress, LedgerPort, and PushEngage all have a "Dashboard" link in the admin sidebar. Scope to the LedgerPort submenu:

```typescript
// ✓ Correct
page.locator('#toplevel_page_ledgerport').getByRole('link', { name: 'Dashboard' })

// ✗ Wrong — strict mode violation
page.getByRole('link', { name: 'Dashboard' })
```

### Plugin UI headings differ from sidebar labels

| Sidebar label | Actual page h1 |
|---|---|
| Manual Sync | Send to QuickBooks |
| Sync Config | Settings |

Always test for the actual rendered heading, not the sidebar label.

---

## 9. Adding New Tests

### Quick template

Create a new file following the naming convention, e.g. `tests/03-mappings/05-automap.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test.describe('Mappings — Automap', () => {
  test('Automap Products button triggers confirmation', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('heading', { name: 'Mappings' })).toBeVisible();

    await page.getByRole('button', { name: /automap products/i }).click();
    // assert what happens next...
  });
});
```

### Run just your new file

```bash
npx playwright test tests/03-mappings/05-automap.spec.ts --reporter=list
```

### Adding a new plugin page

If the plugin adds a new page:
1. Add its URL to `CORRECT_PAGES` in `tests/helpers/auth.ts`
2. Create a new folder `tests/08-new-page/`
3. Add tests following the pattern above
4. Add a run script in `package.json`:
   ```json
   "test:new-page": "playwright test tests/08-new-page/"
   ```
5. Add it to `test:regression` in `package.json`

---

## 10. Troubleshooting

### "not allowed to access this page"

Your session has expired or was saved before accessing this page. Re-save the session:
```bash
rm .auth/admin.json
node scripts/save-auth.js
```

### "strict mode violation: resolved to N elements"

Your locator matches multiple elements. Use:
- `{ exact: true }` for text matching
- `.first()` to target the first match
- A more specific parent scope (e.g. `page.locator('#toplevel_page_ledgerport')`)

### Tests time out on login

The `.auth/admin.json` file is missing. Run the save-auth script (Section 3).

### "Cannot find module '@playwright/test'"

```bash
npm install
```

### Tests pass locally but fail in CI

1. Make sure `.auth/admin.json` is available in CI (as a secret/artifact)
2. Or configure a headless login for CI with a user account that doesn't have Turnstile

### View failure screenshots and videos

```bash
npx playwright show-report
# Opens the HTML report with all failure artifacts
```

Or find them directly in `test-results/`.

---

## Quick Reference Card

```bash
# Setup (once)
npm install && npx playwright install chromium
cp .env.example .env     # fill in credentials
node scripts/save-auth.js  # log in manually once

# Daily use
npm run test:demo          # all 7 pages, ~3 min
npm run test:demo:headed   # visible browser for demos

# Per section
npm run test:dashboard
npm run test:connection
npm run test:mappings
npm run test:manual-sync
npm run test:audit-logs
npm run test:sync-config
npm run test:debug-logs

# Full regression
npm run test:regression    # all ~156 tests

# After a run
npx playwright show-report  # open HTML report
```

---

*Last updated: 2026-06-26 | Staging: qastaging.pushengage.com | Plugin: LedgerPort WooCommerce ↔ QuickBooks*
