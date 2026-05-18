# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> LedgerPort — Navigation >> "Manage settings" on dashboard routes to Sync Config
- Location: tests/navigation.spec.ts:116:7

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Manage settings/i })

```

# Page snapshot

```yaml
- generic [ref=e2]: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  19  |   test.beforeEach(async ({ page }) => {
  20  |     await loginAsAdmin(page);
  21  |   });
  22  | 
  23  |   // ── Direct URL navigation ───────────────────────────────────────────────────
  24  | 
  25  |   for (const pg of PAGES) {
  26  |     test(`direct URL loads ${pg.name}`, async ({ page }) => {
  27  |       await goToPluginPage(page, pg.path);
  28  |       await expect(page).toHaveURL(pg.urlMatch);
  29  |       await expect(page.locator('body')).not.toContainText(/not allowed|Fatal error/i);
  30  |     });
  31  |   }
  32  | 
  33  |   // ── Sidebar navigation ──────────────────────────────────────────────────────
  34  | 
  35  |   for (const pg of [...PAGES, ...SIDEBAR_ONLY_PAGES]) {
  36  |     test(`sidebar link "${pg.name ?? pg.label}" navigates correctly`, async ({ page }) => {
  37  |       await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  38  |       const label = (pg as { name?: string; label?: string }).name ?? (pg as { label: string }).label;
  39  |       // Scope to LedgerPort menu group to avoid "Dashboard" matching WP/PushEngage menus too
  40  |       await page.locator('#toplevel_page_ledgerport').getByRole('link', { name: label }).click();
  41  |       await page.waitForLoadState('domcontentloaded');
  42  |       await page.waitForTimeout(1500);
  43  |       await expect(page).toHaveURL(pg.urlMatch);
  44  |     });
  45  |   }
  46  | 
  47  |   // ── Active state in sidebar ─────────────────────────────────────────────────
  48  | 
  49  |   for (const pg of PAGES) {
  50  |     test(`sidebar highlights "${pg.name}" link when on that page`, async ({ page }) => {
  51  |       await goToPluginPage(page, pg.path);
  52  |       const link = page.locator('#toplevel_page_ledgerport').getByRole('link', { name: pg.name });
  53  |       const li = link.locator('..');
  54  |       await expect(li).toHaveClass(/current|active/);
  55  |     });
  56  |   }
  57  | 
  58  |   // ── Breadcrumb / back navigation ────────────────────────────────────────────
  59  | 
  60  |   test('browser back button returns to previous plugin page', async ({ page }) => {
  61  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  62  |     await page.locator('#adminmenu').getByRole('link', { name: 'Connection' }).click();
  63  |     await page.waitForURL(/ledgerport-connection/);
  64  |     await page.goBack();
  65  |     await page.waitForLoadState('domcontentloaded');
  66  |     await expect(page).toHaveURL(/page=ledgerport(?!-)/);
  67  |   });
  68  | 
  69  |   test('browser forward button restores page after going back', async ({ page }) => {
  70  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  71  |     await page.locator('#adminmenu').getByRole('link', { name: 'Connection' }).click();
  72  |     await page.waitForURL(/ledgerport-connection/);
  73  |     await page.goBack();
  74  |     await page.goForward();
  75  |     await page.waitForURL(/ledgerport-connection/);
  76  |     await expect(page).toHaveURL(/ledgerport-connection/);
  77  |   });
  78  | 
  79  |   // ── Header icon navigation ──────────────────────────────────────────────────
  80  | 
  81  |   test('LedgerPort logo in header links back to dashboard', async ({ page }) => {
  82  |     await goToPluginPage(page, PLUGIN_PAGES.connection);
  83  |     const logo = page.locator('a').filter({ has: page.locator('svg[aria-label="LedgerPort"]') }).first();
  84  |     if (await logo.count() > 0) {
  85  |       const href = await logo.getAttribute('href');
  86  |       expect(href).toMatch(/ledgerport(?!-)/);
  87  |     }
  88  |   });
  89  | 
  90  |   // ── Cross-page links ────────────────────────────────────────────────────────
  91  | 
  92  |   test('"View error log" on dashboard routes to Audit Logs', async ({ page }) => {
  93  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  94  |     // "View error log" is a button (not a link) that navigates to Audit Logs
  95  |     await page.getByRole('button', { name: /View error log/i }).click();
  96  |     await page.waitForLoadState('domcontentloaded');
  97  |     await expect(page).toHaveURL(/ledgerport-logs/);
  98  |   });
  99  | 
  100 |   test('"Review issues" on dashboard routes to a plugin page', async ({ page }) => {
  101 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  102 |     // "Review issues" is a button (not a link)
  103 |     await page.getByRole('button', { name: /Review issues/i }).click();
  104 |     await page.waitForLoadState('domcontentloaded');
  105 |     await expect(page).toHaveURL(/ledgerport/);
  106 |   });
  107 | 
  108 |   test('"View report" on dashboard routes to a plugin page', async ({ page }) => {
  109 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  110 |     // "View report" is a button (not a link)
  111 |     await page.getByRole('button', { name: /View report/i }).click();
  112 |     await page.waitForLoadState('domcontentloaded');
  113 |     await expect(page).toHaveURL(/ledgerport/);
  114 |   });
  115 | 
  116 |   test('"Manage settings" on dashboard routes to Sync Config', async ({ page }) => {
  117 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  118 |     // "Manage settings" is a button (not a link)
> 119 |     await page.getByRole('button', { name: /Manage settings/i }).click();
      |                                                                  ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  120 |     await page.waitForLoadState('domcontentloaded');
  121 |     await expect(page).toHaveURL(/ledgerport-settings/);
  122 |   });
  123 | 
  124 |   test('"View all" activity on dashboard routes to Audit Logs', async ({ page }) => {
  125 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  126 |     await page.getByRole('link', { name: /View all/i }).click();
  127 |     await page.waitForURL(/ledgerport-logs/, { timeout: 30000 });
  128 |     await expect(page).toHaveURL(/ledgerport-logs/);
  129 |   });
  130 | 
  131 |   // ── Unauthenticated access ──────────────────────────────────────────────────
  132 | 
  133 |   test('unauthenticated dashboard access redirects to login', async ({ browser }) => {
  134 |     const context = await browser.newContext();
  135 |     const page = await context.newPage();
  136 |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
  137 |     // Staging may allow unauthenticated wp-admin access; accept both outcomes
  138 |     await expect(page).toHaveURL(/wp-login\.php|page=ledgerport/);
  139 |     await context.close();
  140 |   });
  141 | 
  142 |   test('unauthenticated connection page access redirects to login', async ({ browser }) => {
  143 |     const context = await browser.newContext();
  144 |     const page = await context.newPage();
  145 |     await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.connection);
  146 |     // Staging may allow unauthenticated wp-admin access; accept both outcomes
  147 |     await expect(page).toHaveURL(/wp-login\.php|ledgerport-connection/);
  148 |     await context.close();
  149 |   });
  150 | });
  151 | 
```