# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Mappings Page >> LP-DIS-060 | Mappings "Connect your store" CTA button is visible and enabled
- Location: tests/disconnected-state.spec.ts:366:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /connect your store/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /connect your store/i }).first()

```

```yaml
- navigation "Main menu":
  - link "Skip to main content":
    - /url: "#wpbody-content"
  - link "Skip to toolbar":
    - /url: "#wp-toolbar"
  - list:
    - listitem:
      - link "Dashboard":
        - /url: index.php
      - list:
        - listitem:
          - link "Home":
            - /url: index.php
        - listitem:
          - link "Updates":
            - /url: update-core.php
    - listitem:
      - link "LedgerPort WooCommerce Sync":
        - /url: admin.php?page=ledgerport
      - list:
        - listitem:
          - link "Dashboard":
            - /url: admin.php?page=ledgerport
        - listitem:
          - link "Connection":
            - /url: admin.php?page=ledgerport-connection
        - listitem
        - listitem:
          - link "Mappings":
            - /url: admin.php?page=ledgerport-mappings
        - listitem:
          - link "Manual Sync":
            - /url: admin.php?page=ledgerport-push
        - listitem:
          - link "Audit Logs":
            - /url: admin.php?page=ledgerport-logs
        - listitem:
          - link "Sync Config":
            - /url: admin.php?page=ledgerport-settings
        - listitem:
          - link "Debug Logs":
            - /url: admin.php?page=ledgerport-debug-logs
    - listitem:
      - link "Posts":
        - /url: edit.php
      - list:
        - listitem:
          - link "All Posts":
            - /url: edit.php
        - listitem:
          - link "Add Post":
            - /url: post-new.php
        - listitem:
          - link "Categories":
            - /url: edit-tags.php?taxonomy=category
        - listitem:
          - link "Tags":
            - /url: edit-tags.php?taxonomy=post_tag
    - listitem:
      - link "Media":
        - /url: upload.php
      - list:
        - listitem:
          - link "Library":
            - /url: upload.php
        - listitem:
          - link "Add Media File":
            - /url: media-new.php
    - listitem:
      - link "Pages":
        - /url: edit.php?post_type=page
      - list:
        - listitem:
          - link "All Pages":
            - /url: edit.php?post_type=page
        - listitem:
          - link "Add Page":
            - /url: post-new.php?post_type=page
    - listitem:
      - link "Comments 11 Comments in moderation":
        - /url: edit-comments.php
    - listitem:
      - link "Shortcoder":
        - /url: edit.php?post_type=shortcoder
      - list:
        - listitem:
          - link "All Shortcodes":
            - /url: edit.php?post_type=shortcoder
        - listitem:
          - link "Create shortcode":
            - /url: post-new.php?post_type=shortcoder
        - listitem:
          - link "Tags":
            - /url: edit-tags.php?taxonomy=sc_tag&post_type=shortcoder
        - listitem:
          - link "Settings":
            - /url: edit.php?post_type=shortcoder&page=settings
        - listitem:
          - link "Upgrade to PRO":
            - /url: https://www.aakashweb.com/wordpress-plugins/shortcoder/?utm_source=admin&utm_medium=menu&utm_campaign=sc-pro#pro
    - listitem:
      - link "WooCommerce":
        - /url: admin.php?page=wc-admin
      - list:
        - listitem:
          - link "Home":
            - /url: admin.php?page=wc-admin
        - listitem:
          - link "Orders 114":
            - /url: admin.php?page=wc-orders
        - listitem:
          - link "Customers":
            - /url: admin.php?page=wc-admin&path=/customers
        - listitem:
          - link "Coupons":
            - /url: admin.php?page=coupons-moved
        - listitem:
          - link "Reports":
            - /url: admin.php?page=wc-reports
        - listitem:
          - link "Settings":
            - /url: admin.php?page=wc-settings
        - listitem:
          - link "Status":
            - /url: admin.php?page=wc-status
        - listitem:
          - link "Extensions 1":
            - /url: admin.php?page=wc-admin&path=/extensions
    - listitem:
      - link "Products":
        - /url: edit.php?post_type=product
      - list:
        - listitem:
          - link "All Products":
            - /url: edit.php?post_type=product
        - listitem:
          - link "Add new product":
            - /url: post-new.php?post_type=product
        - listitem:
          - link "Brands":
            - /url: edit-tags.php?taxonomy=product_brand&post_type=product
        - listitem:
          - link "Categories":
            - /url: edit-tags.php?taxonomy=product_cat&post_type=product
        - listitem:
          - link "Tags":
            - /url: edit-tags.php?taxonomy=product_tag&post_type=product
        - listitem:
          - link "Attributes":
            - /url: edit.php?post_type=product&page=product_attributes
        - listitem:
          - link "Reviews":
            - /url: edit.php?post_type=product&page=product-reviews
    - listitem:
      - link "Payments":
        - /url: admin.php?page=wc-settings&tab=checkout&from=PAYMENTS_MENU_ITEM
    - listitem:
      - link "Analytics":
        - /url: admin.php?page=wc-admin&path=/analytics/overview
      - list:
        - listitem:
          - link "Overview":
            - /url: admin.php?page=wc-admin&path=/analytics/overview
        - listitem:
          - link "Products":
            - /url: admin.php?page=wc-admin&path=/analytics/products
        - listitem:
          - link "Revenue":
            - /url: admin.php?page=wc-admin&path=/analytics/revenue
        - listitem:
          - link "Orders":
            - /url: admin.php?page=wc-admin&path=/analytics/orders
        - listitem:
          - link "Variations":
            - /url: admin.php?page=wc-admin&path=/analytics/variations
        - listitem:
          - link "Categories":
            - /url: admin.php?page=wc-admin&path=/analytics/categories
        - listitem:
          - link "Coupons":
            - /url: admin.php?page=wc-admin&path=/analytics/coupons
        - listitem:
          - link "Taxes":
            - /url: admin.php?page=wc-admin&path=/analytics/taxes
        - listitem:
          - link "Downloads":
            - /url: admin.php?page=wc-admin&path=/analytics/downloads
        - listitem:
          - link "Stock":
            - /url: admin.php?page=wc-admin&path=/analytics/stock
        - listitem:
          - link "Settings":
            - /url: admin.php?page=wc-admin&path=/analytics/settings
    - listitem:
      - link "Marketing":
        - /url: admin.php?page=wc-admin&path=/marketing
      - list:
        - listitem:
          - link "Overview":
            - /url: admin.php?page=wc-admin&path=/marketing
        - listitem:
          - link "Coupons":
            - /url: edit.php?post_type=shop_coupon
    - listitem:
      - link "Appearance":
        - /url: themes.php
      - list:
        - listitem:
          - link "Themes":
            - /url: themes.php
        - listitem:
          - link "Design":
            - /url: site-editor.php
        - listitem:
          - link "Customize":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-mappings
        - listitem:
          - link "Widgets":
            - /url: widgets.php
        - listitem:
          - link "Menus":
            - /url: nav-menus.php
        - listitem:
          - link "Header":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-mappings&autofocus%5Bcontrol%5D=header_image
        - listitem:
          - link "Background":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-mappings&autofocus%5Bcontrol%5D=background_image
        - listitem:
          - link "Storefront":
            - /url: themes.php?page=storefront-welcome
        - listitem
        - listitem
        - listitem:
          - link "Theme File Editor":
            - /url: theme-editor.php
    - listitem:
      - link "Plugins":
        - /url: plugins.php
      - list:
        - listitem:
          - link "Installed Plugins":
            - /url: plugins.php
        - listitem:
          - link "Add Plugin":
            - /url: plugin-install.php
        - listitem:
          - link "Plugin File Editor":
            - /url: plugin-editor.php
    - listitem:
      - link "Users":
        - /url: users.php
      - list:
        - listitem:
          - link "All Users":
            - /url: users.php
        - listitem:
          - link "Add User":
            - /url: user-new.php
        - listitem:
          - link "Profile":
            - /url: profile.php
    - listitem:
      - link "Tools":
        - /url: tools.php
      - list:
        - listitem:
          - link "Available Tools":
            - /url: tools.php
        - listitem:
          - link "Import":
            - /url: import.php
        - listitem:
          - link "Export":
            - /url: export.php
        - listitem:
          - link "Site Health 1":
            - /url: site-health.php
        - listitem:
          - link "Export Personal Data":
            - /url: export-personal-data.php
        - listitem:
          - link "Erase Personal Data":
            - /url: erase-personal-data.php
        - listitem:
          - link "Smooth Generator":
            - /url: tools.php?page=smoothgenerator
        - listitem:
          - link "Scheduled Actions":
            - /url: tools.php?page=action-scheduler
    - listitem:
      - link "Settings":
        - /url: options-general.php
      - list:
        - listitem:
          - link "General":
            - /url: options-general.php
        - listitem:
          - link "Writing":
            - /url: options-writing.php
        - listitem:
          - link "Reading":
            - /url: options-reading.php
        - listitem:
          - link "Discussion":
            - /url: options-discussion.php
        - listitem:
          - link "Media":
            - /url: options-media.php
        - listitem:
          - link "Permalinks":
            - /url: options-permalink.php
        - listitem:
          - link "Privacy":
            - /url: options-privacy.php
    - listitem:
      - link "Code Snippets":
        - /url: admin.php?page=wpcode
      - list:
        - listitem:
          - link "Code Snippets":
            - /url: admin.php?page=wpcode
        - listitem:
          - link "+ Add Snippet":
            - /url: admin.php?page=wpcode-snippet-manager
        - listitem:
          - link "Header & Footer":
            - /url: admin.php?page=wpcode-headers-footers
        - listitem:
          - link "Conversion Pixels":
            - /url: admin.php?page=wpcode-pixel
        - listitem:
          - link "Library":
            - /url: admin.php?page=wpcode-library
        - listitem:
          - link "File Editor":
            - /url: admin.php?page=wpcode-file-editor
        - listitem:
          - link "Search & Replace":
            - /url: admin.php?page=wpcode-search-replace
        - listitem:
          - link "Secure Backups":
            - /url: admin.php?page=wpcode-duplicator
        - listitem:
          - link "Tools":
            - /url: admin.php?page=wpcode-tools
        - listitem:
          - link "Settings":
            - /url: admin.php?page=wpcode-settings
    - listitem:
      - button "Collapse Main menu" [expanded]: Collapse Menu
