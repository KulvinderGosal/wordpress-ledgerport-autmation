# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sync-config.spec.ts >> LedgerPort — Sync Config >> Sync Config page loads without a PHP fatal error
- Location: tests/sync-config.spec.ts:18:7

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#adminmenu').getByRole('link', { name: 'Sync Config' })

```

# Page snapshot

```yaml
- generic [ref=e2]: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { loginAsAdmin, PLUGIN_PAGES, TEST_CONFIG } from '../auth';
  3  | 
  4  | test.describe('LedgerPort — Sync Config', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await loginAsAdmin(page);
  7  |     // Navigate via sidebar — direct URL returns "not allowed"
  8  |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
  9  |     await page.waitForLoadState('domcontentloaded');
  10 |     await page.waitForTimeout(1500);
> 11 |     await page.locator('#adminmenu').getByRole('link', { name: 'Sync Config' }).click();
     |                                                                                 ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  12 |     await page.waitForLoadState('domcontentloaded');
  13 |     await page.waitForTimeout(3000);
  14 |   });
  15 | 
  16 |   // ── Page load & routing ─────────────────────────────────────────────────────
  17 | 
  18 |   test('Sync Config page loads without a PHP fatal error', async ({ page }) => {
  19 |     await expect(page.locator('body')).not.toContainText(/Fatal error|Parse error/i);
  20 |   });
  21 | 
  22 |   test('page URL is ledgerport-settings', async ({ page }) => {
  23 |     await expect(page).toHaveURL(/ledgerport-settings/);
  24 |   });
  25 | 
  26 |   test('WP admin sidebar is visible', async ({ page }) => {
  27 |     await expect(page.locator('#adminmenu')).toBeVisible();
  28 |   });
  29 | 
  30 |   test('Sync Config menu item is highlighted in sidebar', async ({ page }) => {
  31 |     const link = page.locator('#adminmenu').getByRole('link', { name: /Sync Config/i });
  32 |     const li = link.locator('..');
  33 |     await expect(li).toHaveClass(/current|active/);
  34 |   });
  35 | 
  36 |   test.fixme('LedgerPort logo is visible in header', async ({ page }) => {
  37 |     // React component may not fully render on Sync Config page (tracked issue)
  38 |     await expect(page.locator('svg[aria-label="LedgerPort"]').first()).toBeVisible();
  39 |   });
  40 | 
  41 |   // ── Content rendering ───────────────────────────────────────────────────────
  42 |   // NOTE: At time of writing the React app component on this page renders a
  43 |   // blank content area. These tests document the expected state and will pass
  44 |   // once the component is fixed.
  45 | 
  46 |   test('content area exists in the DOM', async ({ page }) => {
  47 |     // The WP admin page wrapper is always present
  48 |     await expect(page.locator('#wpcontent, #wpbody, .wrap').first()).toBeVisible();
  49 |   });
  50 | 
  51 |   test.fixme('Sync Config heading is visible', async ({ page }) => {
  52 |     // Fails: React component not rendering — tracked issue
  53 |     await expect(page.getByRole('heading', { name: /Sync Config|Settings/i }).first()).toBeVisible();
  54 |   });
  55 | 
  56 |   test.fixme('sync method setting (Sales Receipt) is visible', async ({ page }) => {
  57 |     await expect(page.getByText(/Sales Receipt/i)).toBeVisible();
  58 |   });
  59 | 
  60 |   test.fixme('sync frequency setting is visible', async ({ page }) => {
  61 |     await expect(page.getByText(/Frequency|Hourly|Daily/i)).toBeVisible();
  62 |   });
  63 | 
  64 |   test.fixme('auto-sync toggle is visible', async ({ page }) => {
  65 |     await expect(page.locator('[role="switch"], input[type="checkbox"]').filter({ hasText: /auto.?sync/i }).or(
  66 |       page.getByLabel(/auto.?sync/i)
  67 |     )).toBeVisible();
  68 |   });
  69 | 
  70 |   test.fixme('Save Changes / Save Settings button is visible', async ({ page }) => {
  71 |     await expect(page.getByRole('button', { name: /Save/i })).toBeVisible();
  72 |   });
  73 | 
  74 |   test.fixme('Save Settings button is enabled', async ({ page }) => {
  75 |     await expect(page.getByRole('button', { name: /Save/i })).toBeEnabled();
  76 |   });
  77 | 
  78 |   test.fixme('changing sync frequency shows updated value', async ({ page }) => {
  79 |     const select = page.locator('select[name*="frequency"], [aria-label*="frequency"]').first();
  80 |     await select.selectOption({ label: /Daily/i });
  81 |     await expect(select).toHaveValue(/daily/i);
  82 |   });
  83 | 
  84 |   test.fixme('save shows success confirmation', async ({ page }) => {
  85 |     await page.getByRole('button', { name: /Save/i }).click();
  86 |     await expect(page.getByText(/saved|success|updated/i).first()).toBeVisible({ timeout: 5000 });
  87 |   });
  88 | });
  89 | 
```