# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: manual-sync.spec.ts >> LedgerPort — Manual Sync (Send to QuickBooks) >> Products section description is visible
- Location: tests/manual-sync.spec.ts:72:7

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#adminmenu').getByRole('link', { name: 'Manual Sync' })

```

# Page snapshot

```yaml
- generic [ref=e2]: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { loginAsAdmin, PLUGIN_PAGES, TEST_CONFIG } from '../auth';
  3   | 
  4   | test.describe('LedgerPort — Manual Sync (Send to QuickBooks)', () => {
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await loginAsAdmin(page);
  7   |     // Must navigate via sidebar — direct URL with wrong slug shows "not allowed"
  8   |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
  9   |     await page.waitForLoadState('domcontentloaded');
  10  |     await page.waitForTimeout(1500);
> 11  |     await page.locator('#adminmenu').getByRole('link', { name: 'Manual Sync' }).click();
      |                                                                                 ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  12  |     await page.waitForLoadState('domcontentloaded');
  13  |     await page.waitForTimeout(2000);
  14  |   });
  15  | 
  16  |   // ── Page load ───────────────────────────────────────────────────────────────
  17  | 
  18  |   test('Manual Sync page loads without errors', async ({ page }) => {
  19  |     await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  20  |   });
  21  | 
  22  |   test('page URL is ledgerport-push', async ({ page }) => {
  23  |     await expect(page).toHaveURL(/ledgerport-push/);
  24  |   });
  25  | 
  26  |   test('page heading is "Send to QuickBooks"', async ({ page }) => {
  27  |     await expect(page.getByRole('heading', { name: /Send to QuickBooks/i }).first()).toBeVisible();
  28  |   });
  29  | 
  30  |   test('page subtitle describes background processing', async ({ page }) => {
  31  |     await expect(page.getByText(/process the work in the background/i)).toBeVisible();
  32  |   });
  33  | 
  34  |   // ── Tabs ────────────────────────────────────────────────────────────────────
  35  | 
  36  |   test('Products tab is visible', async ({ page }) => {
  37  |     await expect(page.getByRole('tab', { name: /^Products$/i }).or(page.getByRole('button', { name: /^Products$/i }))).toBeVisible();
  38  |   });
  39  | 
  40  |   test('Variations tab is visible', async ({ page }) => {
  41  |     await expect(page.getByRole('tab', { name: /^Variations$/i }).or(page.getByRole('button', { name: /^Variations$/i }))).toBeVisible();
  42  |   });
  43  | 
  44  |   test('Customers tab is visible', async ({ page }) => {
  45  |     await expect(page.getByRole('tab', { name: /^Customers$/i }).or(page.getByRole('button', { name: /^Customers$/i }))).toBeVisible();
  46  |   });
  47  | 
  48  |   test('Payments tab is visible', async ({ page }) => {
  49  |     await expect(page.getByRole('tab', { name: /^Payments$/i }).or(page.getByRole('button', { name: /^Payments$/i }))).toBeVisible();
  50  |   });
  51  | 
  52  |   test('Products tab is active by default', async ({ page }) => {
  53  |     await expect(page.getByText(/Push Products to QuickBooks/i)).toBeVisible();
  54  |   });
  55  | 
  56  |   // ── Push All button ─────────────────────────────────────────────────────────
  57  | 
  58  |   test('"Push All" button is visible', async ({ page }) => {
  59  |     await expect(page.getByRole('button', { name: /Push All/i })).toBeVisible();
  60  |   });
  61  | 
  62  |   test('"Push All" button is enabled', async ({ page }) => {
  63  |     await expect(page.getByRole('button', { name: /Push All/i })).toBeEnabled();
  64  |   });
  65  | 
  66  |   // ── Products sub-section ────────────────────────────────────────────────────
  67  | 
  68  |   test('"Push Products to QuickBooks" section heading is visible', async ({ page }) => {
  69  |     await expect(page.getByText(/Push Products to QuickBooks/i)).toBeVisible();
  70  |   });
  71  | 
  72  |   test('Products section description is visible', async ({ page }) => {
  73  |     await expect(page.getByText(/Select WooCommerce products to push/i)).toBeVisible();
  74  |   });
  75  | 
  76  |   test('"Products already synced will be skipped" text is shown', async ({ page }) => {
  77  |     await expect(page.getByText(/already synced will be skipped/i)).toBeVisible();
  78  |   });
  79  | 
  80  |   test('Products table has Source ID column', async ({ page }) => {
  81  |     await expect(page.locator('th').filter({ hasText: /Source ID/i }).first()).toBeVisible();
  82  |   });
  83  | 
  84  |   test('Products table has Product Name column', async ({ page }) => {
  85  |     await expect(page.locator('th').filter({ hasText: /Product Name/i }).first()).toBeVisible();
  86  |   });
  87  | 
  88  |   test('Products table has SKU column', async ({ page }) => {
  89  |     await expect(page.locator('th').filter({ hasText: /^SKU$/i }).first()).toBeVisible();
  90  |   });
  91  | 
  92  |   test('Products table has Sync column', async ({ page }) => {
  93  |     await expect(page.locator('th').filter({ hasText: /^Sync$/i }).first()).toBeVisible();
  94  |   });
  95  | 
  96  |   test('Products table contains at least one row', async ({ page }) => {
  97  |     await expect(page.locator('tbody tr').first()).toBeVisible();
  98  |   });
  99  | 
  100 |   test('Filter button is visible', async ({ page }) => {
  101 |     await expect(page.getByRole('button', { name: /Filter/i }).first()).toBeVisible();
  102 |   });
  103 | 
  104 |   test('pagination shows product count', async ({ page }) => {
  105 |     await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  106 |   });
  107 | 
  108 |   test('pagination shows page number', async ({ page }) => {
  109 |     await expect(page.locator('text=/Page \\d+ of \\d+/i').first()).toBeVisible();
  110 |   });
  111 | 
```