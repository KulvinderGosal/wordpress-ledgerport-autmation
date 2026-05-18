# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> LedgerPort — Dashboard >> "Connect WooCommerce" checklist item is present
- Location: tests/dashboard.spec.ts:214:7

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
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
            - link "Updates 1" [ref=e16] [cursor=pointer]:
              - /url: update-core.php
              - text: Updates
              - generic [ref=e17]: "1"
      - listitem [ref=e18]:
        - link "LedgerPort WooCommerce Sync" [ref=e19] [cursor=pointer]:
          - /url: admin.php?page=ledgerport
          - generic [ref=e21]:
            - text: LedgerPort
            - text: WooCommerce Sync
        - list [ref=e22]:
          - listitem [ref=e23]:
            - link "Dashboard" [ref=e24] [cursor=pointer]:
              - /url: admin.php?page=ledgerport
          - listitem [ref=e25]:
            - link "Connection" [ref=e26] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-connection
          - listitem
          - listitem [ref=e27]:
            - link "Mappings" [ref=e28] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-mappings
          - listitem [ref=e29]:
            - link "Manual Sync" [ref=e30] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-push
          - listitem [ref=e31]:
            - link "Audit Logs" [ref=e32] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-logs
          - listitem [ref=e33]:
            - link "Sync Config" [ref=e34] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-settings
          - listitem [ref=e35]:
            - link "Debug Logs" [ref=e36] [cursor=pointer]:
              - /url: admin.php?page=ledgerport-debug-logs
      - listitem [ref=e37]
      - listitem [ref=e39]:
        - link "Posts" [ref=e40] [cursor=pointer]:
          - /url: edit.php
          - generic [ref=e41]: 
          - generic [ref=e42]: Posts
        - list [ref=e43]:
          - listitem [ref=e44]:
            - link "All Posts" [ref=e45] [cursor=pointer]:
              - /url: edit.php
          - listitem [ref=e46]:
            - link "Add Post" [ref=e47] [cursor=pointer]:
              - /url: post-new.php
          - listitem [ref=e48]:
            - link "Categories" [ref=e49] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=category
          - listitem [ref=e50]:
            - link "Tags" [ref=e51] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=post_tag
      - listitem [ref=e52]:
        - link "Media" [ref=e53] [cursor=pointer]:
          - /url: upload.php
          - generic [ref=e54]: 
          - generic [ref=e55]: Media
        - list [ref=e56]:
          - listitem [ref=e57]:
            - link "Library" [ref=e58] [cursor=pointer]:
              - /url: upload.php
          - listitem [ref=e59]:
            - link "Add Media File" [ref=e60] [cursor=pointer]:
              - /url: media-new.php
      - listitem [ref=e61]:
        - link "Pages" [ref=e62] [cursor=pointer]:
          - /url: edit.php?post_type=page
          - generic [ref=e63]: 
          - generic [ref=e64]: Pages
        - list [ref=e65]:
          - listitem [ref=e66]:
            - link "All Pages" [ref=e67] [cursor=pointer]:
              - /url: edit.php?post_type=page
          - listitem [ref=e68]:
            - link "Add Page" [ref=e69] [cursor=pointer]:
              - /url: post-new.php?post_type=page
      - listitem [ref=e70]:
        - link "Comments 16 Comments in moderation" [ref=e71] [cursor=pointer]:
          - /url: edit-comments.php
          - generic [ref=e72]: 
          - generic [ref=e73]:
            - text: Comments
            - generic [ref=e74]:
              - text: "16"
              - generic [ref=e75]: 16 Comments in moderation
      - listitem [ref=e76]:
        - link "Shortcoder" [ref=e77] [cursor=pointer]:
          - /url: edit.php?post_type=shortcoder
          - generic [ref=e78]: 
          - generic [ref=e79]: Shortcoder
        - list [ref=e80]:
          - listitem [ref=e81]:
            - link "All Shortcodes" [ref=e82] [cursor=pointer]:
              - /url: edit.php?post_type=shortcoder
          - listitem [ref=e83]:
            - link "Create shortcode" [ref=e84] [cursor=pointer]:
              - /url: post-new.php?post_type=shortcoder
          - listitem [ref=e85]:
            - link "Tags" [ref=e86] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=sc_tag&post_type=shortcoder
          - listitem [ref=e87]:
            - link "Settings" [ref=e88] [cursor=pointer]:
              - /url: edit.php?post_type=shortcoder&page=settings
          - listitem [ref=e89]:
            - link "Upgrade to PRO" [ref=e90] [cursor=pointer]:
              - /url: https://www.aakashweb.com/wordpress-plugins/shortcoder/?utm_source=admin&utm_medium=menu&utm_campaign=sc-pro#pro
      - listitem [ref=e91]
      - listitem [ref=e93]:
        - link "WooCommerce" [ref=e94] [cursor=pointer]:
          - /url: admin.php?page=wc-admin
          - generic [ref=e96]: WooCommerce
        - list [ref=e97]:
          - listitem [ref=e98]:
            - link "Home" [ref=e99] [cursor=pointer]:
              - /url: admin.php?page=wc-admin
          - listitem [ref=e100]:
            - link "Orders 112" [ref=e101] [cursor=pointer]:
              - /url: admin.php?page=wc-orders
              - text: Orders
              - generic [ref=e102]: "112"
          - listitem [ref=e103]:
            - link "Customers" [ref=e104] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/customers
          - listitem [ref=e105]:
            - link "Coupons" [ref=e106] [cursor=pointer]:
              - /url: admin.php?page=coupons-moved
          - listitem [ref=e107]:
            - link "Reports" [ref=e108] [cursor=pointer]:
              - /url: admin.php?page=wc-reports
          - listitem [ref=e109]:
            - link "Settings" [ref=e110] [cursor=pointer]:
              - /url: admin.php?page=wc-settings
          - listitem [ref=e111]:
            - link "Status" [ref=e112] [cursor=pointer]:
              - /url: admin.php?page=wc-status
          - listitem [ref=e113]:
            - link "Extensions 1" [ref=e114] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/extensions
              - text: Extensions
              - generic [ref=e115]: "1"
      - listitem [ref=e116]:
        - link "Products" [ref=e117] [cursor=pointer]:
          - /url: edit.php?post_type=product
          - generic [ref=e118]: 
          - generic [ref=e119]: Products
        - list [ref=e120]:
          - listitem [ref=e121]:
            - link "All Products" [ref=e122] [cursor=pointer]:
              - /url: edit.php?post_type=product
          - listitem [ref=e123]:
            - link "Add new product" [ref=e124] [cursor=pointer]:
              - /url: post-new.php?post_type=product
          - listitem [ref=e125]:
            - link "Brands" [ref=e126] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=product_brand&post_type=product
          - listitem [ref=e127]:
            - link "Categories" [ref=e128] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=product_cat&post_type=product
          - listitem [ref=e129]:
            - link "Tags" [ref=e130] [cursor=pointer]:
              - /url: edit-tags.php?taxonomy=product_tag&post_type=product
          - listitem [ref=e131]:
            - link "Attributes" [ref=e132] [cursor=pointer]:
              - /url: edit.php?post_type=product&page=product_attributes
          - listitem [ref=e133]:
            - link "Reviews" [ref=e134] [cursor=pointer]:
              - /url: edit.php?post_type=product&page=product-reviews
      - listitem [ref=e135]:
        - link "Payments" [ref=e136] [cursor=pointer]:
          - /url: admin.php?page=wc-settings&tab=checkout&from=PAYMENTS_MENU_ITEM
          - generic [ref=e138]: Payments
      - listitem [ref=e139]:
        - link "Analytics" [ref=e140] [cursor=pointer]:
          - /url: admin.php?page=wc-admin&path=/analytics/overview
          - generic [ref=e141]: 
          - generic [ref=e142]: Analytics
        - list [ref=e143]:
          - listitem [ref=e144]:
            - link "Overview" [ref=e145] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/overview
          - listitem [ref=e146]:
            - link "Products" [ref=e147] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/products
          - listitem [ref=e148]:
            - link "Revenue" [ref=e149] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/revenue
          - listitem [ref=e150]:
            - link "Orders" [ref=e151] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/orders
          - listitem [ref=e152]:
            - link "Variations" [ref=e153] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/variations
          - listitem [ref=e154]:
            - link "Categories" [ref=e155] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/categories
          - listitem [ref=e156]:
            - link "Coupons" [ref=e157] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/coupons
          - listitem [ref=e158]:
            - link "Taxes" [ref=e159] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/taxes
          - listitem [ref=e160]:
            - link "Downloads" [ref=e161] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/downloads
          - listitem [ref=e162]:
            - link "Stock" [ref=e163] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/stock
          - listitem [ref=e164]:
            - link "Settings" [ref=e165] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/analytics/settings
      - listitem [ref=e166]:
        - link "Marketing" [ref=e167] [cursor=pointer]:
          - /url: admin.php?page=wc-admin&path=/marketing
          - generic [ref=e168]: 
          - generic [ref=e169]: Marketing
        - list [ref=e170]:
          - listitem [ref=e171]:
            - link "Overview" [ref=e172] [cursor=pointer]:
              - /url: admin.php?page=wc-admin&path=/marketing
          - listitem [ref=e173]:
            - link "Coupons" [ref=e174] [cursor=pointer]:
              - /url: edit.php?post_type=shop_coupon
      - listitem [ref=e175]:
        - link "PushEngage" [ref=e176] [cursor=pointer]:
          - /url: admin.php?page=pushengage#
          - generic [ref=e178]: PushEngage
        - list [ref=e179]:
          - listitem [ref=e180]:
            - link "Dashboard" [ref=e181] [cursor=pointer]:
              - /url: admin.php?page=pushengage#
          - listitem [ref=e182]:
            - link "Push Broadcasts" [ref=e183] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/campaigns/notifications
          - listitem [ref=e184]:
            - link "Drip" [ref=e185] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/automation/drip
          - listitem [ref=e186]:
            - link "Triggers" [ref=e187] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/campaigns/triggers
          - listitem [ref=e188]:
            - link "Design" [ref=e189] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/design
          - listitem [ref=e190]:
            - link "Audience" [ref=e191] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/audience/subscribers
          - listitem [ref=e192]:
            - link "Analytics" [ref=e193] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/analytics
          - listitem [ref=e194]:
            - link "Settings" [ref=e195] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/settings/site-details
          - listitem [ref=e196]:
            - link "WooCommerce" [ref=e197] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/woocommerce/automation
          - listitem [ref=e198]:
            - link "WhatsApp" [ref=e199] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/whatsapp/automation
          - listitem [ref=e200]:
            - link "Chat Widgets NEW!" [ref=e201] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/chat-widgets
          - listitem [ref=e202]:
            - link "About Us" [ref=e203] [cursor=pointer]:
              - /url: admin.php?page=pushengage#/about-us
      - listitem [ref=e204]
      - listitem [ref=e206]:
        - link "Appearance" [ref=e207] [cursor=pointer]:
          - /url: themes.php
          - generic [ref=e208]: 
          - generic [ref=e209]: Appearance
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Themes" [ref=e212] [cursor=pointer]:
              - /url: themes.php
          - listitem [ref=e213]:
            - link "Design" [ref=e214] [cursor=pointer]:
              - /url: site-editor.php
          - listitem [ref=e215]:
            - link "Customize" [ref=e216] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport
          - listitem [ref=e217]:
            - link "Widgets" [ref=e218] [cursor=pointer]:
              - /url: widgets.php
          - listitem [ref=e219]:
            - link "Menus" [ref=e220] [cursor=pointer]:
              - /url: nav-menus.php
          - listitem [ref=e221]:
            - link "Header" [ref=e222] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport&autofocus%5Bcontrol%5D=header_image
          - listitem [ref=e223]:
            - link "Background" [ref=e224] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport&autofocus%5Bcontrol%5D=background_image
          - listitem [ref=e225]:
            - link "Storefront" [ref=e226] [cursor=pointer]:
              - /url: themes.php?page=storefront-welcome
          - listitem
          - listitem
          - listitem [ref=e227]:
            - link "Theme File Editor" [ref=e228] [cursor=pointer]:
              - /url: theme-editor.php
      - listitem [ref=e229]:
        - link "Plugins 1" [ref=e230] [cursor=pointer]:
          - /url: plugins.php
          - generic [ref=e231]: 
          - generic [ref=e232]:
            - text: Plugins
            - generic [ref=e233]: "1"
        - list [ref=e234]:
          - listitem [ref=e235]:
            - link "Installed Plugins" [ref=e236] [cursor=pointer]:
              - /url: plugins.php
          - listitem [ref=e237]:
            - link "Add Plugin" [ref=e238] [cursor=pointer]:
              - /url: plugin-install.php
          - listitem [ref=e239]:
            - link "Plugin File Editor" [ref=e240] [cursor=pointer]:
              - /url: plugin-editor.php
      - listitem [ref=e241]:
        - link "Users" [ref=e242] [cursor=pointer]:
          - /url: users.php
          - generic [ref=e243]: 
          - generic [ref=e244]: Users
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "All Users" [ref=e247] [cursor=pointer]:
              - /url: users.php
          - listitem [ref=e248]:
            - link "Add User" [ref=e249] [cursor=pointer]:
              - /url: user-new.php
          - listitem [ref=e250]:
            - link "Profile" [ref=e251] [cursor=pointer]:
              - /url: profile.php
      - listitem [ref=e252]:
        - link "Tools" [ref=e253] [cursor=pointer]:
          - /url: tools.php
          - generic [ref=e254]: 
          - generic [ref=e255]: Tools
        - list [ref=e256]:
          - listitem [ref=e257]:
            - link "Available Tools" [ref=e258] [cursor=pointer]:
              - /url: tools.php
          - listitem [ref=e259]:
            - link "Import" [ref=e260] [cursor=pointer]:
              - /url: import.php
          - listitem [ref=e261]:
            - link "Export" [ref=e262] [cursor=pointer]:
              - /url: export.php
          - listitem [ref=e263]:
            - link "Site Health 1" [ref=e264] [cursor=pointer]:
              - /url: site-health.php
              - text: Site Health
              - generic [ref=e265]: "1"
          - listitem [ref=e266]:
            - link "Export Personal Data" [ref=e267] [cursor=pointer]:
              - /url: export-personal-data.php
          - listitem [ref=e268]:
            - link "Erase Personal Data" [ref=e269] [cursor=pointer]:
              - /url: erase-personal-data.php
          - listitem [ref=e270]:
            - link "Smooth Generator" [ref=e271] [cursor=pointer]:
              - /url: tools.php?page=smoothgenerator
          - listitem [ref=e272]:
            - link "Scheduled Actions" [ref=e273] [cursor=pointer]:
              - /url: tools.php?page=action-scheduler
      - listitem [ref=e274]:
        - link "Settings" [ref=e275] [cursor=pointer]:
          - /url: options-general.php
          - generic [ref=e276]: 
          - generic [ref=e277]: Settings
        - list [ref=e278]:
          - listitem [ref=e279]:
            - link "General" [ref=e280] [cursor=pointer]:
              - /url: options-general.php
          - listitem [ref=e281]:
            - link "Writing" [ref=e282] [cursor=pointer]:
              - /url: options-writing.php
          - listitem [ref=e283]:
            - link "Reading" [ref=e284] [cursor=pointer]:
              - /url: options-reading.php
          - listitem [ref=e285]:
            - link "Discussion" [ref=e286] [cursor=pointer]:
              - /url: options-discussion.php
          - listitem [ref=e287]:
            - link "Media" [ref=e288] [cursor=pointer]:
              - /url: options-media.php
          - listitem [ref=e289]:
            - link "Permalinks" [ref=e290] [cursor=pointer]:
              - /url: options-permalink.php
          - listitem [ref=e291]:
            - link "Privacy" [ref=e292] [cursor=pointer]:
              - /url: options-privacy.php
      - listitem [ref=e293]:
        - link "Code Snippets" [ref=e294] [cursor=pointer]:
          - /url: admin.php?page=wpcode
          - generic [ref=e296]: Code Snippets
        - list [ref=e297]:
          - listitem [ref=e298]:
            - link "Code Snippets" [ref=e299] [cursor=pointer]:
              - /url: admin.php?page=wpcode
          - listitem [ref=e300]:
            - link "+ Add Snippet" [ref=e301] [cursor=pointer]:
              - /url: admin.php?page=wpcode-snippet-manager
          - listitem [ref=e302]:
            - link "Header & Footer" [ref=e303] [cursor=pointer]:
              - /url: admin.php?page=wpcode-headers-footers
          - listitem [ref=e304]:
            - link "Conversion Pixels" [ref=e305] [cursor=pointer]:
              - /url: admin.php?page=wpcode-pixel
          - listitem [ref=e306]:
            - link "Library" [ref=e307] [cursor=pointer]:
              - /url: admin.php?page=wpcode-library
          - listitem [ref=e308]:
            - link "File Editor" [ref=e309] [cursor=pointer]:
              - /url: admin.php?page=wpcode-file-editor
          - listitem [ref=e310]:
            - link "Search & Replace" [ref=e311] [cursor=pointer]:
              - /url: admin.php?page=wpcode-search-replace
          - listitem [ref=e312]:
            - link "Secure Backups" [ref=e313] [cursor=pointer]:
              - /url: admin.php?page=wpcode-duplicator
          - listitem [ref=e314]:
            - link "Tools" [ref=e315] [cursor=pointer]:
              - /url: admin.php?page=wpcode-tools
          - listitem [ref=e316]:
            - link "Settings" [ref=e317] [cursor=pointer]:
              - /url: admin.php?page=wpcode-settings
      - listitem [ref=e318]:
        - button "Collapse Main menu" [expanded] [ref=e319] [cursor=pointer]:
          - generic [ref=e321]: Collapse Menu
  - generic [ref=e322]:
    - generic [ref=e323]:
      - navigation "Toolbar":
        - menu:
          - group [ref=e324]:
            - menuitem "About WordPress" [ref=e325] [cursor=pointer]:
              - generic [ref=e327]: About WordPress
          - group [ref=e328]:
            - menuitem "QA Staging" [ref=e329] [cursor=pointer]
          - group [ref=e330]:
            - menuitem "Live" [ref=e331] [cursor=pointer]
          - group [ref=e332]:
            - menuitem "WP Adminer" [ref=e333] [cursor=pointer]
          - group [ref=e334]:
            - menuitem "1 update available" [ref=e335] [cursor=pointer]:
              - generic [ref=e337]: "1"
              - generic [ref=e338]: 1 update available
          - group [ref=e339]:
            - menuitem "16 Comments in moderation" [ref=e340] [cursor=pointer]:
              - generic [ref=e342]: "16"
              - generic [ref=e343]: 16 Comments in moderation
          - group [ref=e344]:
            - menuitem "New" [ref=e345] [cursor=pointer]:
              - generic [ref=e347]: New
          - group [ref=e348]:
            - menuitem "WPCode" [ref=e349] [cursor=pointer]
          - group [ref=e350]:
            - menuitem "PushEngage" [ref=e351] [cursor=pointer]: PushEngage
        - menu [ref=e353]:
          - group [ref=e354]:
            - menuitem "Howdy, Kulvinder Singh" [ref=e355] [cursor=pointer]
    - main [ref=e356]:
      - generic [ref=e359]:
        - generic [ref=e360]:
          - generic [ref=e362]:
            - link "LedgerPort" [ref=e363] [cursor=pointer]:
              - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport
              - img "LedgerPort" [ref=e364]:
                - generic [ref=e369]: LedgerPort
            - generic [ref=e370]:
              - button "Notifications" [ref=e371] [cursor=pointer]:
                - img
              - button "Switch to dark mode" [ref=e372] [cursor=pointer]:
                - img
              - button "Help" [ref=e373] [cursor=pointer]:
                - img
          - generic [ref=e376]:
            - heading "Overview" [level=1] [ref=e377]
            - paragraph [ref=e378]: Sync health, recent activity, and what needs your attention.
          - generic [ref=e380]:
            - generic [ref=e381]:
              - generic [ref=e382]:
                - text: Syncing
                - strong [ref=e383]: your store
              - generic [ref=e384]:
                - combobox [ref=e385] [cursor=pointer]:
                  - generic [ref=e386]: Last 7 days
                  - img [ref=e387]
                - button "May 11, 2026 – May 17, 2026" [ref=e389] [cursor=pointer]:
                  - img
                  - generic [ref=e390]: May 11, 2026 – May 17, 2026
            - generic [ref=e391]:
              - generic [ref=e394]: "Last sync: Hasn't run yet"
              - button "Sync now" [ref=e395] [cursor=pointer]:
                - img
                - text: Sync now
        - region "Notifications alt+T"
  - contentinfo [ref=e410]:
    - paragraph [ref=e411]:
      - generic [ref=e413]:
        - text: Thank you for creating with
        - link "WordPress" [ref=e414] [cursor=pointer]:
          - /url: https://wordpress.org/
        - text: .
    - paragraph [ref=e415]: Version 6.9.4
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';
  3   | 
  4   | test.describe('LedgerPort — Dashboard', () => {
> 5   |   test.beforeEach(async ({ page }) => {
      |        ^ Test timeout of 60000ms exceeded while running "beforeEach" hook.
  6   |     await loginAsAdmin(page);
  7   |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  8   |   });
  9   | 
  10  |   // ── Page load & title ───────────────────────────────────────────────────────
  11  | 
  12  |   test('dashboard page loads without errors', async ({ page }) => {
  13  |     await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  14  |   });
  15  | 
  16  |   test('page heading is Overview', async ({ page }) => {
  17  |     await expect(page.getByRole('heading', { name: /Overview/i }).first()).toBeVisible();
  18  |   });
  19  | 
  20  |   test('page subtitle is visible', async ({ page }) => {
  21  |     await expect(page.getByText(/Sync health, recent activity/i)).toBeVisible();
  22  |   });
  23  | 
  24  |   // ── Header ──────────────────────────────────────────────────────────────────
  25  | 
  26  |   test('LedgerPort logo SVG is visible in header', async ({ page }) => {
  27  |     // Logo is an SVG with role="img" and aria-label="LedgerPort"
  28  |     await expect(page.locator('svg[aria-label="LedgerPort"]')).toBeVisible();
  29  |   });
  30  | 
  31  |   test('LedgerPort logo links back to dashboard', async ({ page }) => {
  32  |     const logoLink = page.locator('a[href*="page=ledgerport"]:not([href*="ledgerport-"])').first();
  33  |     await expect(logoLink).toBeVisible();
  34  |   });
  35  | 
  36  |   test('notifications bell icon is visible', async ({ page }) => {
  37  |     await expect(page.locator('button[aria-label="Notifications"]')).toBeVisible();
  38  |   });
  39  | 
  40  |   test('dark/light mode toggle is visible', async ({ page }) => {
  41  |     await expect(page.locator('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]').first()).toBeVisible();
  42  |   });
  43  | 
  44  |   test('help icon is visible', async ({ page }) => {
  45  |     await expect(page.locator('button[aria-label="Help"]')).toBeVisible();
  46  |   });
  47  | 
  48  |   // ── Date filter toolbar ─────────────────────────────────────────────────────
  49  | 
  50  |   test('"Syncing your store" label is visible', async ({ page }) => {
  51  |     await expect(page.getByText(/Syncing.*your store/i)).toBeVisible();
  52  |   });
  53  | 
  54  |   test('date range dropdown shows default "Last 7 days"', async ({ page }) => {
  55  |     await expect(page.getByText(/Last 7 days/i)).toBeVisible();
  56  |   });
  57  | 
  58  |   test('active date range button is displayed', async ({ page }) => {
  59  |     // Date range picker button shows the current date range
  60  |     const rangeBtn = page.locator('button').filter({ hasText: /\w+ \d+, \d{4}/ });
  61  |     await expect(rangeBtn.first()).toBeVisible();
  62  |   });
  63  | 
  64  |   test('"Last sync" badge is visible', async ({ page }) => {
  65  |     await expect(page.getByText(/Last sync:/i)).toBeVisible();
  66  |   });
  67  | 
  68  |   test('green status dot is visible next to last sync', async ({ page }) => {
  69  |     await expect(page.locator('.bg-green-500').first()).toBeVisible();
  70  |   });
  71  | 
  72  |   test('"Sync now" button is visible and enabled', async ({ page }) => {
  73  |     const btn = page.getByRole('button', { name: /Sync now/i });
  74  |     await expect(btn).toBeVisible();
  75  |     await expect(btn).toBeEnabled();
  76  |   });
  77  | 
  78  |   test('date range dropdown opens when clicked', async ({ page }) => {
  79  |     const dropdown = page.locator('button[role="combobox"]').first();
  80  |     await dropdown.click();
  81  |     await expect(page.getByText(/Last 30 days|Last 90 days|This month|Custom/i).first()).toBeVisible();
  82  |     await page.keyboard.press('Escape');
  83  |   });
  84  | 
  85  |   // ── Stat cards ──────────────────────────────────────────────────────────────
  86  | 
  87  |   test('Sync Health card is visible', async ({ page }) => {
  88  |     await expect(page.getByText(/Sync health/i).first()).toBeVisible();
  89  |   });
  90  | 
  91  |   test('Sync Health card shows success rate percentage', async ({ page }) => {
  92  |     await expect(page.locator('text=/\\d+(\\.\\d+)?% success rate/i').first()).toBeVisible();
  93  |   });
  94  | 
  95  |   test('Sync Health card shows total syncs count', async ({ page }) => {
  96  |     await expect(page.locator('text=/\\d+ total syncs/i').first()).toBeVisible();
  97  |   });
  98  | 
  99  |   test('"View error log" button is present on Sync Health card', async ({ page }) => {
  100 |     await expect(page.getByRole('button', { name: /View error log/i })).toBeVisible();
  101 |   });
  102 | 
  103 |   test('"View error log" button navigates to Audit Logs page', async ({ page }) => {
  104 |     await page.getByRole('button', { name: /View error log/i }).click();
  105 |     await page.waitForLoadState('domcontentloaded');
```