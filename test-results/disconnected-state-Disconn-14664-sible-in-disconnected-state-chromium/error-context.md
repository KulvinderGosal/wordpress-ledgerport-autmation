# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Dashboard >> LP-DIS-019 | "Review issues →" link is still visible in disconnected state
- Location: tests/disconnected-state.spec.ts:150:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /review issues/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /review issues/i })

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
  51  |   await expect(page.getByText('One-click connection — sign in with your LedgerPort account')).toBeVisible();
  52  |   await expect(page.getByText('Real-time sync as orders, products, and customers change')).toBeVisible();
  53  |   await expect(page.getByText('Keep QuickBooks accurate without re-typing data')).toBeVisible();
  54  |   await expect(page.getByText('Secure connection — we never see your QuickBooks login')).toBeVisible();
  55  | }
  56  | 
  57  | // ─────────────────────────────────────────────────────────────────────────────
  58  | // 1. DASHBOARD — Disconnected State
  59  | // ─────────────────────────────────────────────────────────────────────────────
  60  | 
  61  | test.describe('Disconnected State — Dashboard', () => {
  62  |   test.beforeEach(async () => {
  63  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  64  |   });
  65  | 
  66  |   // Page structure
  67  |   test('LP-DIS-001 | Dashboard page loads without redirect to login', async () => {
  68  |     expect(page.url()).toContain('page=ledgerport');
  69  |     expect(page.url()).not.toContain('wp-login');
  70  |   });
  71  | 
  72  |   test('LP-DIS-002 | Page title is "Dashboard"', async () => {
  73  |     await expect(page).toHaveTitle(/Dashboard/i);
  74  |   });
  75  | 
  76  |   test('LP-DIS-003 | "Overview" heading is visible', async () => {
  77  |     await expect(page.getByRole('heading', { name: /overview/i })).toBeVisible();
  78  |   });
  79  | 
  80  |   test('LP-DIS-004 | Sub-heading copy is correct', async () => {
  81  |     await expect(page.getByText('Sync health, recent activity, and what needs your attention.')).toBeVisible();
  82  |   });
  83  | 
  84  |   // Connect banner
  85  |   test('LP-DIS-005 | "Connect your store to start syncing" banner is shown on Dashboard', async () => {
  86  |     await assertConnectBanner(page);
  87  |   });
  88  | 
  89  |   test('LP-DIS-006 | Banner "Connect your store" CTA button is visible and enabled', async () => {
  90  |     const btn = page.getByRole('button', { name: /connect your store/i }).first();
  91  |     await expect(btn).toBeVisible();
  92  |     await expect(btn).toBeEnabled();
  93  |   });
  94  | 
  95  |   test('LP-DIS-007 | Banner "Connect your store" button has at least one icon per feature row', async () => {
  96  |     // 4 feature rows each have an icon (svg/img)
  97  |     const bannerIcons = page.locator('.connect-banner svg, .connect-banner img')
  98  |       .or(page.getByText('Connect your store to start syncing').locator('..').locator('..').locator('svg, img'));
  99  |     const count = await bannerIcons.count();
  100 |     expect(count).toBeGreaterThanOrEqual(4);
  101 |   });
  102 | 
  103 |   // Sync Health card — zero state
  104 |   test('LP-DIS-008 | Sync Health card shows "0% success rate" when disconnected', async () => {
  105 |     await expect(page.getByText('0% success rate')).toBeVisible();
  106 |   });
  107 | 
  108 |   test('LP-DIS-009 | Sync Health card shows "0 total syncs"', async () => {
  109 |     await expect(page.getByText('0 total syncs')).toBeVisible();
  110 |   });
  111 | 
  112 |   test('LP-DIS-010 | "SYNC HEALTH" label is present', async () => {
  113 |     await expect(page.getByText('SYNC HEALTH')).toBeVisible();
  114 |   });
  115 | 
  116 |   test('LP-DIS-011 | "View error log →" link is still visible in disconnected state', async () => {
  117 |     await expect(page.getByRole('link', { name: /view error log/i })).toBeVisible();
  118 |   });
  119 | 
  120 |   // Orders card — zero state
  121 |   test('LP-DIS-012 | Orders card shows "0 orders" when disconnected', async () => {
  122 |     await expect(page.getByText('0 orders')).toBeVisible();
  123 |   });
  124 | 
  125 |   test('LP-DIS-013 | Orders card shows "0.0% success rate"', async () => {
  126 |     await expect(page.getByText('0.0% success rate')).toBeVisible();
  127 |   });
  128 | 
  129 |   test('LP-DIS-014 | "ORDERS" label is present in the stats row', async () => {
  130 |     await expect(page.getByText('ORDERS').first()).toBeVisible();
  131 |   });
  132 | 
  133 |   test('LP-DIS-015 | "View report →" link is still visible in disconnected state', async () => {
  134 |     await expect(page.getByRole('link', { name: /view report/i })).toBeVisible();
  135 |   });
  136 | 
  137 |   // Needs Attention card — zero state
  138 |   test('LP-DIS-016 | Needs Attention card shows "0 items" when disconnected', async () => {
  139 |     await expect(page.getByText('0 items')).toBeVisible();
  140 |   });
  141 | 
  142 |   test('LP-DIS-017 | Needs Attention card shows "Nothing needs review" instead of an issue count', async () => {
  143 |     await expect(page.getByText('Nothing needs review')).toBeVisible();
  144 |   });
  145 | 
  146 |   test('LP-DIS-018 | "NEEDS ATTENTION" label is present', async () => {
  147 |     await expect(page.getByText('NEEDS ATTENTION')).toBeVisible();
  148 |   });
  149 | 
  150 |   test('LP-DIS-019 | "Review issues →" link is still visible in disconnected state', async () => {
> 151 |     await expect(page.getByRole('link', { name: /review issues/i })).toBeVisible();
      |                                                                      ^ Error: expect(locator).toBeVisible() failed
  152 |   });
  153 | 
  154 |   // Data Health Overview — blank/skeleton state
  155 |   test('LP-DIS-020 | "Data Health Overview" heading is visible', async () => {
  156 |     await expect(page.getByText('Data Health Overview')).toBeVisible();
  157 |   });
  158 | 
  159 |   test('LP-DIS-021 | Data Health section does NOT show real product/order counts', async () => {
  160 |     // In disconnected state the data health section shows skeleton/blank rows, not numbers
  161 |     const section = page.getByText('Data Health Overview').locator('..').locator('..');
  162 |     // Should NOT contain any status badges like "Healthy", "Critical", "Needs attention"
  163 |     await expect(section.getByText('Healthy')).not.toBeVisible();
  164 |     await expect(section.getByText('Critical')).not.toBeVisible();
  165 |     await expect(section.getByText('Needs attention')).not.toBeVisible();
  166 |   });
  167 | 
  168 |   // Date toolbar
  169 |   test('LP-DIS-022 | "Syncing your store" label is visible', async () => {
  170 |     await expect(page.getByText('Syncing your store')).toBeVisible();
  171 |   });
  172 | 
  173 |   test('LP-DIS-023 | Date range dropdown defaults to "Last 7 days"', async () => {
  174 |     await expect(page.getByText('Last 7 days')).toBeVisible();
  175 |   });
  176 | 
  177 |   test('LP-DIS-024 | A date range is displayed (current week)', async () => {
  178 |     await expect(page.getByText(/\w+ \d+, \d{4}\s*[–-]\s*\w+ \d+, \d{4}/)).toBeVisible();
  179 |   });
  180 | 
  181 |   test('LP-DIS-025 | Last sync badge shows "Hasn\'t run yet" when disconnected', async () => {
  182 |     await expect(page.getByText(/hasn't run yet/i)).toBeVisible();
  183 |   });
  184 | 
  185 |   test('LP-DIS-026 | "Sync now" button is visible in disconnected state', async () => {
  186 |     await expect(page.getByRole('button', { name: /sync now/i })).toBeVisible();
  187 |   });
  188 | 
  189 |   test('LP-DIS-027 | "Sync now" button is enabled (not disabled) in disconnected state', async () => {
  190 |     // Plugin renders it as clickable — may show an error/noop on click but should not be disabled
  191 |     await expect(page.getByRole('button', { name: /sync now/i })).toBeEnabled();
  192 |   });
  193 | 
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
```