/**
 * LedgerPort — Manual Sync, Audit Logs & Sync Config Regression Tests
 * These pages are access-restricted when plugin is disconnected.
 * Tests verify correct restriction behaviour and WP chrome remains intact.
 *
 * LP-MSYNC-001 → LP-MSYNC-020
 * LP-AUDIT-001 → LP-AUDIT-020
 * LP-SCONF-001 → LP-SCONF-020
 */
import { test, expect, Page } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from './helpers/auth';

let page: Page;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  page = await ctx.newPage();
  await loginAsAdmin(page);
});

test.afterAll(async () => { await page.close(); });

// ═══════════════════════════════════════════════════════════════════════════════
// MANUAL SYNC PAGE
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('Manual Sync Page', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.manualSync);
  });

  test.describe('1. Access Control', () => {
    test('LP-MSYNC-001 | Manual Sync URL loads without redirect to login', async () => {
      expect(page.url()).toContain('ledgerport-manual-sync');
      expect(page.url()).not.toContain('wp-login');
    });
    test('LP-MSYNC-002 | "Sorry, you are not allowed to access this page." message is shown', async () => {
      await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
    });
    test('LP-MSYNC-003 | No sync run/trigger buttons are visible', async () => {
      await expect(page.getByRole('button', { name: /run sync|start sync|sync now/i })).not.toBeVisible();
    });
    test('LP-MSYNC-004 | No sync progress bar or status indicator is visible', async () => {
      await expect(page.locator('.sync-progress, .progress-bar, [class*="sync-status"]')).not.toBeVisible();
    });
    test('LP-MSYNC-005 | No sync type selection (Products/Orders/Customers) is visible', async () => {
      await expect(page.locator('.sync-type-selector, [class*="sync-type"]')).not.toBeVisible();
    });
  });

  test.describe('2. WordPress Chrome Integrity', () => {
    test('LP-MSYNC-006 | WordPress admin menu is still visible', async () => {
      await expect(page.locator('#adminmenu')).toBeVisible();
    });
    test('LP-MSYNC-007 | LedgerPort menu group is visible in sidebar', async () => {
      await expect(page.locator('#adminmenu').getByText('LedgerPort')).toBeVisible();
    });
    test('LP-MSYNC-008 | All 7 plugin menu items are visible', async () => {
      const menu = page.locator('#adminmenu');
      for (const item of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
        await expect(menu.getByText(item)).toBeVisible();
      }
    });
    test('LP-MSYNC-009 | WordPress admin toolbar is visible', async () => {
      await expect(page.locator('#wpadminbar')).toBeVisible();
    });
    test('LP-MSYNC-010 | WordPress footer is visible', async () => {
      await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
    });
  });

  test.describe('3. Navigation from Manual Sync', () => {
    test('LP-MSYNC-011 | Clicking Dashboard in sidebar navigates correctly', async () => {
      await page.locator('#adminmenu').getByRole('link', { name: /^dashboard$/i }).first().click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('page=ledgerport');
    });
    test('LP-MSYNC-012 | Clicking Connection in sidebar navigates correctly', async () => {
      await goToPluginPage(page, PLUGIN_PAGES.manualSync);
      await page.locator('#adminmenu').getByRole('link', { name: /^connection$/i }).click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('ledgerport-connection');
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIT LOGS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('Audit Logs Page', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
  });

  test.describe('1. Access Control', () => {
    test('LP-AUDIT-001 | Audit Logs URL loads without redirect to login', async () => {
      expect(page.url()).toContain('ledgerport-audit-logs');
      expect(page.url()).not.toContain('wp-login');
    });
    test('LP-AUDIT-002 | "Sorry, you are not allowed to access this page." message is shown', async () => {
      await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
    });
    test('LP-AUDIT-003 | No audit log table is visible', async () => {
      await expect(page.locator('table, .audit-log-table, .log-entries')).not.toBeVisible();
    });
    test('LP-AUDIT-004 | No filter/search controls are visible', async () => {
      await expect(page.locator('.log-filter, .date-filter, input[placeholder*="search"]')).not.toBeVisible();
    });
    test('LP-AUDIT-005 | No export button is visible', async () => {
      await expect(page.getByRole('button', { name: /export/i })).not.toBeVisible();
    });
    test('LP-AUDIT-006 | No pagination controls are visible', async () => {
      await expect(page.locator('.pagination, .tablenav-pages')).not.toBeVisible();
    });
    test('LP-AUDIT-007 | No log entry rows (success/failed/partial) are visible', async () => {
      await expect(page.getByText('queue_run')).not.toBeVisible();
      await expect(page.getByText('mapping_update')).not.toBeVisible();
    });
  });

  test.describe('2. WordPress Chrome Integrity', () => {
    test('LP-AUDIT-008 | WordPress admin menu is still visible', async () => {
      await expect(page.locator('#adminmenu')).toBeVisible();
    });
    test('LP-AUDIT-009 | All 7 plugin menu items are visible', async () => {
      const menu = page.locator('#adminmenu');
      for (const item of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
        await expect(menu.getByText(item)).toBeVisible();
      }
    });
    test('LP-AUDIT-010 | WordPress admin toolbar is visible', async () => {
      await expect(page.locator('#wpadminbar')).toBeVisible();
    });
    test('LP-AUDIT-011 | WordPress footer is visible', async () => {
      await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// SYNC CONFIG PAGE
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('Sync Config Page', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
  });

  test.describe('1. Access Control', () => {
    test('LP-SCONF-001 | Sync Config URL loads without redirect to login', async () => {
      expect(page.url()).toContain('ledgerport-sync-config');
      expect(page.url()).not.toContain('wp-login');
    });
    test('LP-SCONF-002 | "Sorry, you are not allowed to access this page." message is shown', async () => {
      await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
    });
    test('LP-SCONF-003 | No settings form fields are visible', async () => {
      await expect(page.locator('form input, form select, form textarea')).not.toBeVisible();
    });
    test('LP-SCONF-004 | No save/update settings button is visible', async () => {
      await expect(page.getByRole('button', { name: /save|update settings/i })).not.toBeVisible();
    });
    test('LP-SCONF-005 | No sync method dropdown is visible', async () => {
      await expect(page.locator('select[name*="method"], .sync-method-select')).not.toBeVisible();
    });
    test('LP-SCONF-006 | No sync frequency dropdown is visible', async () => {
      await expect(page.locator('select[name*="frequency"], .sync-frequency-select')).not.toBeVisible();
    });
    test('LP-SCONF-007 | No auto sync toggle is visible', async () => {
      await expect(page.locator('input[type="checkbox"][name*="auto"], .auto-sync-toggle')).not.toBeVisible();
    });
  });

  test.describe('2. WordPress Chrome Integrity', () => {
    test('LP-SCONF-008 | WordPress admin menu is still visible', async () => {
      await expect(page.locator('#adminmenu')).toBeVisible();
    });
    test('LP-SCONF-009 | All 7 plugin menu items are visible', async () => {
      const menu = page.locator('#adminmenu');
      for (const item of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
        await expect(menu.getByText(item)).toBeVisible();
      }
    });
    test('LP-SCONF-010 | WordPress admin toolbar is visible', async () => {
      await expect(page.locator('#wpadminbar')).toBeVisible();
    });
    test('LP-SCONF-011 | WordPress footer is visible', async () => {
      await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
    });
  });
});
