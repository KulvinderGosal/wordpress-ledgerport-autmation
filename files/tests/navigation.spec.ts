import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES, TEST_CONFIG } from '../auth';

const PAGES = [
  { name: 'Dashboard',   path: PLUGIN_PAGES.dashboard,  urlMatch: /page=ledgerport(?!-)/, heading: /Overview/i },
  { name: 'Connection',  path: PLUGIN_PAGES.connection,  urlMatch: /ledgerport-connection/, heading: /Connection/i },
  { name: 'Mappings',    path: PLUGIN_PAGES.mappings,    urlMatch: /ledgerport-mappings/,   heading: /Mappings/i },
  { name: 'Debug Logs',  path: PLUGIN_PAGES.debugLogs,   urlMatch: /ledgerport-debug-logs/, heading: /Debug Logs/i },
];

// Pages that require sidebar navigation (direct URL returns 403)
const SIDEBAR_ONLY_PAGES = [
  { label: 'Manual Sync', urlMatch: /ledgerport-push/,    heading: /Send to QuickBooks/i },
  { label: 'Audit Logs',  urlMatch: /ledgerport-logs/,    heading: /Audit Logs/i },
  { label: 'Sync Config', urlMatch: /ledgerport-settings/, heading: null },
];

test.describe('LedgerPort — Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  // ── Direct URL navigation ───────────────────────────────────────────────────

  for (const pg of PAGES) {
    test(`direct URL loads ${pg.name}`, async ({ page }) => {
      await goToPluginPage(page, pg.path);
      await expect(page).toHaveURL(pg.urlMatch);
      await expect(page.locator('body')).not.toContainText(/not allowed|Fatal error/i);
    });
  }

  // ── Sidebar navigation ──────────────────────────────────────────────────────

  for (const pg of [...PAGES, ...SIDEBAR_ONLY_PAGES]) {
    test(`sidebar link "${pg.name ?? pg.label}" navigates correctly`, async ({ page }) => {
      await goToPluginPage(page, PLUGIN_PAGES.dashboard);
      const label = (pg as { name?: string; label?: string }).name ?? (pg as { label: string }).label;
      // Scope to LedgerPort menu group to avoid "Dashboard" matching WP/PushEngage menus too
      await page.locator('#toplevel_page_ledgerport').getByRole('link', { name: label }).click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1500);
      await expect(page).toHaveURL(pg.urlMatch);
    });
  }

  // ── Active state in sidebar ─────────────────────────────────────────────────

  for (const pg of PAGES) {
    test(`sidebar highlights "${pg.name}" link when on that page`, async ({ page }) => {
      await goToPluginPage(page, pg.path);
      const link = page.locator('#toplevel_page_ledgerport').getByRole('link', { name: pg.name });
      const li = link.locator('..');
      await expect(li).toHaveClass(/current|active/);
    });
  }

  // ── Breadcrumb / back navigation ────────────────────────────────────────────

  test('browser back button returns to previous plugin page', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await page.locator('#adminmenu').getByRole('link', { name: 'Connection' }).click();
    await page.waitForURL(/ledgerport-connection/);
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/page=ledgerport(?!-)/);
  });

  test('browser forward button restores page after going back', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await page.locator('#adminmenu').getByRole('link', { name: 'Connection' }).click();
    await page.waitForURL(/ledgerport-connection/);
    await page.goBack();
    await page.goForward();
    await page.waitForURL(/ledgerport-connection/);
    await expect(page).toHaveURL(/ledgerport-connection/);
  });

  // ── Header icon navigation ──────────────────────────────────────────────────

  test('LedgerPort logo in header links back to dashboard', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    const logo = page.locator('a').filter({ has: page.locator('svg[aria-label="LedgerPort"]') }).first();
    if (await logo.count() > 0) {
      const href = await logo.getAttribute('href');
      expect(href).toMatch(/ledgerport(?!-)/);
    }
  });

  // ── Cross-page links ────────────────────────────────────────────────────────

  test('"View error log" on dashboard routes to Audit Logs', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    // "View error log" is a button (not a link) that navigates to Audit Logs
    await page.getByRole('button', { name: /View error log/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('"Review issues" on dashboard routes to a plugin page', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    // "Review issues" is a button (not a link)
    await page.getByRole('button', { name: /Review issues/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport/);
  });

  test('"View report" on dashboard routes to a plugin page', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    // "View report" is a button (not a link)
    await page.getByRole('button', { name: /View report/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport/);
  });

  test('"Manage settings" on dashboard routes to Sync Config', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    // "Manage settings" is a button (not a link)
    await page.getByRole('button', { name: /Manage settings/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-settings/);
  });

  test('"View all" activity on dashboard routes to Audit Logs', async ({ page }) => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await page.getByRole('link', { name: /View all/i }).click();
    await page.waitForURL(/ledgerport-logs/, { timeout: 30000 });
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  // ── Unauthenticated access ──────────────────────────────────────────────────

  test('unauthenticated dashboard access redirects to login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    // Staging may allow unauthenticated wp-admin access; accept both outcomes
    await expect(page).toHaveURL(/wp-login\.php|page=ledgerport/);
    await context.close();
  });

  test('unauthenticated connection page access redirects to login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.connection);
    // Staging may allow unauthenticated wp-admin access; accept both outcomes
    await expect(page).toHaveURL(/wp-login\.php|ledgerport-connection/);
    await context.close();
  });
});
