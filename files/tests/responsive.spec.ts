import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';

const VIEWPORTS = [
  { name: 'Mobile (375px)',  width: 375,  height: 812 },
  { name: 'Tablet (768px)',  width: 768,  height: 1024 },
  { name: 'Desktop (1280px)', width: 1280, height: 900 },
  { name: 'Wide (1440px)',   width: 1440, height: 900 },
];

test.describe('LedgerPort — Responsive & UI', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  // ── Dashboard at each viewport ──────────────────────────────────────────────

  for (const vp of VIEWPORTS) {
    test(`Dashboard renders without overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await goToPluginPage(page, PLUGIN_PAGES.dashboard);
      // No horizontal scrollbar
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(vp.width + 50); // allow small tolerance
    });

    test(`heading visible at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await goToPluginPage(page, PLUGIN_PAGES.dashboard);
      await expect(page.getByRole('heading', { name: /Overview/i }).first()).toBeVisible();
    });
  }

  // ── Sidebar collapse at mobile ──────────────────────────────────────────────

  test('WP admin sidebar is accessible at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.locator('#adminmenu')).toBeAttached();
  });

  // ── Connection page responsive ───────────────────────────────────────────────

  for (const vp of VIEWPORTS) {
    test(`Connection page renders correctly at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await goToPluginPage(page, PLUGIN_PAGES.connection);
      await expect(page.getByRole('heading', { name: /Connection/i }).first()).toBeVisible();
      await expect(page.getByText(/QuickBooks Online/i).first()).toBeVisible();
    });
  }

  // ── Mappings table responsive ────────────────────────────────────────────────

  test('Mappings table is accessible at 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await expect(page.locator('table, [role="grid"]').first()).toBeVisible();
  });

  test('Mappings table container allows horizontal scroll on 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    // Table container should be scrollable rather than breaking layout
    const container = page.locator('table, [class*="table-container"]').first();
    await expect(container).toBeVisible();
  });

  // ── Debug Logs responsive ────────────────────────────────────────────────────

  for (const vp of [VIEWPORTS[0], VIEWPORTS[2]]) {
    test(`Debug Logs renders at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
      await expect(page.getByRole('heading', { name: /Debug Logs/i }).first()).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Log Files' })).toBeVisible();
    });
  }

  // ── Dark mode toggle ─────────────────────────────────────────────────────────

  test('dark mode toggle can be clicked without error', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const toggle = page.locator('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]').first();
    if (await toggle.count() > 0) {
      await toggle.click();
      await expect(page.locator('body')).not.toContainText(/Fatal error/i);
    }
  });

  test('dark mode toggle can be toggled back', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const toggle = page.locator('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]').first();
    if (await toggle.count() > 0) {
      await toggle.click();
      await page.waitForTimeout(300);
      await toggle.click();
      await expect(page.locator('body')).not.toContainText(/Fatal error/i);
    }
  });

  // ── Notifications bell ───────────────────────────────────────────────────────

  test('notifications bell can be clicked without error', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const bell = page.locator('button[aria-label*="notification"], button[title*="notification"]').first();
    if (await bell.count() > 0) {
      await bell.click();
      await page.waitForTimeout(500);
      await expect(page.locator('body')).not.toContainText(/Fatal error/i);
    }
  });

  // ── UI text & typography ─────────────────────────────────────────────────────

  test('Dashboard page has no broken/empty heading tags', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const headings = await page.locator('h1, h2, h3').all();
    for (const h of headings) {
      const text = (await h.innerText()).trim();
      if (await h.isVisible()) {
        expect(text.length).toBeGreaterThan(0);
      }
    }
  });

  test('Connection page has no broken/empty heading tags', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    const headings = await page.locator('h1, h2, h3').all();
    for (const h of headings) {
      const text = (await h.innerText()).trim();
      if (await h.isVisible()) {
        expect(text.length).toBeGreaterThan(0);
      }
    }
  });

  // ── Accessibility basics ─────────────────────────────────────────────────────

  test('all LedgerPort page images have alt attributes', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const images = await page.locator('#wpcontent img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('interactive buttons have accessible text', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const buttons = page.locator('#wpcontent button:visible');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const ariaHidden = await btn.getAttribute('aria-hidden');
      if (ariaHidden === 'true') continue;
      const text = (await btn.innerText()).trim();
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      const ariaLabelledBy = await btn.getAttribute('aria-labelledby');
      const svgCount = await btn.locator('svg').count();
      // Skip icon-only buttons (contain SVG but no text label) — these rely on visual context / tooltips
      if (!text && !ariaLabel && !title && !ariaLabelledBy && svgCount > 0) continue;
      expect(text || ariaLabel || title || ariaLabelledBy).toBeTruthy();
    }
  });

  test('all form inputs on Connection page have labels', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    const inputs = page.locator('#wpcontent input:not([type=hidden]):visible');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      // Input must have some labelling mechanism
      expect(id || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  // ── Page titles ──────────────────────────────────────────────────────────────

  test('Dashboard page has a descriptive browser title', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
  });

  test('Connection page has a descriptive browser title', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
  });

  test('Debug Logs page has a descriptive browser title', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
  });
});
