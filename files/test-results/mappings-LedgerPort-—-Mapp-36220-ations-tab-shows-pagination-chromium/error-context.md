# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mappings.spec.ts >> LedgerPort — Mappings >> Variations tab shows pagination
- Location: tests/mappings.spec.ts:143:7

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('tab', { name: /Variations/i }).or(getByRole('button', { name: /Variations/i }))

```

# Page snapshot

```yaml
- generic [ref=e2]: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  44  |   });
  45  | 
  46  |   // ── Products tab ────────────────────────────────────────────────────────────
  47  | 
  48  |   test('Products tab heading is correct', async ({ page }) => {
  49  |     await expect(page.getByText(/Map WooCommerce Products to QuickBooks/i)).toBeVisible();
  50  |   });
  51  | 
  52  |   test('Products tab shows descriptive subtitle', async ({ page }) => {
  53  |     await expect(page.getByText(/Unmapped products use the default fallback/i)).toBeVisible();
  54  |   });
  55  | 
  56  |   test('Products table has ID column', async ({ page }) => {
  57  |     await expect(page.locator('th, td').filter({ hasText: /^ID$/ }).first()).toBeVisible();
  58  |   });
  59  | 
  60  |   test('Products table has Name column', async ({ page }) => {
  61  |     await expect(page.locator('th, td').filter({ hasText: /^Name$/ }).first()).toBeVisible();
  62  |   });
  63  | 
  64  |   test('Products table has SKU column', async ({ page }) => {
  65  |     await expect(page.locator('th, td').filter({ hasText: /^SKU$/ }).first()).toBeVisible();
  66  |   });
  67  | 
  68  |   test('Products section references WooCommerce', async ({ page }) => {
  69  |     await expect(page.locator('#wpcontent').getByText(/WooCommerce/i).first()).toBeVisible();
  70  |   });
  71  | 
  72  |   test('Products table has QuickBooks Product column', async ({ page }) => {
  73  |     await expect(page.locator('th').filter({ hasText: /QuickBooks Product/i }).first()).toBeVisible();
  74  |   });
  75  | 
  76  |   test('Products table has Status column', async ({ page }) => {
  77  |     await expect(page.locator('th').filter({ hasText: /^Status$/i }).first()).toBeVisible();
  78  |   });
  79  | 
  80  |   test('Products table contains at least one row', async ({ page }) => {
  81  |     const rows = page.locator('tbody tr');
  82  |     await expect(rows.first()).toBeVisible();
  83  |   });
  84  | 
  85  |   test('Products table shows Mapped status', async ({ page }) => {
  86  |     await expect(page.getByText(/Mapped/i).first()).toBeVisible();
  87  |   });
  88  | 
  89  |   test('Filter button is visible on Products tab', async ({ page }) => {
  90  |     await expect(page.getByRole('button', { name: /Filter/i }).first()).toBeVisible();
  91  |   });
  92  | 
  93  |   test('Refresh WooCommerce button is visible', async ({ page }) => {
  94  |     await expect(page.getByRole('button', { name: /Refresh WooCommerce/i }).or(page.getByText(/refresh WooCommerce/i))).toBeVisible();
  95  |   });
  96  | 
  97  |   test('Automap Products button is visible', async ({ page }) => {
  98  |     await expect(page.getByRole('button', { name: /Automap Products/i }).or(page.getByText(/Automap Products/i))).toBeVisible();
  99  |   });
  100 | 
  101 |   test('pagination shows total product count', async ({ page }) => {
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
> 144 |     await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
      |                                                                                                                ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
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
  202 |     await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
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
```