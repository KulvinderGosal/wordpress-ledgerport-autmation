# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Connect CTA Navigation >> LP-DIS-094 | Dashboard "Connect your store" banner CTA navigates to Connection page or OAuth flow
- Location: tests/disconnected-state.spec.ts:578:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: /connect your store/i }).first()

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
> 581 |     await btn.click();
      |               ^ Error: locator.click: Target page, context or browser has been closed
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
  658 |   });
  659 | });
  660 | 
  661 | // ─────────────────────────────────────────────────────────────────────────────
  662 | // 10. CROSS-PAGE: No Connected-State Data Leaking
  663 | // ─────────────────────────────────────────────────────────────────────────────
  664 | 
  665 | test.describe('Disconnected State — No Data Leakage', () => {
  666 |   test('LP-DIS-103 | Dashboard does not show any real order/product/customer counts in stats cards', async () => {
  667 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  668 |     // Stats cards should all be 0 — no real numbers
  669 |     await expect(page.getByText('0% success rate')).toBeVisible();
  670 |     await expect(page.getByText('0 orders')).toBeVisible();
  671 |     await expect(page.getByText('0 items')).toBeVisible();
  672 |     // Should NOT show high numbers like "6 orders", "92%", etc.
  673 |     await expect(page.getByText('92% success rate')).not.toBeVisible();
  674 |     await expect(page.getByText('6 orders')).not.toBeVisible();
  675 |   });
  676 | 
  677 |   test('LP-DIS-104 | Dashboard Recent Activity does not show any historical sync entries', async () => {
  678 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  679 |     await expect(page.getByText(/Synced \d+ orders to QuickBooks/)).not.toBeVisible();
  680 |     await expect(page.getByText(/Updated product mapping/)).not.toBeVisible();
  681 |   });
```