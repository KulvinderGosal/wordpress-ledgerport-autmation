# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: install-activate.spec.ts >> LedgerPort Plugin — Install / Activate / Deactivate >> reactivating plugin restores sidebar menu
- Location: tests/install-activate.spec.ts:121:7

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('tr[data-slug*="ledgerport"]')
Expected pattern: /active/
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toHaveClass" with timeout 30000ms
  - waiting for locator('tr[data-slug*="ledgerport"]')

```

# Test source

```ts
  33  |     await expect(row.locator('.plugin-version-author-uri')).toContainText(/Version/i);
  34  |   });
  35  | 
  36  |   // ── Active state ────────────────────────────────────────────────────────────
  37  | 
  38  |   test('LedgerPort plugin is active', async ({ page }) => {
  39  |     await page.goto('/wp-admin/plugins.php');
  40  |     const row = page.locator('tr[data-slug*="ledgerport"]');
  41  |     await expect(row).toHaveClass(/active/);
  42  |   });
  43  | 
  44  |   test('active plugin row shows Deactivate action link', async ({ page }) => {
  45  |     await page.goto('/wp-admin/plugins.php');
  46  |     const row = page.locator('tr[data-slug*="ledgerport"]');
  47  |     await expect(row.locator('.deactivate a')).toBeVisible();
  48  |     await expect(row.locator('.deactivate a')).toHaveText(/Deactivate/i);
  49  |   });
  50  | 
  51  |   test('active plugin row does not show Activate action link', async ({ page }) => {
  52  |     await page.goto('/wp-admin/plugins.php');
  53  |     const row = page.locator('tr[data-slug*="ledgerport"]');
  54  |     await expect(row.locator('.activate a')).toHaveCount(0);
  55  |   });
  56  | 
  57  |   // ── Sidebar menu presence ───────────────────────────────────────────────────
  58  | 
  59  |   test('LedgerPort menu group appears in WP admin sidebar', async ({ page }) => {
  60  |     await page.goto('/wp-admin/');
  61  |     const menu = page.locator('#adminmenu');
  62  |     await expect(menu.locator('a', { hasText: /LedgerPort/i }).first()).toBeVisible();
  63  |   });
  64  | 
  65  |   test('sidebar shows WooCommerce Sync sub-label', async ({ page }) => {
  66  |     await page.goto('/wp-admin/');
  67  |     await expect(page.locator('#adminmenu').getByText(/WooCommerce Sync/i).first()).toBeVisible();
  68  |   });
  69  | 
  70  |   test('all 7 sidebar menu items are present when plugin is active', async ({ page }) => {
  71  |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
  72  |     // Scope to LedgerPort menu group to avoid "Dashboard" matching WP/PushEngage menus
  73  |     const menu = page.locator('#toplevel_page_ledgerport');
  74  |     for (const label of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
  75  |       await expect(menu.getByRole('link', { name: label })).toBeVisible();
  76  |     }
  77  |   });
  78  | 
  79  |   // ── Deactivate flow ─────────────────────────────────────────────────────────
  80  | 
  81  |   test('deactivating plugin removes LedgerPort from sidebar', async ({ page }) => {
  82  |     await page.goto('/wp-admin/plugins.php');
  83  |     const row = page.locator('tr[data-slug*="ledgerport"]');
  84  |     await row.locator('.deactivate a').click();
  85  |     await page.waitForLoadState('domcontentloaded');
  86  | 
  87  |     // Plugin row becomes inactive
  88  |     await expect(row).toHaveClass(/inactive/);
  89  |     // LedgerPort menu item gone from sidebar
  90  |     await expect(page.locator('#adminmenu').getByText(/LedgerPort/i).first()).toHaveCount(0);
  91  |   });
  92  | 
  93  |   test('deactivated plugin row shows Activate action link', async ({ page }) => {
  94  |     // Ensure plugin is deactivated first
  95  |     await page.goto('/wp-admin/plugins.php');
  96  |     const row = page.locator('tr[data-slug*="ledgerport"]');
  97  |     const isActive = await row.evaluate((el) => el.classList.contains('active'));
  98  |     if (isActive) {
  99  |       await row.locator('.deactivate a').click();
  100 |       await page.waitForLoadState('domcontentloaded');
  101 |     }
  102 |     await expect(row.locator('.activate a')).toBeVisible();
  103 |     await expect(row.locator('.activate a')).toHaveText(/Activate/i);
  104 |   });
  105 | 
  106 |   test('direct URL to dashboard while deactivated shows access error', async ({ page }) => {
  107 |     // Deactivate first
  108 |     await page.goto('/wp-admin/plugins.php');
  109 |     const row = page.locator('tr[data-slug*="ledgerport"]');
  110 |     const isActive = await row.evaluate((el) => el.classList.contains('active'));
  111 |     if (isActive) {
  112 |       await row.locator('.deactivate a').click();
  113 |       await page.waitForLoadState('domcontentloaded');
  114 |     }
  115 |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
  116 |     await expect(page.locator('body')).toContainText(/not allowed|not found|404|deactivated/i);
  117 |   });
  118 | 
  119 |   // ── Re-activate flow ────────────────────────────────────────────────────────
  120 | 
  121 |   test('reactivating plugin restores sidebar menu', async ({ page }) => {
  122 |     await page.goto('/wp-admin/plugins.php');
  123 |     const row = page.locator('tr[data-slug*="ledgerport"]');
  124 |     // Deactivate if active
  125 |     const isActive = await row.evaluate((el) => el.classList.contains('active'));
  126 |     if (isActive) {
  127 |       await row.locator('.deactivate a').click();
  128 |       await page.waitForLoadState('domcontentloaded');
  129 |     }
  130 |     // Re-activate
  131 |     await row.locator('.activate a').click();
  132 |     await page.waitForLoadState('domcontentloaded');
> 133 |     await expect(row).toHaveClass(/active/);
      |                       ^ Error: expect(locator).toHaveClass(expected) failed
  134 |     await expect(page.locator('#adminmenu').getByText(/LedgerPort/i).first()).toBeVisible();
  135 |   });
  136 | 
  137 |   test('reactivated plugin dashboard is accessible', async ({ page }) => {
  138 |     await page.goto('/wp-admin/plugins.php');
  139 |     const row = page.locator('tr[data-slug*="ledgerport"]');
  140 |     const isActive = await row.evaluate((el) => el.classList.contains('active'));
  141 |     if (!isActive) {
  142 |       await row.locator('.activate a').click();
  143 |       await page.waitForLoadState('domcontentloaded');
  144 |     }
  145 |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
  146 |     await expect(page.locator('h1, h2').filter({ hasText: /Overview/i }).first()).toBeVisible();
  147 |   });
  148 | });
  149 | 
```