/**
 * LedgerPort — Full Regression Smoke Tests
 * Quick sanity check across ALL plugin pages in a single run.
 * Run this first before the full suite to catch major breakages fast.
 *
 * LP-REG-001 → LP-REG-050
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

// ─── 1. Authentication ────────────────────────────────────────────────────────
test.describe('1. Authentication', () => {
  test('LP-REG-001 | Login with valid credentials succeeds', async () => {
    expect(page.url()).toContain('wp-admin');
    expect(page.url()).not.toContain('wp-login');
  });
  test('LP-REG-002 | Logged-in user name "Kulvinder Singh" shown in admin bar', async () => {
    await expect(page.locator('#wpadminbar').getByText(/kulvinder/i)).toBeVisible();
  });
  test('LP-REG-003 | LedgerPort menu appears in WordPress sidebar after login', async () => {
    await expect(page.locator('#adminmenu').getByText('LedgerPort')).toBeVisible();
  });
});

// ─── 2. All Pages Load ────────────────────────────────────────────────────────
test.describe('2. All Plugin Pages Load', () => {
  test('LP-REG-004 | Dashboard page loads', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page).toHaveTitle(/Dashboard/i);
    expect(page.url()).not.toContain('wp-login');
  });
  test('LP-REG-005 | Connection page loads', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    await expect(page).toHaveTitle(/Connection/i);
  });
  test('LP-REG-006 | Mappings page loads', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await expect(page).toHaveTitle(/Mappings/i);
  });
  test('LP-REG-007 | Manual Sync page loads (restricted but not 404)', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.manualSync);
    await expect(page).not.toHaveTitle(/404|not found/i);
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
  test('LP-REG-008 | Audit Logs page loads (restricted but not 404)', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
    await expect(page).not.toHaveTitle(/404|not found/i);
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
  test('LP-REG-009 | Sync Config page loads (restricted but not 404)', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
    await expect(page).not.toHaveTitle(/404|not found/i);
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
  test('LP-REG-010 | Debug Logs page loads', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
    await expect(page).toHaveTitle(/Debug Logs/i);
  });
});

// ─── 3. Dashboard Smoke ───────────────────────────────────────────────────────
test.describe('3. Dashboard Smoke', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  });

  test('LP-REG-011 | "Overview" heading is present', async () => {
    await expect(page.getByRole('heading', { name: /overview/i })).toBeVisible();
  });
  test('LP-REG-012 | SYNC HEALTH card is present', async () => {
    await expect(page.getByText('SYNC HEALTH')).toBeVisible();
  });
  test('LP-REG-013 | ORDERS card is present', async () => {
    await expect(page.getByText('ORDERS').first()).toBeVisible();
  });
  test('LP-REG-014 | NEEDS ATTENTION card is present', async () => {
    await expect(page.getByText('NEEDS ATTENTION')).toBeVisible();
  });
  test('LP-REG-015 | Data Health Overview section is present', async () => {
    await expect(page.getByText('Data Health Overview')).toBeVisible();
  });
  test('LP-REG-016 | Recent Activity section is present', async () => {
    await expect(page.getByText('Recent Activity')).toBeVisible();
  });
  test('LP-REG-017 | Setup checklist is present', async () => {
    await expect(page.getByText('Setup checklist')).toBeVisible();
  });
  test('LP-REG-018 | Connections widget is present', async () => {
    await expect(page.getByText('Connections')).toBeVisible();
  });
  test('LP-REG-019 | Configuration widget is present', async () => {
    await expect(page.getByText('Configuration')).toBeVisible();
  });
  test('LP-REG-020 | "Sync now" button is present', async () => {
    await expect(page.getByRole('button', { name: /sync now/i })).toBeVisible();
  });
});

// ─── 4. Disconnected State Smoke ─────────────────────────────────────────────
test.describe('4. Disconnected State Smoke', () => {
  test('LP-REG-021 | Dashboard shows "Connect your store" banner when disconnected', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  });
  test('LP-REG-022 | Dashboard shows 0% success rate when disconnected', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('0% success rate')).toBeVisible();
  });
  test('LP-REG-023 | Dashboard shows "Hasn\'t run yet" when disconnected', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText(/hasn't run yet/i)).toBeVisible();
  });
  test('LP-REG-024 | Dashboard shows "No syncs have run yet" in activity feed', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('No syncs have run yet. Start a sync to see activity here.')).toBeVisible();
  });
  test('LP-REG-025 | QuickBooks shows "Disconnected" in connections widget', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('Disconnected').first()).toBeVisible();
  });
  test('LP-REG-026 | Connection page shows "Connect your store" banner', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  });
  test('LP-REG-027 | Mappings page shows "Connect your store" banner', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  });
  test('LP-REG-028 | Manual Sync shows access restriction', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.manualSync);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  });
  test('LP-REG-029 | Audit Logs shows access restriction', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  });
  test('LP-REG-030 | Sync Config shows access restriction', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  });
});

// ─── 5. Sidebar Navigation Smoke ─────────────────────────────────────────────
test.describe('5. Sidebar Navigation Smoke', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  });

  test('LP-REG-031 | Sidebar "Connection" link navigates correctly', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^connection$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-connection');
  });
  test('LP-REG-032 | Sidebar "Mappings" link navigates correctly', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^mappings$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-mappings');
  });
  test('LP-REG-033 | Sidebar "Debug Logs" link navigates correctly', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^debug logs$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-debug-logs');
  });
  test('LP-REG-034 | Sidebar "Manual Sync" link navigates correctly', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^manual sync$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-manual-sync');
  });
  test('LP-REG-035 | Sidebar "Audit Logs" link navigates correctly', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^audit logs$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-audit-logs');
  });
  test('LP-REG-036 | Sidebar "Sync Config" link navigates correctly', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^sync config$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-sync-config');
  });
});

// ─── 6. CTA Buttons Smoke ────────────────────────────────────────────────────
test.describe('6. CTA Buttons Smoke', () => {
  test('LP-REG-037 | Dashboard "Connect your store" CTA is clickable', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await expect(btn).toBeEnabled();
    await btn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });
  test('LP-REG-038 | Connection page CTA is clickable', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    const btn = page.getByRole('button', { name: /connect your store/i });
    await expect(btn).toBeEnabled();
  });
  test('LP-REG-039 | Mappings page CTA is clickable', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await expect(btn).toBeEnabled();
  });
  test('LP-REG-040 | Debug Logs "Refresh" button is clickable', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
    await expect(page.getByRole('button', { name: /^refresh$/i })).toBeEnabled();
  });
});

// ─── 7. No Data Leakage Smoke ────────────────────────────────────────────────
test.describe('7. No Data Leakage Smoke', () => {
  test('LP-REG-041 | Dashboard stats show zeros when disconnected', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('0% success rate')).toBeVisible();
    await expect(page.getByText('0 orders')).toBeVisible();
    await expect(page.getByText('0 items')).toBeVisible();
  });
  test('LP-REG-042 | No prior connected-state data shown anywhere', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('Connected')).not.toBeVisible();
    await expect(page.getByText('Sales Receipt')).not.toBeVisible();
    await expect(page.getByText('Hourly')).not.toBeVisible();
  });
});

// ─── 8. Plugin Header Smoke ───────────────────────────────────────────────────
test.describe('8. Plugin Header Smoke', () => {
  test('LP-REG-043 | LedgerPort logo visible on Dashboard', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('LedgerPort').first()).toBeVisible();
  });
  test('LP-REG-044 | LedgerPort logo visible on Connection', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    await expect(page.getByText('LedgerPort').first()).toBeVisible();
  });
  test('LP-REG-045 | LedgerPort logo visible on Mappings', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await expect(page.getByText('LedgerPort').first()).toBeVisible();
  });
  test('LP-REG-046 | LedgerPort logo visible on Debug Logs', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
    await expect(page.getByText('LedgerPort').first()).toBeVisible();
  });
});

// ─── 9. Footer Smoke ─────────────────────────────────────────────────────────
test.describe('9. Footer Smoke', () => {
  test('LP-REG-047 | WordPress footer visible on Dashboard', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.locator('#wpfooter').getByText(/Version \d+\.\d+/i)).toBeVisible();
  });
  test('LP-REG-048 | WordPress footer visible on Debug Logs', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
    await expect(page.locator('#wpfooter').getByText(/Version \d+\.\d+/i)).toBeVisible();
  });
});

// ─── 10. Session Integrity ───────────────────────────────────────────────────
test.describe('10. Session Integrity', () => {
  test('LP-REG-049 | Session persists across all page navigations', async () => {
    const pages = [
      PLUGIN_PAGES.dashboard,
      PLUGIN_PAGES.connection,
      PLUGIN_PAGES.mappings,
      PLUGIN_PAGES.debugLogs,
    ];
    for (const url of pages) {
      await goToPluginPage(page, url);
      expect(page.url()).not.toContain('wp-login');
    }
  });
  test('LP-REG-050 | Direct URL access to any page does not require re-login', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
    expect(page.url()).not.toContain('wp-login');
    await expect(page).toHaveTitle(/Debug Logs/i);
  });
});
