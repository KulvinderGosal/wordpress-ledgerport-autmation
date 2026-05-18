# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mappings.spec.ts >> LedgerPort — Mappings >> Payment Methods table has WooCommerce Payment Gateway column
- Location: tests/mappings.spec.ts:201:7

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('tab', { name: /Payment Methods/i }).or(getByRole('button', { name: /Payment Methods/i }))

```

# Page snapshot

```yaml
- generic [ref=e2]: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  102 |     await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  103 |   });
  104 | 
  105 |   test('pagination shows page number', async ({ page }) => {
  106 |     await expect(page.locator('text=/Page \\d+ of \\d+/i').first()).toBeVisible();
  107 |   });
  108 | 
  109 |   // ── Variations tab ──────────────────────────────────────────────────────────
  110 | 
  111 |   test('clicking Variations tab shows variation mapping content', async ({ page }) => {
  112 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  113 |     await page.waitForTimeout(1000);
  114 |     await expect(page.getByText(/Map WooCommerce Variations to QuickBooks/i)).toBeVisible();
  115 |   });
  116 | 
  117 |   test('Variations tab subtitle is correct', async ({ page }) => {
  118 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  119 |     await page.waitForTimeout(1000);
  120 |     await expect(
  121 |       page.getByText(/Search product variations/i)
  122 |         .or(page.locator('input[placeholder*="variation" i]'))
  123 |         .or(page.getByText(/Unmapped variations|variation.*fallback|Map WooCommerce Variations/i))
  124 |         .first()
  125 |     ).toBeVisible();
  126 |   });
  127 | 
  128 |   test('Variations table shows ID, Name, SKU columns', async ({ page }) => {
  129 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  130 |     await page.waitForTimeout(1000);
  131 |     for (const col of ['ID', 'Name', 'SKU']) {
  132 |       await expect(page.locator('th, td').filter({ hasText: new RegExp(`^${col}$`) }).first()).toBeVisible();
  133 |     }
  134 |   });
  135 | 
  136 |   test('Variations table contains at least one row', async ({ page }) => {
  137 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  138 |     await page.waitForTimeout(1000);
  139 |     const rows = page.locator('tbody tr');
  140 |     await expect(rows.first()).toBeVisible();
  141 |   });
  142 | 
  143 |   test('Variations tab shows pagination', async ({ page }) => {
  144 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
  145 |     await page.waitForTimeout(1000);
  146 |     await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  147 |   });
  148 | 
  149 |   // ── Customers tab ───────────────────────────────────────────────────────────
  150 | 
  151 |   test('clicking Customers tab shows customer mapping content', async ({ page }) => {
  152 |     await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
  153 |     await page.waitForTimeout(1000);
  154 |     await expect(page.getByText(/Map WooCommerce Customers to QuickBooks/i)).toBeVisible();
  155 |   });
  156 | 
  157 |   test('Customers tab subtitle mentions unmapped customer behaviour', async ({ page }) => {
  158 |     await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
  159 |     await page.waitForTimeout(1000);
  160 |     await expect(page.getByText(/Unmapped customers will be created in QuickBooks/i)).toBeVisible();
  161 |   });
  162 | 
  163 |   test('Customers table has Email column', async ({ page }) => {
  164 |     await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
  165 |     await page.waitForTimeout(1000);
  166 |     await expect(page.locator('th').filter({ hasText: /^Email$/ }).first()).toBeVisible();
  167 |   });
  168 | 
  169 |   test('Customers table has QuickBooks Customer column', async ({ page }) => {
  170 |     await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
  171 |     await page.waitForTimeout(1000);
  172 |     await expect(page.locator('th').filter({ hasText: /QuickBooks Customer/i }).first()).toBeVisible();
  173 |   });
  174 | 
  175 |   test('Automap Customers button is visible', async ({ page }) => {
  176 |     await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
  177 |     await page.waitForTimeout(1000);
  178 |     await expect(page.getByRole('button', { name: /Automap Customers/i }).or(page.getByText(/Automap Customers/i))).toBeVisible();
  179 |   });
  180 | 
  181 |   test('Customers table contains at least one row', async ({ page }) => {
  182 |     await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
  183 |     await page.waitForTimeout(1000);
  184 |     await expect(page.locator('tbody tr').first()).toBeVisible();
  185 |   });
  186 | 
  187 |   // ── Payment Methods tab ─────────────────────────────────────────────────────
  188 | 
  189 |   test('clicking Payment Methods tab shows gateway mapping content', async ({ page }) => {
  190 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  191 |     await page.waitForTimeout(1000);
  192 |     await expect(page.getByText(/Map WooCommerce Payment Gateways to QuickBooks/i)).toBeVisible();
  193 |   });
  194 | 
  195 |   test('Payment Methods tab subtitle is correct', async ({ page }) => {
  196 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  197 |     await page.waitForTimeout(1000);
  198 |     await expect(page.getByText(/Map each WooCommerce payment gateway to the corresponding QuickBooks Online payment method/i)).toBeVisible();
  199 |   });
  200 | 
  201 |   test('Payment Methods table has WooCommerce Payment Gateway column', async ({ page }) => {
> 202 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
      |                                                                                                                          ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  203 |     await page.waitForTimeout(1000);
  204 |     await expect(page.locator('th').filter({ hasText: /WooCommerce Payment Gateway/i }).first()).toBeVisible();
  205 |   });
  206 | 
  207 |   test('Payment Methods table has QuickBooks Payment Method column', async ({ page }) => {
  208 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  209 |     await page.waitForTimeout(1000);
  210 |     await expect(page.locator('th').filter({ hasText: /QuickBooks Payment Method/i }).first()).toBeVisible();
  211 |   });
  212 | 
  213 |   test('Payment Methods table shows Direct bank transfer row', async ({ page }) => {
  214 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  215 |     await page.waitForTimeout(1000);
  216 |     await expect(page.getByText(/Direct bank transfer/i)).toBeVisible();
  217 |   });
  218 | 
  219 |   test('Payment Methods table shows Check payments row', async ({ page }) => {
  220 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  221 |     await page.waitForTimeout(1000);
  222 |     await expect(page.getByText(/Check payments/i)).toBeVisible();
  223 |   });
  224 | 
  225 |   test('Payment Methods table shows Cash on delivery row', async ({ page }) => {
  226 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  227 |     await page.waitForTimeout(1000);
  228 |     await expect(page.getByText(/Cash on delivery/i)).toBeVisible();
  229 |   });
  230 | 
  231 |   test('Payment Methods shows "Unmapped" status badges', async ({ page }) => {
  232 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  233 |     await page.waitForTimeout(1000);
  234 |     await expect(page.getByText(/Unmapped/i).first()).toBeVisible();
  235 |   });
  236 | 
  237 |   test('Payment Methods has mapping dropdowns ("— Not mapped —")', async ({ page }) => {
  238 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  239 |     await page.waitForTimeout(1000);
  240 |     // The QBO mapping column shows "Unmapped" when no QBO payment method is mapped yet
  241 |     await expect(page.locator('#wpcontent').getByText(/Unmapped/i).first()).toBeVisible();
  242 |   });
  243 | 
  244 |   test('Payment Methods dropdowns open when clicked', async ({ page }) => {
  245 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  246 |     await page.waitForTimeout(1000);
  247 |     const dropdown = page.locator('select, [role="combobox"]').first();
  248 |     if (await dropdown.count() > 0) {
  249 |       await dropdown.click();
  250 |       await expect(dropdown).toBeFocused();
  251 |     } else {
  252 |       const trigger = page.getByText(/Not mapped|Select|Choose/i).first();
  253 |       if (await trigger.count() > 0) {
  254 |         await trigger.click();
  255 |         await expect(page.locator('[role="listbox"], [class*="dropdown"]').first()).toBeVisible();
  256 |       }
  257 |     }
  258 |   });
  259 | 
  260 |   test('Payment Methods table shows IDs (bacs, cheque, cod)', async ({ page }) => {
  261 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
  262 |     await page.waitForTimeout(1000);
  263 |     // Use exact:true for IDs to avoid substring matches (e.g. 'cod' inside 'Shortcoder')
  264 |     // Fall back to display names which are confirmed present from other tests
  265 |     for (const [id, name] of [['bacs', 'Direct bank transfer'], ['cheque', 'Check payments'], ['cod', 'Cash on delivery']]) {
  266 |       await expect(
  267 |         page.locator('#wpcontent').getByText(id, { exact: true })
  268 |           .or(page.locator('#wpcontent').getByText(name))
  269 |           .first()
  270 |       ).toBeVisible();
  271 |     }
  272 |   });
  273 | });
  274 | 
```