- navigation "Toolbar":
  - menu:
    - group:
      - menuitem "About WordPress"
    - group:
      - menuitem "QA Staging"
    - group:
      - menuitem "Live"
    - group:
      - menuitem "WP Adminer"
    - group:
      - menuitem "11 Comments in moderation"
    - group:
      - menuitem "New"
    - group:
      - menuitem "WPCode"
  - menu:
    - group:
      - menuitem "Howdy, Kulvinder Singh"
- main:
  - link "LedgerPort":
    - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport
    - img "LedgerPort"
  - button "Notifications"
  - button "Switch to dark mode"
  - button "Help"
  - heading "Mappings" [level=1]
  - paragraph: Map WooCommerce products, variations, customers, and payment methods to QuickBooks Online.
  - heading "Connect your store to start syncing" [level=3]
  - paragraph: Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.
  - list:
    - listitem: One-click connection — sign in with your LedgerPort account
    - listitem: Real-time sync as orders, products, and customers change
    - listitem: Keep QuickBooks accurate without re-typing data
    - listitem: Secure connection — we never see your QuickBooks login
  - link "Connect your store":
    - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-setup-wizard
  - navigation:
    - tab "Products" [selected]
    - tab "Variations"
    - tab "Customers"
    - tab "Payment Methods"
  - paragraph: Connect your store to use this feature
  - paragraph: Once your WooCommerce store is connected to LedgerPort, this section will show you live data.
  - link "Connect your store":
    - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-setup-wizard
  - region "Notifications alt+T"
