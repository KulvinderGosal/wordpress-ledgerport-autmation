# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Mappings Page >> LP-DIS-066 | Variations tab also shows gated state when clicked
- Location: tests/disconnected-state.spec.ts:402:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('Variations') resolved to 3 elements:
    1) <a href="admin.php?page=wc-admin&path=/analytics/variations">Variations</a> aka getByRole('link', { name: 'Variations' })
    2) <p class="mt-1 text-sm text-muted-foreground">Map WooCommerce products, variations, customers, …</p> aka getByText('Map WooCommerce products,')
    3) <button role="tab" type="button" aria-selected="false" class="shrink-0 cursor-pointer !border-0 !bg-transparent px-4 py-5 text-sm !shadow-none transition-colors whitespace-nowrap !outline-none sm:px-5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-normal text-muted-foreground hover:text-foreground">Variations</button> aka getByRole('tab', { name: 'Variations' })

Call log:
  - waiting for getByText('Variations')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation "Main menu":
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#wpbody-content"
    - link "Skip to toolbar" [ref=e4] [cursor=pointer]:
      - /url: "#wp-toolbar"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Dashboard" [ref=e9] [cursor=pointer]:
          - /url: index.php
          - generic [ref=e10]: 
          - generic [ref=e11]: Dashboard
        - list [ref=e12]:
          - listitem [ref=e13]:
            - link "Home" [ref=e14] [cursor=pointer]:
              - /url: index.php
          - listitem [ref=e15]:
            - link "Updates" [ref=e16] [cursor=pointer]:
              - /url: update-core.php
      - listitem [ref=e17]:
        - link "LedgerPort WooCommerce Sync" [ref=e18] [cursor=pointer]:
          - /url: admin.php?page=ledgerport
          - generic [ref=e20]:
            - text: LedgerPort
            - text: WooCommerce Sync
        - list [ref=e21]:
          - listitem [ref=e22]:
            - link "Dashboard" [ref=e23] [cursor=pointer]:
              - /url: admin.php?page=ledgerport
          - listitem [ref=e24]:
            - link "Connection" [ref=e25] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-connection
          - listitem
          - listitem [ref=e26]:
            - link "Mappings" [ref=e27] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-mappings
          - listitem [ref=e28]:
            - link "Manual Sync" [ref=e29] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-push
          - listitem [ref=e30]:
            - link "Audit Logs" [ref=e31] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-logs
          - listitem [ref=e32]:
            - link "Sync Config" [ref=e33] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-settings
          - listitem [ref=e34]:
            - link "Debug Logs" [ref=e35] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-debug-logs
      - listitem [ref=e36]
      - listitem [ref=e38]:
        - link "Posts" [ref=e39] [cursor=pointer]:
          - /url: edit.php
          - generic [ref=e40]: 
          - generic [ref=e41]: Posts
        - list [ref=e42]:
          - listitem [ref=e43]:
            - link "All Posts" [ref=e44] [cursor=pointer]:
              - /url: edit.php
          - listitem [ref=e45]:
            - link "Add Post" [ref=e46] [cursor=pointer]:
              - /url: post-new.php
          - listitem [ref=e47]:
            - link "Categories" [ref=e48] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=category
          - listitem [ref=e49]:
            - link "Tags" [ref=e50] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=post_tag
      - listitem [ref=e51]:
        - link "Media" [ref=e52] [cursor=pointer]:
          - /url: upload.php
          - generic [ref=e53]: 
          - generic [ref=e54]: Media
        - list [ref=e55]:
          - listitem [ref=e56]:
            - link "Library" [ref=e57] [cursor=pointer]:
              - /url: upload.php
          - listitem [ref=e58]:
            - link "Add Media File" [ref=e59] [cursor=pointer]:
              - /url: media-new.php
      - listitem [ref=e60]:
        - link "Pages" [ref=e61] [cursor=pointer]:
          - /url: edit.php?post_type=page
          - generic [ref=e62]: 
          - generic [ref=e63]: Pages
        - list [ref=e64]:
          - listitem [ref=e65]:
            - link "All Pages" [ref=e66] [cursor=pointer]:
              - /url: edit.php?post_type=page
          - listitem [ref=e67]:
            - link "Add Page" [ref=e68] [cursor=pointer]:
              - /url: post-new.php?post_type=page
      - listitem [ref=e69]:
        - link "Comments 11 Comments in moderation" [ref=e70] [cursor=pointer]:
          - /url: edit-comments.php
          - generic [ref=e71]: 
          - generic [ref=e72]:
            - text: Comments
            - generic [ref=e73]:
              - text: "11"
              - generic [ref=e74]: 11 Comments in moderation
      - listitem [ref=e75]:
        - link "Shortcoder" [ref=e76] [cursor=pointer]:
          - /url: edit.php?post_type=shortcoder
          - generic [ref=e77]: 
          - generic [ref=e78]: Shortcoder
        - list [ref=e79]:
          - listitem [ref=e80]:
            - link "All Shortcodes" [ref=e81] [cursor=pointer]:
              - /url: edit.php?post_type=shortcoder
          - listitem [ref=e82]:
            - link "Create shortcode" [ref=e83] [cursor=pointer]:
              - /url: post-new.php?post_type=shortcoder
          - listitem [ref=e84]:
            - link "Tags" [ref=e85] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=sc_tag&post_type=shortcoder
          - listitem [ref=e86]:
            - link "Settings" [ref=e87] [cursor=pointer]:
              - /url: edit.php?post_type=shortcoder&page=settings
          - listitem [ref=e88]:
            - link "Upgrade to PRO" [ref=e89] [cursor=pointer]:
              - /url: https://www.aakashweb.com/wordpress-plugins/shortcoder/?utm_source=admin&utm_medium=menu&utm_campaign=sc-pro#pro
      - listitem [ref=e90]
      - listitem [ref=e92]:
        - link "WooCommerce" [ref=e93] [cursor=pointer]:
          - /url: admin.php?page=wc-admin
          - generic [ref=e95]: WooCommerce
        - list [ref=e96]:
          - listitem [ref=e97]:
            - link "Home" [ref=e98] [cursor=pointer]:
              - /url: admin.php?page=wc-admin
          - listitem [ref=e99]:
            - link "Orders 114" [ref=e100] [cursor=pointer]:
              - /url: admin.php?page=wc-orders
              - text: Orders
              - generic [ref=e101]: "114"
          - listitem [ref=e102]:
            - link "Customers" [ref=e103] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/customers
          - listitem [ref=e104]:
            - link "Coupons" [ref=e105] [cursor=pointer]:
              - /url: admin.php?page=coupons-moved
          - listitem [ref=e106]:
            - link "Reports" [ref=e107] [cursor=pointer]:
              - /url: admin.php?page=wc-reports
          - listitem [ref=e108]:
            - link "Settings" [ref=e109] [cursor=pointer]:
              - /url: admin.php?page=wc-settings
          - listitem [ref=e110]:
            - link "Status" [ref=e111] [cursor=pointer]:
              - /url: admin.php?page=wc-status
          - listitem [ref=e112]:
            - link "Extensions 1" [ref=e113] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/extensions
              - text: Extensions
              - generic [ref=e114]: "1"
      - listitem [ref=e115]:
        - link "Products" [ref=e116] [cursor=pointer]:
          - /url: edit.php?post_type=product
          - generic [ref=e117]: 
          - generic [ref=e118]: Products
        - list [ref=e119]:
          - listitem [ref=e120]:
            - link "All Products" [ref=e121] [cursor=pointer]:
              - /url: edit.php?post_type=product
          - listitem [ref=e122]:
            - link "Add new product" [ref=e123] [cursor=pointer]:
              - /url: post-new.php?post_type=product
          - listitem [ref=e124]:
            - link "Brands" [ref=e125] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=product_brand&post_type=product
          - listitem [ref=e126]:
            - link "Categories" [ref=e127] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=product_cat&post_type=product
          - listitem [ref=e128]:
            - link "Tags" [ref=e129] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=product_tag&post_type=product
          - listitem [ref=e130]:
            - link "Attributes" [ref=e131] [cursor=pointer]:
              - /url: edit.php?post_type=product&page=product_attributes
          - listitem [ref=e132]:
            - link "Reviews" [ref=e133] [cursor=pointer]:
              - /url: edit.php?post_type=product&page=product-reviews
      - listitem [ref=e134]:
        - link "Payments" [ref=e135] [cursor=pointer]:
          - /url: admin.php?page=wc-settings&tab=checkout&from=PAYMENTS_MENU_ITEM
          - generic [ref=e137]: Payments
      - listitem [ref=e138]:
        - link "Analytics" [ref=e139] [cursor=pointer]:
          - /url: admin.php?page=wc-admin&path=/analytics/overview
          - generic [ref=e140]: 
          - generic [ref=e141]: Analytics
        - list [ref=e142]:
          - listitem [ref=e143]:
            - link "Overview" [ref=e144] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/overview
          - listitem [ref=e145]:
            - link "Products" [ref=e146] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/products
          - listitem [ref=e147]:
            - link "Revenue" [ref=e148] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/revenue
          - listitem [ref=e149]:
            - link "Orders" [ref=e150] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/orders
          - listitem [ref=e151]:
            - link "Variations" [ref=e152] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/variations
          - listitem [ref=e153]:
            - link "Categories" [ref=e154] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/categories
          - listitem [ref=e155]:
            - link "Coupons" [ref=e156] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/coupons
          - listitem [ref=e157]:
            - link "Taxes" [ref=e158] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/taxes
          - listitem [ref=e159]:
            - link "Downloads" [ref=e160] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/downloads
          - listitem [ref=e161]:
            - link "Stock" [ref=e162] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/stock
          - listitem [ref=e163]:
            - link "Settings" [ref=e164] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/settings
      - listitem [ref=e165]:
        - link "Marketing" [ref=e166] [cursor=pointer]:
          - /url: admin.php?page=wc-admin&path=/marketing
          - generic [ref=e167]: 
          - generic [ref=e168]: Marketing
        - list [ref=e169]:
          - listitem [ref=e170]:
            - link "Overview" [ref=e171] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/marketing
          - listitem [ref=e172]:
            - link "Coupons" [ref=e173] [cursor=pointer]:
              - /url: edit.php?post_type=shop_coupon
      - listitem [ref=e174]
      - listitem [ref=e176]:
        - link "Appearance" [ref=e177] [cursor=pointer]:
          - /url: themes.php
          - generic [ref=e178]: 
          - generic [ref=e179]: Appearance
        - list [ref=e180]:
          - listitem [ref=e181]:
            - link "Themes" [ref=e182] [cursor=pointer]:
              - /url: themes.php
          - listitem [ref=e183]:
            - link "Design" [ref=e184] [cursor=pointer]:
              - /url: site-editor.php
          - listitem [ref=e185]:
            - link "Customize" [ref=e186] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-mappings
          - listitem [ref=e187]:
            - link "Widgets" [ref=e188] [cursor=pointer]:
              - /url: widgets.php
          - listitem [ref=e189]:
            - link "Menus" [ref=e190] [cursor=pointer]:
              - /url: nav-menus.php
          - listitem [ref=e191]:
            - link "Header" [ref=e192] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-mappings&autofocus%5Bcontrol%5D=header_image
          - listitem [ref=e193]:
            - link "Background" [ref=e194] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport-mappings&autofocus%5Bcontrol%5D=background_image
          - listitem [ref=e195]:
            - link "Storefront" [ref=e196] [cursor=pointer]:
              - /url: themes.php?page=storefront-welcome
          - listitem
          - listitem
          - listitem [ref=e197]:
            - link "Theme File Editor" [ref=e198] [cursor=pointer]:
              - /url: theme-editor.php
      - listitem [ref=e199]:
        - link "Plugins" [ref=e200] [cursor=pointer]:
          - /url: plugins.php
          - generic [ref=e201]: 
          - generic [ref=e202]: Plugins
        - list [ref=e203]:
          - listitem [ref=e204]:
            - link "Installed Plugins" [ref=e205] [cursor=pointer]:
              - /url: plugins.php
          - listitem [ref=e206]:
            - link "Add Plugin" [ref=e207] [cursor=pointer]:
              - /url: plugin-install.php
          - listitem [ref=e208]:
            - link "Plugin File Editor" [ref=e209] [cursor=pointer]:
              - /url: plugin-editor.php
      - listitem [ref=e210]:
        - link "Users" [ref=e211] [cursor=pointer]:
          - /url: users.php
          - generic [ref=e212]: 
          - generic [ref=e213]: Users
        - list [ref=e214]:
          - listitem [ref=e215]:
            - link "All Users" [ref=e216] [cursor=pointer]:
              - /url: users.php
          - listitem [ref=e217]:
            - link "Add User" [ref=e218] [cursor=pointer]:
              - /url: user-new.php
          - listitem [ref=e219]:
            - link "Profile" [ref=e220] [cursor=pointer]:
              - /url: profile.php
      - listitem [ref=e221]:
        - link "Tools" [ref=e222] [cursor=pointer]:
          - /url: tools.php
          - generic [ref=e223]: 
          - generic [ref=e224]: Tools
        - list [ref=e225]:
          - listitem [ref=e226]:
            - link "Available Tools" [ref=e227] [cursor=pointer]:
              - /url: tools.php
          - listitem [ref=e228]:
            - link "Import" [ref=e229] [cursor=pointer]:
              - /url: import.php
          - listitem [ref=e230]:
            - link "Export" [ref=e231] [cursor=pointer]:
              - /url: export.php
          - listitem [ref=e232]:
            - link "Site Health 1" [ref=e233] [cursor=pointer]:
              - /url: site-health.php
              - text: Site Health
              - generic [ref=e234]: "1"
          - listitem [ref=e235]:
            - link "Export Personal Data" [ref=e236] [cursor=pointer]:
              - /url: export-personal-data.php
          - listitem [ref=e237]:
            - link "Erase Personal Data" [ref=e238] [cursor=pointer]:
              - /url: erase-personal-data.php
          - listitem [ref=e239]:
            - link "Smooth Generator" [ref=e240] [cursor=pointer]:
              - /url: tools.php?page=smoothgenerator
          - listitem [ref=e241]:
            - link "Scheduled Actions" [ref=e242] [cursor=pointer]:
              - /url: tools.php?page=action-scheduler
      - listitem [ref=e243]:
        - link "Settings" [ref=e244] [cursor=pointer]:
          - /url: options-general.php
          - generic [ref=e245]: 
          - generic [ref=e246]: Settings
        - list [ref=e247]:
          - listitem [ref=e248]:
            - link "General" [ref=e249] [cursor=pointer]:
              - /url: options-general.php
          - listitem [ref=e250]:
            - link "Writing" [ref=e251] [cursor=pointer]:
              - /url: options-writing.php
          - listitem [ref=e252]:
            - link "Reading" [ref=e253] [cursor=pointer]:
              - /url: options-reading.php
          - listitem [ref=e254]:
            - link "Discussion" [ref=e255] [cursor=pointer]:
              - /url: options-discussion.php
          - listitem [ref=e256]:
            - link "Media" [ref=e257] [cursor=pointer]:
              - /url: options-media.php
          - listitem [ref=e258]:
            - link "Permalinks" [ref=e259] [cursor=pointer]:
              - /url: options-permalink.php
          - listitem [ref=e260]:
            - link "Privacy" [ref=e261] [cursor=pointer]:
              - /url: options-privacy.php
      - listitem [ref=e262]:
        - link "Code Snippets" [ref=e263] [cursor=pointer]:
          - /url: admin.php?page=wpcode
          - generic [ref=e265]: Code Snippets
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Code Snippets" [ref=e268] [cursor=pointer]:
              - /url: admin.php?page=wpcode
          - listitem [ref=e269]:
            - link "+ Add Snippet" [ref=e270] [cursor=pointer]:
              - /url: admin.php?page=wpcode-snippet-manager
          - listitem [ref=e271]:
            - link "Header & Footer" [ref=e272] [cursor=pointer]:
              - /url: admin.php?page=wpcode-headers-footers
          - listitem [ref=e273]:
            - link "Conversion Pixels" [ref=e274] [cursor=pointer]:
              - /url: admin.php?page=wpcode-pixel
          - listitem [ref=e275]:
            - link "Library" [ref=e276] [cursor=pointer]:
              - /url: admin.php?page=wpcode-library
          - listitem [ref=e277]:
            - link "File Editor" [ref=e278] [cursor=pointer]:
              - /url: admin.php?page=wpcode-file-editor
          - listitem [ref=e279]:
            - link "Search & Replace" [ref=e280] [cursor=pointer]:
              - /url: admin.php?page=wpcode-search-replace
          - listitem [ref=e281]:
            - link "Secure Backups" [ref=e282] [cursor=pointer]:
              - /url: admin.php?page=wpcode-duplicator
          - listitem [ref=e283]:
            - link "Tools" [ref=e284] [cursor=pointer]:
              - /url: admin.php?page=wpcode-tools
          - listitem [ref=e285]:
            - link "Settings" [ref=e286] [cursor=pointer]:
              - /url: admin.php?page=wpcode-settings
      - listitem [ref=e287]:
        - button "Collapse Main menu" [expanded] [ref=e288] [cursor=pointer]:
          - generic [ref=e290]: Collapse Menu
  - generic [ref=e291]:
    - generic [ref=e292]:
      - navigation "Toolbar":
        - menu:
          - group [ref=e293]:
            - menuitem "About WordPress" [ref=e294] [cursor=pointer]:
              - generic [ref=e296]: About WordPress
          - group [ref=e297]:
            - menuitem "QA Staging" [ref=e298] [cursor=pointer]
          - group [ref=e299]:
            - menuitem "Live" [ref=e300] [cursor=pointer]
          - group [ref=e301]:
            - menuitem "WP Adminer" [ref=e302] [cursor=pointer]
          - group [ref=e303]:
            - menuitem "11 Comments in moderation" [ref=e304] [cursor=pointer]:
              - generic [ref=e306]: "11"
              - generic [ref=e307]: 11 Comments in moderation
          - group [ref=e308]:
            - menuitem "New" [ref=e309] [cursor=pointer]:
              - generic [ref=e311]: New
          - group [ref=e312]:
            - menuitem "WPCode" [ref=e313] [cursor=pointer]
        - menu [ref=e314]:
          - group [ref=e315]:
            - menuitem "Howdy, Kulvinder Singh" [ref=e316] [cursor=pointer]
    - main [ref=e317]:
      - generic [ref=e320]:
        - generic [ref=e321]:
          - generic [ref=e323]:
            - link "LedgerPort" [ref=e324] [cursor=pointer]:
              - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport
              - img "LedgerPort" [ref=e325]:
                - generic [ref=e330]: LedgerPort
            - generic [ref=e331]:
              - button "Notifications" [ref=e332] [cursor=pointer]:
                - img
              - button "Switch to dark mode" [ref=e333] [cursor=pointer]:
                - img
              - button "Help" [ref=e334] [cursor=pointer]:
                - img
          - generic [ref=e335]:
            - generic [ref=e337]:
              - heading "Mappings" [level=1] [ref=e338]
              - paragraph [ref=e339]: Map WooCommerce products, variations, customers, and payment methods to QuickBooks Online.
            - generic [ref=e343]:
              - generic [ref=e344]:
                - heading "Connect your store to start syncing" [level=3] [ref=e345]
                - paragraph [ref=e346]: Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.
              - list [ref=e347]:
                - listitem [ref=e348]:
                  - img [ref=e349]
                  - generic [ref=e352]: One-click connection — sign in with your LedgerPort account
                - listitem [ref=e353]:
                  - img [ref=e354]
                  - generic [ref=e359]: Real-time sync as orders, products, and customers change
                - listitem [ref=e360]:
                  - img [ref=e361]
                  - generic [ref=e363]: Keep QuickBooks accurate without re-typing data
                - listitem [ref=e364]:
                  - img [ref=e365]
                  - generic [ref=e367]: Secure connection — we never see your QuickBooks login
              - link "Connect your store" [ref=e368] [cursor=pointer]:
                - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-setup-wizard
          - navigation [ref=e371]:
            - generic [ref=e372]:
              - tab "Products" [selected] [ref=e373] [cursor=pointer]
              - tab "Variations" [ref=e374] [cursor=pointer]
              - tab "Customers" [ref=e375] [cursor=pointer]
              - tab "Payment Methods" [ref=e376] [cursor=pointer]
          - generic [ref=e379]:
            - img [ref=e380]
            - generic [ref=e382]:
              - paragraph [ref=e383]: Connect your store to use this feature
              - paragraph [ref=e384]: Once your WooCommerce store is connected to LedgerPort, this section will show you live data.
            - link "Connect your store" [ref=e385] [cursor=pointer]:
              - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-setup-wizard
        - region "Notifications alt+T"
  - contentinfo [ref=e386]:
    - paragraph [ref=e387]:
      - generic [ref=e389]:
        - text: Thank you for creating with
        - link "WordPress" [ref=e390] [cursor=pointer]:
          - /url: https://wordpress.org/
        - text: .
    - paragraph [ref=e391]: Version 6.9.4
```

# Test source

```ts
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
  395 | 
  396 |   test('LP-DIS-065 | Products tab has a second "Connect your store" CTA button inside the gated area', async () => {
  397 |     const ctaBtn = page.getByRole('button', { name: /connect your store/i })
  398 |       .or(page.getByText('Connect your store').last());
  399 |     await expect(ctaBtn).toBeVisible();
  400 |   });
  401 | 
  402 |   test('LP-DIS-066 | Variations tab also shows gated state when clicked', async () => {
> 403 |     await page.getByText('Variations').click();
      |                                        ^ Error: locator.click: Error: strict mode violation: getByText('Variations') resolved to 3 elements:
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
```