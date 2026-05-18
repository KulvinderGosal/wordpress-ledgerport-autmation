import { test, expect } from '@playwright/test';
import { loginAsAdmin, TEST_CONFIG, PLUGIN_PAGES } from '../auth';

test.describe('LedgerPort Plugin — Install / Activate / Deactivate', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  // ── Plugin list page ────────────────────────────────────────────────────────

  test('plugins.php loads and lists installed plugins', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    await expect(page).toHaveTitle(/Plugins/);
    await expect(page.locator('#the-list')).toBeVisible();
  });

  test('LedgerPort plugin row exists in the plugin list', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await expect(row).toBeVisible();
  });

  test('LedgerPort plugin row shows plugin name and description', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await expect(row.locator('.plugin-title strong')).toContainText(/LedgerPort/i);
    await expect(row.locator('.plugin-description p')).not.toBeEmpty();
  });

  test('LedgerPort plugin shows version number', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await expect(row.locator('.plugin-version-author-uri')).toContainText(/Version/i);
  });

  // ── Active state ────────────────────────────────────────────────────────────

  test('LedgerPort plugin is active', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await expect(row).toHaveClass(/active/);
  });

  test('active plugin row shows Deactivate action link', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await expect(row.locator('.deactivate a')).toBeVisible();
    await expect(row.locator('.deactivate a')).toHaveText(/Deactivate/i);
  });

  test('active plugin row does not show Activate action link', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await expect(row.locator('.activate a')).toHaveCount(0);
  });

  // ── Sidebar menu presence ───────────────────────────────────────────────────

  test('LedgerPort menu group appears in WP admin sidebar', async ({ page }) => {
    await page.goto('/wp-admin/');
    const menu = page.locator('#adminmenu');
    await expect(menu.locator('a', { hasText: /LedgerPort/i }).first()).toBeVisible();
  });

  test('sidebar shows WooCommerce Sync sub-label', async ({ page }) => {
    await page.goto('/wp-admin/');
    await expect(page.locator('#adminmenu').getByText(/WooCommerce Sync/i).first()).toBeVisible();
  });

  test('all 7 sidebar menu items are present when plugin is active', async ({ page }) => {
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    // Scope to LedgerPort menu group to avoid "Dashboard" matching WP/PushEngage menus
    const menu = page.locator('#toplevel_page_ledgerport');
    for (const label of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
      await expect(menu.getByRole('link', { name: label })).toBeVisible();
    }
  });

  // ── Deactivate flow ─────────────────────────────────────────────────────────

  test('deactivating plugin removes LedgerPort from sidebar', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    await row.locator('.deactivate a').click();
    await page.waitForLoadState('domcontentloaded');

    // Plugin row becomes inactive
    await expect(row).toHaveClass(/inactive/);
    // LedgerPort menu item gone from sidebar
    await expect(page.locator('#adminmenu').getByText(/LedgerPort/i).first()).toHaveCount(0);
  });

  test('deactivated plugin row shows Activate action link', async ({ page }) => {
    // Ensure plugin is deactivated first
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    const isActive = await row.evaluate((el) => el.classList.contains('active'));
    if (isActive) {
      await row.locator('.deactivate a').click();
      await page.waitForLoadState('domcontentloaded');
    }
    await expect(row.locator('.activate a')).toBeVisible();
    await expect(row.locator('.activate a')).toHaveText(/Activate/i);
  });

  test('direct URL to dashboard while deactivated shows access error', async ({ page }) => {
    // Deactivate first
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    const isActive = await row.evaluate((el) => el.classList.contains('active'));
    if (isActive) {
      await row.locator('.deactivate a').click();
      await page.waitForLoadState('domcontentloaded');
    }
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await expect(page.locator('body')).toContainText(/not allowed|not found|404|deactivated/i);
  });

  // ── Re-activate flow ────────────────────────────────────────────────────────

  test('reactivating plugin restores sidebar menu', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    // Deactivate if active
    const isActive = await row.evaluate((el) => el.classList.contains('active'));
    if (isActive) {
      await row.locator('.deactivate a').click();
      await page.waitForLoadState('domcontentloaded');
    }
    // Re-activate
    await row.locator('.activate a').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(row).toHaveClass(/active/);
    await expect(page.locator('#adminmenu').getByText(/LedgerPort/i).first()).toBeVisible();
  });

  test('reactivated plugin dashboard is accessible', async ({ page }) => {
    await page.goto('/wp-admin/plugins.php');
    const row = page.locator('tr[data-slug*="ledgerport"]');
    const isActive = await row.evaluate((el) => el.classList.contains('active'));
    if (!isActive) {
      await row.locator('.activate a').click();
      await page.waitForLoadState('domcontentloaded');
    }
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await expect(page.locator('h1, h2').filter({ hasText: /Overview/i }).first()).toBeVisible();
  });
});
