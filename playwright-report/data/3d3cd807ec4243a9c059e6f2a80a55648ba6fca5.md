# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Debug Logs Page >> LP-DIS-091 | Log file shows a "Last Modified" date in DD/MM/YYYY format
- Location: tests/disconnected-state.spec.ts:556:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/\d{2}\/\d{2}\/\d{4}/)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/\d{2}\/\d{2}\/\d{4}/)

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
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-debug-logs
        - listitem:
          - link "Widgets":
            - /url: widgets.php
        - listitem:
          - link "Menus":
            - /url: nav-menus.php
        - listitem:
          - link "Header":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-debug-logs&autofocus%5Bcontrol%5D=header_image
        - listitem:
          - link "Background":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-debug-logs&autofocus%5Bcontrol%5D=background_image
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
  - heading "Debug Logs" [level=1]
  - paragraph: View, download, and manage plugin debug log files.
  - heading "Connect your store to start syncing" [level=3]
  - paragraph: Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.
  - list:
    - listitem: One-click connection — sign in with your LedgerPort account
    - listitem: Real-time sync as orders, products, and customers change
    - listitem: Keep QuickBooks accurate without re-typing data
    - listitem: Secure connection — we never see your QuickBooks login
  - link "Connect your store":
    - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-setup-wizard
  - heading "Log Files" [level=3]
  - paragraph:
    - text: Logs are stored in
    - code: wp-content/uploads/ledgerport/logs/
  - button "Refresh"
  - button "Clear All Logs"
  - table:
    - rowgroup:
      - row "File Size Last Modified Actions":
        - columnheader "File"
        - columnheader "Size"
        - columnheader "Last Modified"
        - columnheader "Actions"
    - rowgroup:
      - row "debug-7d4e0b4e.log 1000 B 5/18/2026, 2:56:16 PM":
        - cell "debug-7d4e0b4e.log"
        - cell "1000 B"
        - cell "5/18/2026, 2:56:16 PM"
        - cell:
          - button
          - button
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
> 557 |     await expect(page.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeVisible();
      |                                                         ^ Error: expect(locator).toBeVisible() failed
  558 |   });
  559 | 
  560 |   test('LP-DIS-092 | Log file row has a view (eye) action icon', async () => {
  561 |     const viewIcon = page.locator('table tbody tr').first()
  562 |       .locator('button[aria-label*="view"], .view-log, svg').first();
  563 |     await expect(viewIcon).toBeVisible();
  564 |   });
  565 | 
  566 |   test('LP-DIS-093 | Log file row has a delete (trash) action icon', async () => {
  567 |     const deleteIcon = page.locator('table tbody tr').first()
  568 |       .locator('button[aria-label*="delete"], .delete-log, svg').last();
  569 |     await expect(deleteIcon).toBeVisible();
  570 |   });
  571 | });
  572 | 
  573 | // ─────────────────────────────────────────────────────────────────────────────
  574 | // 8. CROSS-PAGE: "Connect your store" CTA — Navigation Behaviour
  575 | // ─────────────────────────────────────────────────────────────────────────────
  576 | 
  577 | test.describe('Disconnected State — Connect CTA Navigation', () => {
  578 |   test('LP-DIS-094 | Dashboard "Connect your store" banner CTA navigates to Connection page or OAuth flow', async () => {
  579 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  580 |     const btn = page.getByRole('button', { name: /connect your store/i }).first();
  581 |     await btn.click();
  582 |     await page.waitForLoadState('networkidle');
  583 |     // Should either navigate to the Connection page or open an OAuth popup/redirect
  584 |     const url = page.url();
  585 |     const isConnectionPage = url.includes('ledgerport-connection') || url.includes('ledgerport');
  586 |     const isOAuthFlow = url.includes('intuit.com') || url.includes('oauth') || url.includes('quickbooks');
  587 |     expect(isConnectionPage || isOAuthFlow).toBe(true);
  588 |   });
  589 | 
  590 |   test('LP-DIS-095 | Connection page "Connect your store" CTA is clickable and navigates', async () => {
  591 |     await goToPluginPage(page, PLUGIN_PAGES.connection);
  592 |     const btn = page.getByRole('button', { name: /connect your store/i });
  593 |     await btn.click();
  594 |     await page.waitForLoadState('networkidle');
  595 |     // Should not show an error page
  596 |     await expect(page).not.toHaveTitle(/error|404|500/i);
  597 |   });
  598 | 
  599 |   test('LP-DIS-096 | Mappings gated area "Connect your store" CTA is clickable and navigates', async () => {
  600 |     await goToPluginPage(page, PLUGIN_PAGES.mappings);
  601 |     // The second "Connect your store" button is in the gated content area
  602 |     const btn = page.getByRole('button', { name: /connect your store/i }).last();
  603 |     await btn.click();
  604 |     await page.waitForLoadState('networkidle');
  605 |     await expect(page).not.toHaveTitle(/error|404|500/i);
  606 |   });
  607 | 
  608 |   test('LP-DIS-097 | Dashboard "Finish setup" CTA is clickable and navigates to connection flow', async () => {
  609 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  610 |     const btn = page.getByRole('button', { name: /finish setup/i })
  611 |       .or(page.getByText('Finish setup'));
  612 |     await btn.click();
  613 |     await page.waitForLoadState('networkidle');
  614 |     await expect(page).not.toHaveTitle(/error|404|500/i);
  615 |   });
  616 | });
  617 | 
  618 | // ─────────────────────────────────────────────────────────────────────────────
  619 | // 9. CROSS-PAGE: Sidebar Navigation in Disconnected State
  620 | // ─────────────────────────────────────────────────────────────────────────────
  621 | 
  622 | test.describe('Disconnected State — Sidebar Navigation', () => {
  623 |   test.beforeEach(async () => {
  624 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  625 |   });
  626 | 
  627 |   test('LP-DIS-098 | All 7 sidebar menu items are visible in disconnected state', async () => {
  628 |     const menu = page.locator('#adminmenu');
  629 |     await expect(menu.getByText('Dashboard')).toBeVisible();
  630 |     await expect(menu.getByText('Connection')).toBeVisible();
  631 |     await expect(menu.getByText('Mappings')).toBeVisible();
  632 |     await expect(menu.getByText('Manual Sync')).toBeVisible();
  633 |     await expect(menu.getByText('Audit Logs')).toBeVisible();
  634 |     await expect(menu.getByText('Sync Config')).toBeVisible();
  635 |     await expect(menu.getByText('Debug Logs')).toBeVisible();
  636 |   });
  637 | 
  638 |   test('LP-DIS-099 | Clicking "Connection" in sidebar navigates to Connection page', async () => {
  639 |     await page.locator('#adminmenu').getByRole('link', { name: /^connection$/i }).click();
  640 |     await page.waitForLoadState('networkidle');
  641 |     expect(page.url()).toContain('ledgerport-connection');
  642 |   });
  643 | 
  644 |   test('LP-DIS-100 | Clicking "Mappings" in sidebar navigates to Mappings page', async () => {
  645 |     await page.locator('#adminmenu').getByRole('link', { name: /^mappings$/i }).click();
  646 |     await page.waitForLoadState('networkidle');
  647 |     expect(page.url()).toContain('ledgerport-mappings');
  648 |   });
  649 | 
  650 |   test('LP-DIS-101 | Clicking "Debug Logs" in sidebar navigates to Debug Logs page', async () => {
  651 |     await page.locator('#adminmenu').getByRole('link', { name: /^debug logs$/i }).click();
  652 |     await page.waitForLoadState('networkidle');
  653 |     expect(page.url()).toContain('ledgerport-debug-logs');
  654 |   });
  655 | 
  656 |   test('LP-DIS-102 | LedgerPort plugin icon/logo is shown in sidebar', async () => {
  657 |     await expect(page.locator('#adminmenu').locator('img, svg').first()).toBeVisible();
```