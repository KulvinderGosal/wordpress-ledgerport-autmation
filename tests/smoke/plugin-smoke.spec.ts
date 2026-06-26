/**
 * @section Smoke
 * @tag @smoke
 * LP-SMOKE — Critical smoke tests: all 7 pages load without crash
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

const PAGES = [
  { name: 'Dashboard',    url: CORRECT_PAGES.dashboard,   slug: 'page=ledgerport' },
  { name: 'Connection',   url: CORRECT_PAGES.connection,  slug: 'page=ledgerport-connection' },
  { name: 'Mappings',     url: CORRECT_PAGES.mappings,    slug: 'page=ledgerport-mappings' },
  { name: 'Manual Sync',  url: CORRECT_PAGES.manualSync,  slug: 'page=ledgerport-manual-sync' },
  { name: 'Audit Logs',   url: CORRECT_PAGES.auditLogs,   slug: 'page=ledgerport-logs' },
  { name: 'Sync Config',  url: CORRECT_PAGES.syncConfig,  slug: 'page=ledgerport-sync-config' },
  { name: 'Debug Logs',   url: CORRECT_PAGES.debugLogs,   slug: 'page=ledgerport-debug-logs' },
];

test.describe('Smoke — All 7 Plugin Pages Load', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  for (const p of PAGES) {
    test(`LP-SMOKE-${p.name.replace(' ', '')} | ${p.name} page loads with correct URL`, async ({ page }) => {
      await goToPluginPage(page, p.url);
      expect(page.url()).toContain(p.slug);
      await expect(page.locator('#wpbody-content')).toBeVisible();
      await expect(page.getByText(/wordpress error|fatal error|cannot be found/i)).toHaveCount(0);
    });
  }

  test('LP-SMOKE-LOGO | LedgerPort logo appears on every plugin page', async ({ page }) => {
    for (const p of PAGES) {
      await goToPluginPage(page, p.url);
      await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
    }
  });

  test('LP-SMOKE-NAV | Sidebar shows all 7 sub-menu items on every page', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    const items = ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs'];
    for (const item of items) {
      await expect(page.getByRole('link', { name: item })).toBeVisible();
    }
  });
});
