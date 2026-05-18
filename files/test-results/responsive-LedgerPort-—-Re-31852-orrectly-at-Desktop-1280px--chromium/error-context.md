# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.ts >> LedgerPort — Responsive & UI >> Connection page renders correctly at Desktop (1280px)
- Location: tests/responsive.spec.ts:45:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Connection/i }).first()
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('heading', { name: /Connection/i }).first()

```

```yaml
- text: Sorry, you are not allowed to access this page.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';
  3   | 
  4   | const VIEWPORTS = [
  5   |   { name: 'Mobile (375px)',  width: 375,  height: 812 },
  6   |   { name: 'Tablet (768px)',  width: 768,  height: 1024 },
  7   |   { name: 'Desktop (1280px)', width: 1280, height: 900 },
  8   |   { name: 'Wide (1440px)',   width: 1440, height: 900 },
  9   | ];
  10  | 
  11  | test.describe('LedgerPort — Responsive & UI', () => {
  12  |   test.beforeEach(async ({ page }) => {
  13  |     await loginAsAdmin(page);
  14  |   });
  15  | 
  16  |   // ── Dashboard at each viewport ──────────────────────────────────────────────
  17  | 
  18  |   for (const vp of VIEWPORTS) {
  19  |     test(`Dashboard renders without overflow at ${vp.name}`, async ({ page }) => {
  20  |       await page.setViewportSize({ width: vp.width, height: vp.height });
  21  |       await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  22  |       // No horizontal scrollbar
  23  |       const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  24  |       expect(bodyWidth).toBeLessThanOrEqual(vp.width + 50); // allow small tolerance
  25  |     });
  26  | 
  27  |     test(`heading visible at ${vp.name}`, async ({ page }) => {
  28  |       await page.setViewportSize({ width: vp.width, height: vp.height });
  29  |       await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  30  |       await expect(page.getByRole('heading', { name: /Overview/i }).first()).toBeVisible();
  31  |     });
  32  |   }
  33  | 
  34  |   // ── Sidebar collapse at mobile ──────────────────────────────────────────────
  35  | 
  36  |   test('WP admin sidebar is accessible at 768px', async ({ page }) => {
  37  |     await page.setViewportSize({ width: 768, height: 1024 });
  38  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  39  |     await expect(page.locator('#adminmenu')).toBeAttached();
  40  |   });
  41  | 
  42  |   // ── Connection page responsive ───────────────────────────────────────────────
  43  | 
  44  |   for (const vp of VIEWPORTS) {
  45  |     test(`Connection page renders correctly at ${vp.name}`, async ({ page }) => {
  46  |       await page.setViewportSize({ width: vp.width, height: vp.height });
  47  |       await goToPluginPage(page, PLUGIN_PAGES.connection);
> 48  |       await expect(page.getByRole('heading', { name: /Connection/i }).first()).toBeVisible();
      |                                                                                ^ Error: expect(locator).toBeVisible() failed
  49  |       await expect(page.getByText(/QuickBooks Online/i).first()).toBeVisible();
  50  |     });
  51  |   }
  52  | 
  53  |   // ── Mappings table responsive ────────────────────────────────────────────────
  54  | 
  55  |   test('Mappings table is accessible at 1024px', async ({ page }) => {
  56  |     await page.setViewportSize({ width: 1024, height: 768 });
  57  |     await goToPluginPage(page, PLUGIN_PAGES.mappings);
  58  |     await expect(page.locator('table, [role="grid"]').first()).toBeVisible();
  59  |   });
  60  | 
  61  |   test('Mappings table container allows horizontal scroll on 768px', async ({ page }) => {
  62  |     await page.setViewportSize({ width: 768, height: 1024 });
  63  |     await goToPluginPage(page, PLUGIN_PAGES.mappings);
  64  |     // Table container should be scrollable rather than breaking layout
  65  |     const container = page.locator('table, [class*="table-container"]').first();
  66  |     await expect(container).toBeVisible();
  67  |   });
  68  | 
  69  |   // ── Debug Logs responsive ────────────────────────────────────────────────────
  70  | 
  71  |   for (const vp of [VIEWPORTS[0], VIEWPORTS[2]]) {
  72  |     test(`Debug Logs renders at ${vp.name}`, async ({ page }) => {
  73  |       await page.setViewportSize({ width: vp.width, height: vp.height });
  74  |       await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
  75  |       await expect(page.getByRole('heading', { name: /Debug Logs/i }).first()).toBeVisible();
  76  |       await expect(page.getByRole('heading', { name: 'Log Files' })).toBeVisible();
  77  |     });
  78  |   }
  79  | 
  80  |   // ── Dark mode toggle ─────────────────────────────────────────────────────────
  81  | 
  82  |   test('dark mode toggle can be clicked without error', async ({ page }) => {
  83  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  84  |     const toggle = page.locator('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]').first();
  85  |     if (await toggle.count() > 0) {
  86  |       await toggle.click();
  87  |       await expect(page.locator('body')).not.toContainText(/Fatal error/i);
  88  |     }
  89  |   });
  90  | 
  91  |   test('dark mode toggle can be toggled back', async ({ page }) => {
  92  |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  93  |     const toggle = page.locator('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]').first();
  94  |     if (await toggle.count() > 0) {
  95  |       await toggle.click();
  96  |       await page.waitForTimeout(300);
  97  |       await toggle.click();
  98  |       await expect(page.locator('body')).not.toContainText(/Fatal error/i);
  99  |     }
  100 |   });
  101 | 
  102 |   // ── Notifications bell ───────────────────────────────────────────────────────
  103 | 
  104 |   test('notifications bell can be clicked without error', async ({ page }) => {
  105 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  106 |     const bell = page.locator('button[aria-label*="notification"], button[title*="notification"]').first();
  107 |     if (await bell.count() > 0) {
  108 |       await bell.click();
  109 |       await page.waitForTimeout(500);
  110 |       await expect(page.locator('body')).not.toContainText(/Fatal error/i);
  111 |     }
  112 |   });
  113 | 
  114 |   // ── UI text & typography ─────────────────────────────────────────────────────
  115 | 
  116 |   test('Dashboard page has no broken/empty heading tags', async ({ page }) => {
  117 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  118 |     const headings = await page.locator('h1, h2, h3').all();
  119 |     for (const h of headings) {
  120 |       const text = (await h.innerText()).trim();
  121 |       if (await h.isVisible()) {
  122 |         expect(text.length).toBeGreaterThan(0);
  123 |       }
  124 |     }
  125 |   });
  126 | 
  127 |   test('Connection page has no broken/empty heading tags', async ({ page }) => {
  128 |     await goToPluginPage(page, PLUGIN_PAGES.connection);
  129 |     const headings = await page.locator('h1, h2, h3').all();
  130 |     for (const h of headings) {
  131 |       const text = (await h.innerText()).trim();
  132 |       if (await h.isVisible()) {
  133 |         expect(text.length).toBeGreaterThan(0);
  134 |       }
  135 |     }
  136 |   });
  137 | 
  138 |   // ── Accessibility basics ─────────────────────────────────────────────────────
  139 | 
  140 |   test('all LedgerPort page images have alt attributes', async ({ page }) => {
  141 |     await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  142 |     const images = await page.locator('#wpcontent img').all();
  143 |     for (const img of images) {
  144 |       const alt = await img.getAttribute('alt');
  145 |       expect(alt).not.toBeNull();
  146 |     }
  147 |   });
  148 | 
```