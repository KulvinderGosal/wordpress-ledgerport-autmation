# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mappings.spec.ts >> LedgerPort — Mappings >> Customers tab is visible
- Location: tests/mappings.spec.ts:34:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('tab', { name: /Customers/i }).or(getByRole('button', { name: /Customers/i }))
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('tab', { name: /Customers/i }).or(getByRole('button', { name: /Customers/i }))

```

```yaml
- text: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';
  3   | 
  4   | test.describe('LedgerPort — Mappings', () => {
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await loginAsAdmin(page);
  7   |     await goToPluginPage(page, PLUGIN_PAGES.mappings);
  8   |   });
  9   | 
  10  |   // ── Page load ───────────────────────────────────────────────────────────────
  11  | 
  12  |   test('Mappings page loads without errors', async ({ page }) => {
  13  |     await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  14  |   });
  15  | 
  16  |   test('page heading is "Mappings"', async ({ page }) => {
  17  |     await expect(page.getByRole('heading', { name: /^Mappings$/i }).first()).toBeVisible();
  18  |   });
  19  | 
  20  |   test('page subtitle describes the mapping purpose', async ({ page }) => {
  21  |     await expect(page.getByText(/Map WooCommerce products, variations, customers, and payment methods/i)).toBeVisible();
  22  |   });
  23  | 
  24  |   // ── Tabs ────────────────────────────────────────────────────────────────────
  25  | 
  26  |   test('Products tab is visible', async ({ page }) => {
  27  |     await expect(page.getByRole('tab', { name: /Products/i }).or(page.getByRole('button', { name: /^Products$/i }))).toBeVisible();
  28  |   });
  29  | 
  30  |   test('Variations tab is visible', async ({ page }) => {
  31  |     await expect(page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i }))).toBeVisible();
  32  |   });
  33  | 
  34  |   test('Customers tab is visible', async ({ page }) => {
> 35  |     await expect(page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i }))).toBeVisible();
      |                                                                                                                      ^ Error: expect(locator).toBeVisible() failed
  36  |   });
  37  | 
  38  |   test('Payment Methods tab is visible', async ({ page }) => {
  39  |     await expect(page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i }))).toBeVisible();
  40  |   });
  41  | 
  42  |   test('Products tab is active by default', async ({ page }) => {
  43  |     await expect(page.getByText(/Map WooCommerce Products to QuickBooks/i)).toBeVisible();
  44  |   });
  45  | 
  46  |   // ── Products tab ────────────────────────────────────────────────────────────
  47  | 
  48  |   test('Products tab heading is correct', async ({ page }) => {
  49  |     await expect(page.getByText(/Map WooCommerce Products to QuickBooks/i)).toBeVisible();
  50  |   });
  51  | 
  52  |   test('Products tab shows descriptive subtitle', async ({ page }) => {
  53  |     await expect(page.getByText(/Unmapped products use the default fallback/i)).toBeVisible();
  54  |   });
  55  | 
  56  |   test('Products table has ID column', async ({ page }) => {
  57  |     await expect(page.locator('th, td').filter({ hasText: /^ID$/ }).first()).toBeVisible();
  58  |   });
  59  | 
  60  |   test('Products table has Name column', async ({ page }) => {
  61  |     await expect(page.locator('th, td').filter({ hasText: /^Name$/ }).first()).toBeVisible();
  62  |   });
  63  | 
  64  |   test('Products table has SKU column', async ({ page }) => {
  65  |     await expect(page.locator('th, td').filter({ hasText: /^SKU$/ }).first()).toBeVisible();
  66  |   });
  67  | 
  68  |   test('Products section references WooCommerce', async ({ page }) => {
  69  |     await expect(page.locator('#wpcontent').getByText(/WooCommerce/i).first()).toBeVisible();
  70  |   });
  71  | 
  72  |   test('Products table has QuickBooks Product column', async ({ page }) => {
  73  |     await expect(page.locator('th').filter({ hasText: /QuickBooks Product/i }).first()).toBeVisible();
  74  |   });
  75  | 
  76  |   test('Products table has Status column', async ({ page }) => {
  77  |     await expect(page.locator('th').filter({ hasText: /^Status$/i }).first()).toBeVisible();
  78  |   });
  79  | 
  80  |   test('Products table contains at least one row', async ({ page }) => {
  81  |     const rows = page.locator('tbody tr');
  82  |     await expect(rows.first()).toBeVisible();
  83  |   });
  84  | 
  85  |   test('Products table shows Mapped status', async ({ page }) => {
  86  |     await expect(page.getByText(/Mapped/i).first()).toBeVisible();
  87  |   });
  88  | 
  89  |   test('Filter button is visible on Products tab', async ({ page }) => {
  90  |     await expect(page.getByRole('button', { name: /Filter/i }).first()).toBeVisible();
  91  |   });
  92  | 
  93  |   test('Refresh WooCommerce button is visible', async ({ page }) => {
  94  |     await expect(page.getByRole('button', { name: /Refresh WooCommerce/i }).or(page.getByText(/refresh WooCommerce/i))).toBeVisible();
  95  |   });
  96  | 
  97  |   test('Automap Products button is visible', async ({ page }) => {
  98  |     await expect(page.getByRole('button', { name: /Automap Products/i }).or(page.getByText(/Automap Products/i))).toBeVisible();
  99  |   });
  100 | 
  101 |   test('pagination shows total product count', async ({ page }) => {
  102 |     await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  103 |   });
  104 | 
  105 |   test('pagination shows page number', async ({ page }) => {
  106 |     await expect(page.locator('text=/Page \\d+ of \\d+/i').first()).toBeVisible();
  107 |   });
  108 | 
  109 |   // ── Variations tab ──────────────────────────────────────────────────────────
  110 | 
  111 |   test('clicking Variations tab shows variation mapping content', async ({ page }) => {
  112 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  113 |     await page.waitForTimeout(1000);
  114 |     await expect(page.getByText(/Map WooCommerce Variations to QuickBooks/i)).toBeVisible();
  115 |   });
  116 | 
  117 |   test('Variations tab subtitle is correct', async ({ page }) => {
  118 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  119 |     await page.waitForTimeout(1000);
  120 |     await expect(
  121 |       page.getByText(/Search product variations/i)
  122 |         .or(page.locator('input[placeholder*="variation" i]'))
  123 |         .or(page.getByText(/Unmapped variations|variation.*fallback|Map WooCommerce Variations/i))
  124 |         .first()
  125 |     ).toBeVisible();
  126 |   });
  127 | 
  128 |   test('Variations table shows ID, Name, SKU columns', async ({ page }) => {
  129 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  130 |     await page.waitForTimeout(1000);
  131 |     for (const col of ['ID', 'Name', 'SKU']) {
  132 |       await expect(page.locator('th, td').filter({ hasText: new RegExp(`^${col}$`) }).first()).toBeVisible();
  133 |     }
  134 |   });
  135 | 
```