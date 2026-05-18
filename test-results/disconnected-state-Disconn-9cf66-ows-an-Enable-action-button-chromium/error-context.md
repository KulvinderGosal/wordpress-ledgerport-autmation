# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Dashboard >> LP-DIS-036 | "Enable automatic sync" item shows an "Enable" action button
- Location: tests/disconnected-state.spec.ts:232:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Enable automatic sync').locator('..').locator('..').getByText('Enable')
Expected: visible
Error: strict mode violation: getByText('Enable automatic sync').locator('..').locator('..').getByText('Enable') resolved to 2 elements:
    1) <span class="text-sm text-foreground">Enable automatic sync</span> aka getByText('Enable automatic sync')
    2) <button class="appearance-none inline-flex !cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold !no-underline transition-colors !outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_a]:!no-underline !border !border-border/80 bg-card text-foreground !shadow-none hover:…>Enable</button> aka getByRole('button', { name: 'Enable' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Enable automatic sync').locator('..').locator('..').getByText('Enable')

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
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport
          - listitem [ref=e187]:
            - link "Widgets" [ref=e188] [cursor=pointer]:
              - /url: widgets.php
          - listitem [ref=e189]:
            - link "Menus" [ref=e190] [cursor=pointer]:
              - /url: nav-menus.php
          - listitem [ref=e191]:
            - link "Header" [ref=e192] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport&autofocus%5Bcontrol%5D=header_image
          - listitem [ref=e193]:
            - link "Background" [ref=e194] [cursor=pointer]:
              - /url: customize.php?return=%2Fwp-admin%2Fadmin.php%3Fpage%3Dledgerport&autofocus%5Bcontrol%5D=background_image
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
              - heading "Overview" [level=1] [ref=e338]
              - paragraph [ref=e339]: Sync health, recent activity, and what needs your attention.
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
          - generic [ref=e369]:
            - generic [ref=e370]:
              - generic [ref=e371]:
                - generic [ref=e372]:
                  - text: Syncing
                  - strong [ref=e373]: your store
                - generic [ref=e374]:
                  - combobox [ref=e375] [cursor=pointer]:
                    - generic [ref=e376]: Last 7 days
                    - img [ref=e377]
                  - button "May 12, 2026 – May 18, 2026" [ref=e379] [cursor=pointer]:
                    - img
                    - generic [ref=e380]: May 12, 2026 – May 18, 2026
              - generic [ref=e381]:
                - generic [ref=e384]: "Last sync: Hasn't run yet"
                - button "Sync now" [disabled]:
                  - img
                  - text: Sync now
            - generic [ref=e385]:
              - generic [ref=e386]:
                - generic [ref=e388]:
                  - generic [ref=e389]:
                    - paragraph [ref=e390]: Sync health
                    - img [ref=e391]
                  - paragraph [ref=e394]: 0% success rate
                  - paragraph [ref=e395]: 0 total syncs
                  - button "View error log" [ref=e397] [cursor=pointer]:
                    - text: View error log
                    - img [ref=e398]
                - generic [ref=e401]:
                  - generic [ref=e402]:
                    - paragraph [ref=e403]: Orders
                    - img [ref=e404]
                  - paragraph [ref=e408]: 0 orders
                  - paragraph [ref=e409]: 0.0% success rate
                  - button "View report" [ref=e411] [cursor=pointer]:
                    - text: View report
                    - img [ref=e412]
                - generic [ref=e415]:
                  - generic [ref=e416]:
                    - paragraph [ref=e417]: Needs attention
                    - img [ref=e418]
                  - paragraph [ref=e421]: 0 items
                  - paragraph [ref=e422]: Nothing needs review
                  - button "Review issues" [ref=e424] [cursor=pointer]:
                    - text: Review issues
                    - img [ref=e425]
              - generic [ref=e427]:
                - generic [ref=e428]:
                  - heading "Data Health Overview" [level=3] [ref=e431]
                  - generic [ref=e446]:
                    - generic [ref=e447]:
                      - heading "Recent Activity" [level=3] [ref=e448]
                      - link "View all" [ref=e449] [cursor=pointer]:
                        - /url: https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-logs
                    - generic [ref=e451]:
                      - img [ref=e452]
                      - paragraph [ref=e454]: No syncs have run yet. Start a sync to see activity here.
                - generic [ref=e455]:
                  - generic [ref=e456]:
                    - heading "Setup checklist" [level=3] [ref=e458]
                    - generic [ref=e459]:
                      - generic [ref=e460]:
                        - generic [ref=e463]: Connect WooCommerce
                        - button "Connect" [ref=e464] [cursor=pointer]
                      - generic [ref=e465]:
                        - generic [ref=e468]: Connect QuickBooks
                        - button "Connect" [ref=e469] [cursor=pointer]
                      - generic [ref=e470]:
                        - generic [ref=e473]: Configure sync settings
                        - button "Review" [ref=e474] [cursor=pointer]
                      - generic [ref=e475]:
                        - generic [ref=e478]: Enable automatic sync
                        - button "Enable" [ref=e479] [cursor=pointer]
                      - button "Finish setup" [ref=e480] [cursor=pointer]
                  - generic [ref=e481]:
                    - heading "Connections" [level=3] [ref=e483]
                    - generic [ref=e484]:
                      - generic [ref=e485]:
                        - generic [ref=e487]: Q
                        - generic [ref=e488]:
                          - paragraph [ref=e489]: QuickBooks
                          - generic [ref=e492]: Disconnected
                        - button [ref=e493] [cursor=pointer]:
                          - img [ref=e494]
                      - generic [ref=e497]:
                        - generic [ref=e499]: W
                        - generic [ref=e500]:
                          - paragraph [ref=e501]: WooCommerce
                          - generic [ref=e504]: Disconnected
                        - button [ref=e505] [cursor=pointer]:
                          - img [ref=e506]
                  - generic [ref=e509]:
                    - heading "Configuration" [level=3] [ref=e511]
                    - generic [ref=e512]:
                      - generic [ref=e513]:
                        - img [ref=e514]
                        - generic [ref=e517]:
                          - paragraph [ref=e518]: Method
                          - paragraph [ref=e519]: Not configured
                      - generic [ref=e520]:
                        - img [ref=e521]
                        - generic [ref=e524]:
                          - paragraph [ref=e525]: Frequency
                          - paragraph [ref=e526]: Not configured
                      - generic [ref=e527]:
                        - img [ref=e528]
                        - generic [ref=e530]:
                          - paragraph [ref=e531]: Auto sync
                          - paragraph [ref=e532]: Manual
                      - button "Manage settings" [ref=e534] [cursor=pointer]:
                        - text: Manage settings
                        - img [ref=e535]
        - region "Notifications alt+T"
  - contentinfo [ref=e537]:
    - paragraph [ref=e538]:
      - generic [ref=e540]:
        - text: Thank you for creating with
        - link "WordPress" [ref=e541] [cursor=pointer]:
          - /url: https://wordpress.org/
        - text: .
    - paragraph [ref=e542]: Version 6.9.4
```

# Test source

```ts
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
  151 |     await expect(page.getByRole('link', { name: /review issues/i })).toBeVisible();
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
> 234 |     await expect(row.getByText('Enable')).toBeVisible();
      |                                           ^ Error: expect(locator).toBeVisible() failed
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
```