- contentinfo:
  - paragraph:
    - text: Thank you for creating with
    - link "WordPress":
      - /url: https://wordpress.org/
    - text: .
  - paragraph: Version 6.9.4
```

# Test source

```ts
  268 | 
  269 |   test('LP-DIS-043 | Connections widget does NOT show "Connected" for either service', async () => {
  270 |     const connectionsWidget = page.getByText('Connections').locator('..').locator('..');
  271 |     await expect(connectionsWidget.getByText('Connected')).not.toBeVisible();
  272 |   });
  273 | 
  274 |   // Configuration widget — not configured state
  275 |   test('LP-DIS-044 | "Configuration" heading is visible', async () => {
  276 |     await expect(page.getByText('Configuration')).toBeVisible();
  277 |   });
  278 | 
  279 |   test('LP-DIS-045 | Method shows "Not configured" when disconnected', async () => {
  280 |     await expect(page.getByText('Not configured').first()).toBeVisible();
  281 |   });
  282 | 
  283 |   test('LP-DIS-046 | Frequency shows "Not configured" when disconnected', async () => {
  284 |     await expect(page.getByText('Not configured').nth(1)).toBeVisible();
  285 |   });
  286 | 
  287 |   test('LP-DIS-047 | Auto sync shows "Manual" when disconnected (not "Automatic")', async () => {
  288 |     await expect(page.getByText('Manual')).toBeVisible();
  289 |     const configWidget = page.getByText('Configuration').locator('..').locator('..');
  290 |     await expect(configWidget.getByText('Automatic')).not.toBeVisible();
  291 |   });
  292 | 
  293 |   test('LP-DIS-048 | "Manage settings →" link is still visible in disconnected state', async () => {
  294 |     await expect(page.getByRole('link', { name: /manage settings/i })).toBeVisible();
  295 |   });
  296 | });
  297 | 
  298 | // ─────────────────────────────────────────────────────────────────────────────
  299 | // 2. CONNECTION PAGE — Disconnected State
  300 | // ─────────────────────────────────────────────────────────────────────────────
  301 | 
  302 | test.describe('Disconnected State — Connection Page', () => {
  303 |   test.beforeEach(async () => {
  304 |     await goToPluginPage(page, PLUGIN_PAGES.connection);
  305 |   });
  306 | 
  307 |   test('LP-DIS-049 | Connection page loads correctly', async () => {
  308 |     await expect(page).toHaveTitle(/Connection/i);
  309 |   });
  310 | 
  311 |   test('LP-DIS-050 | "Connections" heading is visible on Connection page', async () => {
  312 |     await expect(page.getByRole('heading', { name: /connections/i })).toBeVisible();
  313 |   });
  314 | 
  315 |   test('LP-DIS-051 | Sub-heading "Manage how LedgerPort connects..." is visible', async () => {
  316 |     await expect(page.getByText('Manage how LedgerPort connects to your store and accounting platform.')).toBeVisible();
  317 |   });
  318 | 
  319 |   test('LP-DIS-052 | "Connect your store to start syncing" banner is shown on Connection page', async () => {
  320 |     await assertConnectBanner(page);
  321 |   });
  322 | 
  323 |   test('LP-DIS-053 | "Connect your store" CTA button on Connection page is visible and enabled', async () => {
  324 |     const btn = page.getByRole('button', { name: /connect your store/i });
  325 |     await expect(btn).toBeVisible();
  326 |     await expect(btn).toBeEnabled();
  327 |   });
  328 | 
  329 |   test('LP-DIS-054 | Connection page does NOT show "Connected" status for any service', async () => {
  330 |     await expect(page.getByText('Connected')).not.toBeVisible();
  331 |   });
  332 | 
  333 |   test('LP-DIS-055 | Connection page does NOT show QuickBooks account details (email, company name)', async () => {
  334 |     // Should not show any QB account info since not connected
  335 |     await expect(page.getByText(/@.*\.com/)).not.toBeVisible();
  336 |   });
  337 | });
  338 | 
  339 | // ─────────────────────────────────────────────────────────────────────────────
  340 | // 3. MAPPINGS PAGE — Disconnected State
  341 | // ─────────────────────────────────────────────────────────────────────────────
  342 | 
  343 | test.describe('Disconnected State — Mappings Page', () => {
  344 |   test.beforeEach(async () => {
  345 |     await goToPluginPage(page, PLUGIN_PAGES.mappings);
  346 |   });
  347 | 
  348 |   test('LP-DIS-056 | Mappings page loads correctly', async () => {
  349 |     await expect(page).toHaveTitle(/Mappings/i);
  350 |   });
  351 | 
  352 |   test('LP-DIS-057 | "Mappings" heading is visible', async () => {
  353 |     await expect(page.getByRole('heading', { name: /^mappings$/i })).toBeVisible();
  354 |   });
  355 | 
  356 |   test('LP-DIS-058 | Sub-heading copy is correct', async () => {
  357 |     await expect(page.getByText(
  358 |       'Map WooCommerce products, variations, customers, and payment methods to QuickBooks Online.'
  359 |     )).toBeVisible();
  360 |   });
  361 | 
  362 |   test('LP-DIS-059 | "Connect your store to start syncing" banner is shown on Mappings page', async () => {
  363 |     await assertConnectBanner(page);
  364 |   });
  365 | 
  366 |   test('LP-DIS-060 | Mappings "Connect your store" CTA button is visible and enabled', async () => {
  367 |     const btn = page.getByRole('button', { name: /connect your store/i }).first();
> 368 |     await expect(btn).toBeVisible();
      |                       ^ Error: expect(locator).toBeVisible() failed
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
  464 |     await expect(page.locator('#adminmenu')).toBeVisible();
  465 |   });
  466 | });
  467 | 
  468 | // ─────────────────────────────────────────────────────────────────────────────
```