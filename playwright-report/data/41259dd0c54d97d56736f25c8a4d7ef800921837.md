# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Audit Logs Page (Access Restricted) >> LP-DIS-075 | Audit Logs restricted page still shows WordPress admin chrome
- Location: tests/disconnected-state.spec.ts:462:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#adminmenu')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#adminmenu')

```

```yaml
- text: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  364 |   });
  365 | 
  366 |   test('LP-DIS-060 | Mappings "Connect your store" CTA button is visible and enabled', async () => {
  367 |     const btn = page.getByRole('button', { name: /connect your store/i }).first();
  368 |     await expect(btn).toBeVisible();
  369 |     await expect(btn).toBeEnabled();
  370 |   });
  371 | 
  372 |   test('LP-DIS-061 | Mappings tab bar shows all 4 tabs', async () => {
  373 |     await expect(page.getByText('Products')).toBeVisible();
  374 |     await expect(page.getByText('Variations')).toBeVisible();
  375 |     await expect(page.getByText('Customers')).toBeVisible();
  376 |     await expect(page.getByText('Payment Methods')).toBeVisible();
  377 |   });
  378 | 
  379 |   test('LP-DIS-062 | "Products" tab is active/selected by default', async () => {
  380 |     // Active tab typically has an underline or aria-selected
  381 |     const activeTab = page.getByRole('tab', { selected: true })
  382 |       .or(page.locator('[class*="tab"][class*="active"], [class*="tab--active"]')).first();
  383 |     await expect(activeTab).toContainText(/products/i);
  384 |   });
  385 | 
  386 |   test('LP-DIS-063 | Products tab content shows "Connect your store to use this feature"', async () => {
  387 |     await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  388 |   });
  389 | 
  390 |   test('LP-DIS-064 | Products tab shows correct explanation text', async () => {
  391 |     await expect(page.getByText(
  392 |       'Once your WooCommerce store is connected to LedgerPort, this section will show you live data.'
  393 |     )).toBeVisible();
  394 |   });
  395 | 
  396 |   test('LP-DIS-065 | Products tab has a second "Connect your store" CTA button inside the gated area', async () => {
  397 |     const ctaBtn = page.getByRole('button', { name: /connect your store/i })
  398 |       .or(page.getByText('Connect your store').last());
  399 |     await expect(ctaBtn).toBeVisible();
  400 |   });
  401 | 
  402 |   test('LP-DIS-066 | Variations tab also shows gated state when clicked', async () => {
  403 |     await page.getByText('Variations').click();
  404 |     await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  405 |   });
  406 | 
  407 |   test('LP-DIS-067 | Customers tab also shows gated state when clicked', async () => {
  408 |     await page.getByText('Customers').click();
  409 |     await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  410 |   });
  411 | 
  412 |   test('LP-DIS-068 | Payment Methods tab also shows gated state when clicked', async () => {
  413 |     await page.getByText('Payment Methods').click();
  414 |     await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  415 |   });
  416 | 
  417 |   test('LP-DIS-069 | No mapping table rows or product data are visible in disconnected state', async () => {
  418 |     // Navigate back to Products tab
  419 |     await page.getByText('Products').click();
  420 |     const tableRows = page.locator('table tbody tr, .mapping-row, [class*="product-row"]');
  421 |     await expect(tableRows).toHaveCount(0);
  422 |   });
  423 | });
  424 | 
  425 | // ─────────────────────────────────────────────────────────────────────────────
  426 | // 4. MANUAL SYNC PAGE — Access Restricted
  427 | // ─────────────────────────────────────────────────────────────────────────────
  428 | 
  429 | test.describe('Disconnected State — Manual Sync Page (Access Restricted)', () => {
  430 |   test('LP-DIS-070 | Manual Sync page returns "Sorry, you are not allowed to access this page."', async () => {
  431 |     await goToPluginPage(page, PLUGIN_PAGES.manualSync);
  432 |     await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  433 |   });
  434 | 
  435 |   test('LP-DIS-071 | Manual Sync restricted page does NOT show any sync controls or buttons', async () => {
  436 |     await goToPluginPage(page, PLUGIN_PAGES.manualSync);
  437 |     await expect(page.getByRole('button', { name: /sync/i })).not.toBeVisible();
  438 |     await expect(page.getByRole('button', { name: /run/i })).not.toBeVisible();
  439 |   });
  440 | 
  441 |   test('LP-DIS-072 | Manual Sync restricted page still shows WordPress admin chrome (menu visible)', async () => {
  442 |     await goToPluginPage(page, PLUGIN_PAGES.manualSync);
  443 |     await expect(page.locator('#adminmenu')).toBeVisible();
  444 |   });
  445 | });
  446 | 
  447 | // ─────────────────────────────────────────────────────────────────────────────
  448 | // 5. AUDIT LOGS PAGE — Access Restricted
  449 | // ─────────────────────────────────────────────────────────────────────────────
  450 | 
  451 | test.describe('Disconnected State — Audit Logs Page (Access Restricted)', () => {
  452 |   test('LP-DIS-073 | Audit Logs page returns "Sorry, you are not allowed to access this page."', async () => {
  453 |     await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
  454 |     await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  455 |   });
  456 | 
  457 |   test('LP-DIS-074 | Audit Logs restricted page does NOT show any log entries or table', async () => {
  458 |     await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
  459 |     await expect(page.locator('table, .audit-log-table, .log-entries')).not.toBeVisible();
  460 |   });
  461 | 
  462 |   test('LP-DIS-075 | Audit Logs restricted page still shows WordPress admin chrome', async () => {
  463 |     await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
> 464 |     await expect(page.locator('#adminmenu')).toBeVisible();
      |                                              ^ Error: expect(locator).toBeVisible() failed
  465 |   });
  466 | });
  467 | 
  468 | // ─────────────────────────────────────────────────────────────────────────────
  469 | // 6. SYNC CONFIG PAGE — Access Restricted
  470 | // ─────────────────────────────────────────────────────────────────────────────
  471 | 
  472 | test.describe('Disconnected State — Sync Config Page (Access Restricted)', () => {
  473 |   test('LP-DIS-076 | Sync Config page returns "Sorry, you are not allowed to access this page."', async () => {
  474 |     await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
  475 |     await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  476 |   });
  477 | 
  478 |   test('LP-DIS-077 | Sync Config restricted page does NOT show any settings fields or form', async () => {
  479 |     await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
  480 |     await expect(page.locator('form, .sync-config-form, input[type="text"]')).not.toBeVisible();
  481 |   });
  482 | 
  483 |   test('LP-DIS-078 | Sync Config restricted page still shows WordPress admin chrome', async () => {
  484 |     await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
  485 |     await expect(page.locator('#adminmenu')).toBeVisible();
  486 |   });
  487 | });
  488 | 
  489 | // ─────────────────────────────────────────────────────────────────────────────
  490 | // 7. DEBUG LOGS PAGE — Partially accessible in disconnected state
  491 | // ─────────────────────────────────────────────────────────────────────────────
  492 | 
  493 | test.describe('Disconnected State — Debug Logs Page', () => {
  494 |   test.beforeEach(async () => {
  495 |     await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
  496 |   });
  497 | 
  498 |   test('LP-DIS-079 | Debug Logs page loads correctly (not access-restricted)', async () => {
  499 |     await expect(page).toHaveTitle(/Debug Logs/i);
  500 |     await expect(page.getByText('Sorry, you are not allowed to access this page.')).not.toBeVisible();
  501 |   });
  502 | 
  503 |   test('LP-DIS-080 | "Debug Logs" heading is visible', async () => {
  504 |     await expect(page.getByRole('heading', { name: /debug logs/i })).toBeVisible();
  505 |   });
  506 | 
  507 |   test('LP-DIS-081 | Sub-heading copy is correct', async () => {
  508 |     await expect(page.getByText('View, download, and manage plugin debug log files.')).toBeVisible();
  509 |   });
  510 | 
  511 |   test('LP-DIS-082 | "Connect your store to start syncing" banner is shown on Debug Logs page', async () => {
  512 |     await assertConnectBanner(page);
  513 |   });
  514 | 
  515 |   test('LP-DIS-083 | Debug Logs "Connect your store" CTA button is visible and enabled', async () => {
  516 |     const btn = page.getByRole('button', { name: /connect your store/i });
  517 |     await expect(btn).toBeVisible();
  518 |     await expect(btn).toBeEnabled();
  519 |   });
  520 | 
  521 |   test('LP-DIS-084 | "Log Files" section heading is visible', async () => {
  522 |     await expect(page.getByText('Log Files')).toBeVisible();
  523 |   });
  524 | 
  525 |   test('LP-DIS-085 | Log storage path label is shown', async () => {
  526 |     await expect(page.getByText(/wp-content\/uploads\/ledgerport\/logs\//)).toBeVisible();
  527 |   });
  528 | 
  529 |   test('LP-DIS-086 | "Refresh" button is visible and enabled', async () => {
  530 |     const btn = page.getByRole('button', { name: /refresh/i });
  531 |     await expect(btn).toBeVisible();
  532 |     await expect(btn).toBeEnabled();
  533 |   });
  534 | 
  535 |   test('LP-DIS-087 | "Clear All Logs" button is visible and enabled', async () => {
  536 |     const btn = page.getByRole('button', { name: /clear all logs/i });
  537 |     await expect(btn).toBeVisible();
  538 |     await expect(btn).toBeEnabled();
  539 |   });
  540 | 
  541 |   test('LP-DIS-088 | Log files table shows "File", "Size", "Last Modified", "Actions" column headers', async () => {
  542 |     await expect(page.getByText('File')).toBeVisible();
  543 |     await expect(page.getByText('Size')).toBeVisible();
  544 |     await expect(page.getByText('Last Modified')).toBeVisible();
  545 |     await expect(page.getByText('Actions')).toBeVisible();
  546 |   });
  547 | 
  548 |   test('LP-DIS-089 | At least one log file entry exists in the table', async () => {
  549 |     await expect(page.getByText(/\.log/)).toBeVisible();
  550 |   });
  551 | 
  552 |   test('LP-DIS-090 | Log file shows a file size (e.g. "1000 B")', async () => {
  553 |     await expect(page.getByText(/\d+ B|\d+ KB|\d+ MB/)).toBeVisible();
  554 |   });
  555 | 
  556 |   test('LP-DIS-091 | Log file shows a "Last Modified" date in DD/MM/YYYY format', async () => {
  557 |     await expect(page.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeVisible();
  558 |   });
  559 | 
  560 |   test('LP-DIS-092 | Log file row has a view (eye) action icon', async () => {
  561 |     const viewIcon = page.locator('table tbody tr').first()
  562 |       .locator('button[aria-label*="view"], .view-log, svg').first();
  563 |     await expect(viewIcon).toBeVisible();
  564 |   });
```