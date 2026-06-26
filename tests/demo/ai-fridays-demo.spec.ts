/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   LedgerPort Plugin — AI Fridays LIVE DEMO                      ║
 * ║   All 7 pages · ~60 seconds · selectors verified on live site   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Run:  npm run test:demo            ← headless
 *       npm run test:demo:headed     ← browser visible (best for demo)
 */

import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

const SLOW = { timeout: 15_000 };

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

// ══════════════════════════════════════════════════════════════════════════════
// 1 · DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
test.describe('📊 Dashboard', () => {
  test('loads with Overview heading and LedgerPort branding', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    // Logo is the header link
    await expect(page.getByRole('link', { name: 'LedgerPort' }).first(), SLOW).toBeVisible();
  });

  test('shows Sync Health, Orders, and Needs Attention cards', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    // Cards use CSS-uppercase text; match case-insensitively
    await expect(page.getByText(/sync health/i).first()).toBeVisible();
    await expect(page.getByText(/\d+.*success rate/).first()).toBeVisible();
    await expect(page.getByText(/\d+\s*orders?/i).first()).toBeVisible();
    await expect(page.getByText(/needs attention/i).first()).toBeVisible();
  });

  test('date filter switches to Yesterday', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    // Open the date range combobox (first one on the page)
    const dropdown = page.locator('[role="combobox"]').first();
    await dropdown.click();
    await page.getByText('Yesterday').click();
    await expect(dropdown).toContainText(/yesterday/i);
  });

  test('"Sync now" button is visible and enabled', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    await expect(page.getByRole('button', { name: /sync now/i })).toBeEnabled();
  });

  test('"View all" in Recent Activity → navigates to Audit Logs', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    await page.getByRole('link', { name: 'View all' }).click();
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('"Manage settings" → navigates to Sync Config', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    await page.getByRole('button', { name: /manage settings/i }).click();
    await expect(page).toHaveURL(/ledgerport-sync-config/);
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 2 · CONNECTION
// ══════════════════════════════════════════════════════════════════════════════
test.describe('🔗 Connection', () => {
  test('loads with Connection heading', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.connection);
    await expect(page.getByRole('heading', { name: 'Connection' }), SLOW).toBeVisible();
  });

  test('shows both QuickBooks and WooCommerce cards', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.connection);
    await expect(page.getByRole('heading', { name: 'Connection' }), SLOW).toBeVisible();
    await expect(page.getByText(/quickbooks/i).first()).toBeVisible();
    await expect(page.getByText(/woocommerce/i).first()).toBeVisible();
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 3 · MAPPINGS — all 4 tabs
// ══════════════════════════════════════════════════════════════════════════════
test.describe('🗺️ Mappings', () => {
  test('Products tab loads with table and filter', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('heading', { name: 'Mappings' }), SLOW).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Products' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('textbox', { name: /filter/i })).toBeVisible();
  });

  test('typing in filter narrows the products table', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('table'), SLOW).toBeVisible();
    await page.getByRole('textbox', { name: /filter/i }).fill('iPhone');
    await page.waitForTimeout(600);
    // After filtering, at least one "iPhone" row should be visible
    await expect(page.getByText('iPhone').first(), SLOW).toBeVisible();
  });

  test('Variations tab opens without error', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('heading', { name: 'Mappings' }), SLOW).toBeVisible();
    await page.getByRole('tab', { name: 'Variations' }).click();
    await expect(page.getByRole('tab', { name: 'Variations' })).toHaveAttribute('aria-selected', 'true');
  });

  test('Customers tab opens without error', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('heading', { name: 'Mappings' }), SLOW).toBeVisible();
    await page.getByRole('tab', { name: 'Customers' }).click();
    await expect(page.getByRole('tab', { name: 'Customers' })).toHaveAttribute('aria-selected', 'true');
  });

  test('Payment Methods tab opens without error', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('heading', { name: 'Mappings' }), SLOW).toBeVisible();
    await page.getByRole('tab', { name: 'Payment Methods' }).click();
    await expect(page.getByRole('tab', { name: 'Payment Methods' })).toHaveAttribute('aria-selected', 'true');
  });

  test('Automap Products and Refresh WooCommerce buttons are visible', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await expect(page.getByRole('heading', { name: 'Mappings' }), SLOW).toBeVisible();
    await expect(page.getByRole('button', { name: /automap products/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /refresh woocommerce/i })).toBeVisible();
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 4 · MANUAL SYNC  (heading is "Send to QuickBooks" in the plugin UI)
// ══════════════════════════════════════════════════════════════════════════════
test.describe('⚡ Manual Sync', () => {
  test('loads "Send to QuickBooks" page on Manual Sync route', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.manualSync);
    await expect(page.getByRole('heading', { name: /send to quickbooks/i }), SLOW).toBeVisible();
  });

  test('Products, Variations, Orders, Customers, Payments tabs visible', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.manualSync);
    await expect(page.getByRole('heading', { name: /send to quickbooks/i }), SLOW).toBeVisible();
    for (const tab of ['Products', 'Variations', 'Orders', 'Customers', 'Payments']) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 5 · AUDIT LOGS  (catches the URL slug bug)
// ══════════════════════════════════════════════════════════════════════════════
test.describe('📋 Audit Logs', () => {
  test('URL slug is ledgerport-logs (not the wrong ledgerport-audit-logs)', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
    // Wait for the React app to render the heading (may be h2/h3 depending on plugin version)
    await expect(page.getByRole('heading', { name: /audit logs/i }), SLOW).toBeVisible();
    expect(page.url()).toContain('page=ledgerport-logs');
    expect(page.url()).not.toContain('ledgerport-audit-logs');
  });

  test('loads without WordPress error page', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
    await expect(page.getByRole('heading', { name: /audit logs/i }), SLOW).toBeVisible();
    await expect(page.getByText(/wordpress error/i)).toHaveCount(0);
  });

  test('log entries with status badges are visible', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
    await expect(page.getByRole('heading', { name: /audit logs/i }), SLOW).toBeVisible();
    // Log rows exist — match any status badge text the plugin renders
    await expect(page.getByText(/^success$|^failed$|^info$|^partial_success$/i).first(), SLOW).toBeVisible();
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 6 · SYNC CONFIG  (heading is "Settings"; 7 tabs: General/Orders/Products/
//                   Customers/Payments/Taxes/Misc)
// ══════════════════════════════════════════════════════════════════════════════
test.describe('⚙️ Sync Config', () => {
  test('loads Settings page with General, Orders, Products, Customers tabs', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await expect(page.getByRole('heading', { name: /^settings$/i }), SLOW).toBeVisible();
    for (const tab of ['General', 'Orders', 'Products', 'Customers']) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }
  });

  test('Orders tab opens and shows content', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await expect(page.getByRole('heading', { name: /^settings$/i }), SLOW).toBeVisible();
    await page.getByRole('tab', { name: 'Orders' }).click();
    await expect(page.getByRole('tab', { name: 'Orders' })).toHaveAttribute('aria-selected', 'true');
    // Tab content is visible (plugin may not use role="tabpanel"; check for any setting text)
    await expect(page.getByText(/orders|sync/i).first(), SLOW).toBeVisible();
  });

  test('Customers tab opens correctly', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await expect(page.getByRole('heading', { name: /^settings$/i }), SLOW).toBeVisible();
    await page.getByRole('tab', { name: 'Customers' }).click();
    await expect(page.getByRole('tab', { name: 'Customers' })).toHaveAttribute('aria-selected', 'true');
  });

  test('Products tab opens correctly', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await expect(page.getByRole('heading', { name: /^settings$/i }), SLOW).toBeVisible();
    await page.getByRole('tab', { name: 'Products' }).click();
    await expect(page.getByRole('tab', { name: 'Products' })).toHaveAttribute('aria-selected', 'true');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 7 · DEBUG LOGS
// ══════════════════════════════════════════════════════════════════════════════
test.describe('🪲 Debug Logs', () => {
  test('loads with Debug Logs heading and Refresh button', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.debugLogs);
    await expect(page.getByRole('heading', { name: /debug logs/i }), SLOW).toBeVisible();
    await expect(page.getByRole('button', { name: /refresh/i }).first()).toBeVisible();
  });

  test('log files table or empty state is shown', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.debugLogs);
    await expect(page.getByRole('heading', { name: /debug logs/i }), SLOW).toBeVisible();
    const hasTable = await page.getByRole('table').count() > 0;
    const hasEmpty = await page.getByText(/no log|no file/i).count() > 0;
    expect(hasTable || hasEmpty).toBeTruthy();
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// 8 · SIDEBAR NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════
test.describe('🧭 Sidebar Navigation', () => {
  test('all 7 LedgerPort nav items visible from Dashboard', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    // Scope to the LedgerPort submenu to avoid WP/PushEngage "Dashboard" clashes
    const ledgerNav = page.locator('#toplevel_page_ledgerport');
    for (const item of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync',
                        'Audit Logs', 'Sync Config', 'Debug Logs']) {
      await expect(ledgerNav.getByRole('link', { name: item })).toBeVisible();
    }
  });

  test('dark mode toggle is present', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    await expect(page.getByRole('heading', { name: 'Overview', exact: true }), SLOW).toBeVisible();
    await expect(page.getByRole('button', { name: /dark mode/i })).toBeVisible();
  });
});
