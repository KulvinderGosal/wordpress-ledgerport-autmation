# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: disconnected-state.spec.ts >> Disconnected State — Dashboard >> LP-DIS-027 | "Sync now" button is enabled (not disabled) in disconnected state
- Location: tests/disconnected-state.spec.ts:189:7

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  getByRole('button', { name: /sync now/i })
Expected: enabled
Received: disabled
Timeout:  5000ms

Call log:
  - Expect "toBeEnabled" with timeout 5000ms
  - waiting for getByRole('button', { name: /sync now/i })
    14 × locator resolved to <button disabled class="appearance-none inline-flex !cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold !no-underline transition-colors !outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_a]:!no-underline !border-0 bg-primary text-primary-foregro…>…</button>
       - unexpected value "disabled"

```

```yaml
- button "Sync now" [disabled]
```

# Test source

```ts
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
> 191 |     await expect(page.getByRole('button', { name: /sync now/i })).toBeEnabled();
      |                                                                   ^ Error: expect(locator).toBeEnabled() failed
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
```