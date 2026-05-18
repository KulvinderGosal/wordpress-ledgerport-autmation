# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Dashboard >> LP-DIS-048 | "Manage settings →" link is still visible in disconnected state
- Location: tests/disconnected-state.spec.ts:293:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /manage settings/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /manage settings/i })

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
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport
        - listitem:
          - link "Widgets":
            - /url: widgets.php
        - listitem:
          - link "Menus":
            - /url: nav-menus.php
        - listitem:
          - link "Header":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport&autofocus%5Bcontrol%5D=header_image
        - listitem:
          - link "Background":
            - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport&autofocus%5Bcontrol%5D=background_image
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
  - heading "Overview" [level=1]
  - paragraph: Sync health, recent activity, and what needs your attention.
  - heading "Connect your store to start syncing" [level=3]
  - paragraph: Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.
  - list:
    - listitem: One-click connection — sign in with your LedgerPort account
    - listitem: Real-time sync as orders, products, and customers change
    - listitem: Keep QuickBooks accurate without re-typing data
    - listitem: Secure connection — we never see your QuickBooks login
  - link "Connect your store":
    - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-setup-wizard
  - text: Syncing
  - strong: your store
  - combobox: Last 7 days
  - button "May 12, 2026 – May 18, 2026"
  - text: "Last sync: Hasn't run yet"
  - button "Sync now" [disabled]
  - paragraph: Sync health
  - paragraph: 0% success rate
  - paragraph: 0 total syncs
  - button "View error log"
  - paragraph: Orders
  - paragraph: 0 orders
  - paragraph: 0.0% success rate
  - button "View report"
  - paragraph: Needs attention
  - paragraph: 0 items
  - paragraph: Nothing needs review
  - button "Review issues"
  - heading "Data Health Overview" [level=3]
  - heading "Recent Activity" [level=3]
  - link "View all":
    - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-logs
  - paragraph: No syncs have run yet. Start a sync to see activity here.
  - heading "Setup checklist" [level=3]
  - text: Connect WooCommerce
  - button "Connect"
  - text: Connect QuickBooks
  - button "Connect"
  - text: Configure sync settings
  - button "Review"
  - text: Enable automatic sync
  - button "Enable"
  - button "Finish setup"
  - heading "Connections" [level=3]
  - text: Q
  - paragraph: QuickBooks
  - text: Disconnected
  - button
  - text: W
  - paragraph: WooCommerce
  - text: Disconnected
  - button
  - heading "Configuration" [level=3]
  - paragraph: Method
  - paragraph: Not configured
  - paragraph: Frequency
  - paragraph: Not configured
  - paragraph: Auto sync
  - paragraph: Manual
  - button "Manage settings"
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
  194 |   // Recent Activity — empty state
  195 |   test('LP-DIS-028 | "Recent Activity" heading is visible', async () => {
  196 |     await expect(page.getByText('Recent Activity')).toBeVisible();
  197 |   });
  198 | 
  199 |   test('LP-DIS-029 | "No syncs have run yet. Start a sync to see activity here." message is shown', async () => {
  200 |     await expect(page.getByText('No syncs have run yet. Start a sync to see activity here.')).toBeVisible();
  201 |   });
  202 | 
  203 |   test('LP-DIS-030 | No activity entries (success/failed rows) are shown in disconnected state', async () => {
  204 |     await expect(page.getByText('queue_run')).not.toBeVisible();
  205 |     await expect(page.getByText('mapping_update')).not.toBeVisible();
  206 |   });
  207 | 
  208 |   test('LP-DIS-031 | "View all" link is still present next to Recent Activity', async () => {
  209 |     await expect(page.getByRole('link', { name: /view all/i })).toBeVisible();
  210 |   });
  211 | 
  212 |   // Setup Checklist — disconnected state (shows action buttons, not checkmarks)
  213 |   test('LP-DIS-032 | "Setup checklist" heading is visible', async () => {
  214 |     await expect(page.getByText('Setup checklist')).toBeVisible();
  215 |   });
  216 | 
  217 |   test('LP-DIS-033 | "Connect WooCommerce" item shows a "Connect" action button', async () => {
  218 |     const row = page.getByText('Connect WooCommerce').locator('..').locator('..');
  219 |     await expect(row.getByRole('button', { name: /connect/i }).or(row.getByText('Connect'))).toBeVisible();
  220 |   });
  221 | 
  222 |   test('LP-DIS-034 | "Connect QuickBooks" item shows a "Connect" action button', async () => {
  223 |     const row = page.getByText('Connect QuickBooks').locator('..').locator('..');
  224 |     await expect(row.getByRole('button', { name: /connect/i }).or(row.getByText('Connect'))).toBeVisible();
  225 |   });
  226 | 
  227 |   test('LP-DIS-035 | "Configure sync settings" item shows a "Review" action button', async () => {
  228 |     const row = page.getByText('Configure sync settings').locator('..').locator('..');
  229 |     await expect(row.getByText('Review')).toBeVisible();
  230 |   });
  231 | 
  232 |   test('LP-DIS-036 | "Enable automatic sync" item shows an "Enable" action button', async () => {
  233 |     const row = page.getByText('Enable automatic sync').locator('..').locator('..');
  234 |     await expect(row.getByText('Enable')).toBeVisible();
  235 |   });
  236 | 
  237 |   test('LP-DIS-037 | "Finish setup" CTA button is shown at the bottom of the checklist', async () => {
  238 |     await expect(page.getByRole('button', { name: /finish setup/i })
  239 |       .or(page.getByText('Finish setup'))).toBeVisible();
  240 |   });
  241 | 
  242 |   test('LP-DIS-038 | Checklist does NOT show strike-through/completed state for any item', async () => {
  243 |     // No checkmark SVGs should appear — those indicate completion
  244 |     const completedIcons = page.locator('.setup-checklist .completed, [class*="checklist"] .check-done');
  245 |     await expect(completedIcons).toHaveCount(0);
  246 |   });
  247 | 
  248 |   // Connections widget — disconnected state
  249 |   test('LP-DIS-039 | "Connections" heading is visible', async () => {
  250 |     await expect(page.getByText('Connections')).toBeVisible();
  251 |   });
  252 | 
  253 |   test('LP-DIS-040 | QuickBooks shows "Disconnected" status', async () => {
  254 |     const qbBlock = page.getByText('QuickBooks').locator('..').locator('..');
  255 |     await expect(qbBlock.getByText('Disconnected')).toBeVisible();
  256 |   });
  257 | 
  258 |   test('LP-DIS-041 | WooCommerce shows "Disconnected" status', async () => {
  259 |     const wcBlock = page.getByText('WooCommerce').last().locator('..').locator('..');
  260 |     await expect(wcBlock.getByText('Disconnected').first()).toBeVisible();
  261 |   });
  262 | 
  263 |   test('LP-DIS-042 | QuickBooks status dot is NOT green (is red/grey for disconnected)', async () => {
  264 |     const dot = page.locator('.connections-widget, [class*="connections"]')
  265 |       .locator('[class*="disconnected"], [class*="error"], [class*="inactive"]').first();
  266 |     await expect(dot).toBeVisible();
  267 |   });
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
> 294 |     await expect(page.getByRole('link', { name: /manage settings/i })).toBeVisible();
      |                                                                        ^ Error: expect(locator).toBeVisible() failed
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
```