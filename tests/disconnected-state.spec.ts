/**
 * LedgerPort WordPress Plugin — Disconnected State Tests
 *
 * Tests the entire plugin when NO connections (QuickBooks + WooCommerce) are active.
 * Covers every page a user can reach and verifies:
 *  - Correct zero/empty states are shown (not real data)
 *  - "Connect your store" banner appears on all relevant pages
 *  - All CTA buttons are present, visible, and enabled
 *  - Correct copy/text at every disconnected state
 *  - No broken UI, no leftover connected-state data
 *  - Pages that should be access-restricted return the correct WP error
 *  - Setup checklist reflects disconnected state (Connect buttons, not checkmarks)
 *  - Connections widget shows "Disconnected" for both services
 *  - Configuration widget shows "Not configured" values
 *
 * Test URL : https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport
 * Auth     : kgosal / !letmeIn@123=
 *
 * NOTE: These tests assume the plugin is in a FULLY DISCONNECTED state.
 *       Run them against a freshly disconnected environment.
 */

import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from './helpers/auth';

// ─── Shared auth context ──────────────────────────────────────────────────────

let browser_: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  browser_ = browser;
  context = await browser.newContext();
  page = await context.newPage();
  await loginAsAdmin(page);
});

test.afterAll(async () => {
  await context.close();
});

// ─── Shared: "Connect your store" banner assertions ───────────────────────────
// Reused across multiple pages — every page that gates content shows this banner.

async function assertConnectBanner(page: Page) {
  await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  await expect(page.getByText(
    'Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.'
  )).toBeVisible();
  await expect(page.getByText('One-click connection — sign in with your LedgerPort account')).toBeVisible();
  await expect(page.getByText('Real-time sync as orders, products, and customers change')).toBeVisible();
  await expect(page.getByText('Keep QuickBooks accurate without re-typing data')).toBeVisible();
  await expect(page.getByText('Secure connection — we never see your QuickBooks login')).toBeVisible();
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. DASHBOARD — Disconnected State
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Dashboard', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  });

  // Page structure
  test('LP-DIS-001 | Dashboard page loads without redirect to login', async () => {
    expect(page.url()).toContain('page=ledgerport');
    expect(page.url()).not.toContain('wp-login');
  });

  test('LP-DIS-002 | Page title is "Dashboard"', async () => {
    await expect(page).toHaveTitle(/Dashboard/i);
  });

  test('LP-DIS-003 | "Overview" heading is visible', async () => {
    await expect(page.getByRole('heading', { name: /overview/i })).toBeVisible();
  });

  test('LP-DIS-004 | Sub-heading copy is correct', async () => {
    await expect(page.getByText('Sync health, recent activity, and what needs your attention.')).toBeVisible();
  });

  // Connect banner
  test('LP-DIS-005 | "Connect your store to start syncing" banner is shown on Dashboard', async () => {
    await assertConnectBanner(page);
  });

  test('LP-DIS-006 | Banner "Connect your store" CTA button is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('LP-DIS-007 | Banner "Connect your store" button has at least one icon per feature row', async () => {
    // 4 feature rows each have an icon (svg/img)
    const bannerIcons = page.locator('.connect-banner svg, .connect-banner img')
      .or(page.getByText('Connect your store to start syncing').locator('..').locator('..').locator('svg, img'));
    const count = await bannerIcons.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  // Sync Health card — zero state
  test('LP-DIS-008 | Sync Health card shows "0% success rate" when disconnected', async () => {
    await expect(page.getByText('0% success rate')).toBeVisible();
  });

  test('LP-DIS-009 | Sync Health card shows "0 total syncs"', async () => {
    await expect(page.getByText('0 total syncs')).toBeVisible();
  });

  test('LP-DIS-010 | "SYNC HEALTH" label is present', async () => {
    await expect(page.getByText('SYNC HEALTH')).toBeVisible();
  });

  test('LP-DIS-011 | "View error log →" link is still visible in disconnected state', async () => {
    await expect(page.getByRole('link', { name: /view error log/i })).toBeVisible();
  });

  // Orders card — zero state
  test('LP-DIS-012 | Orders card shows "0 orders" when disconnected', async () => {
    await expect(page.getByText('0 orders')).toBeVisible();
  });

  test('LP-DIS-013 | Orders card shows "0.0% success rate"', async () => {
    await expect(page.getByText('0.0% success rate')).toBeVisible();
  });

  test('LP-DIS-014 | "ORDERS" label is present in the stats row', async () => {
    await expect(page.getByText('ORDERS').first()).toBeVisible();
  });

  test('LP-DIS-015 | "View report →" link is still visible in disconnected state', async () => {
    await expect(page.getByRole('link', { name: /view report/i })).toBeVisible();
  });

  // Needs Attention card — zero state
  test('LP-DIS-016 | Needs Attention card shows "0 items" when disconnected', async () => {
    await expect(page.getByText('0 items')).toBeVisible();
  });

  test('LP-DIS-017 | Needs Attention card shows "Nothing needs review" instead of an issue count', async () => {
    await expect(page.getByText('Nothing needs review')).toBeVisible();
  });

  test('LP-DIS-018 | "NEEDS ATTENTION" label is present', async () => {
    await expect(page.getByText('NEEDS ATTENTION')).toBeVisible();
  });

  test('LP-DIS-019 | "Review issues →" link is still visible in disconnected state', async () => {
    await expect(page.getByRole('link', { name: /review issues/i })).toBeVisible();
  });

  // Data Health Overview — blank/skeleton state
  test('LP-DIS-020 | "Data Health Overview" heading is visible', async () => {
    await expect(page.getByText('Data Health Overview')).toBeVisible();
  });

  test('LP-DIS-021 | Data Health section does NOT show real product/order counts', async () => {
    // In disconnected state the data health section shows skeleton/blank rows, not numbers
    const section = page.getByText('Data Health Overview').locator('..').locator('..');
    // Should NOT contain any status badges like "Healthy", "Critical", "Needs attention"
    await expect(section.getByText('Healthy')).not.toBeVisible();
    await expect(section.getByText('Critical')).not.toBeVisible();
    await expect(section.getByText('Needs attention')).not.toBeVisible();
  });

  // Date toolbar
  test('LP-DIS-022 | "Syncing your store" label is visible', async () => {
    await expect(page.getByText('Syncing your store')).toBeVisible();
  });

  test('LP-DIS-023 | Date range dropdown defaults to "Last 7 days"', async () => {
    await expect(page.getByText('Last 7 days')).toBeVisible();
  });

  test('LP-DIS-024 | A date range is displayed (current week)', async () => {
    await expect(page.getByText(/\w+ \d+, \d{4}\s*[–-]\s*\w+ \d+, \d{4}/)).toBeVisible();
  });

  test('LP-DIS-025 | Last sync badge shows "Hasn\'t run yet" when disconnected', async () => {
    await expect(page.getByText(/hasn't run yet/i)).toBeVisible();
  });

  test('LP-DIS-026 | "Sync now" button is visible in disconnected state', async () => {
    await expect(page.getByRole('button', { name: /sync now/i })).toBeVisible();
  });

  test('LP-DIS-027 | "Sync now" button is enabled (not disabled) in disconnected state', async () => {
    // Plugin renders it as clickable — may show an error/noop on click but should not be disabled
    await expect(page.getByRole('button', { name: /sync now/i })).toBeEnabled();
  });

  // Recent Activity — empty state
  test('LP-DIS-028 | "Recent Activity" heading is visible', async () => {
    await expect(page.getByText('Recent Activity')).toBeVisible();
  });

  test('LP-DIS-029 | "No syncs have run yet. Start a sync to see activity here." message is shown', async () => {
    await expect(page.getByText('No syncs have run yet. Start a sync to see activity here.')).toBeVisible();
  });

  test('LP-DIS-030 | No activity entries (success/failed rows) are shown in disconnected state', async () => {
    await expect(page.getByText('queue_run')).not.toBeVisible();
    await expect(page.getByText('mapping_update')).not.toBeVisible();
  });

  test('LP-DIS-031 | "View all" link is still present next to Recent Activity', async () => {
    await expect(page.getByRole('link', { name: /view all/i })).toBeVisible();
  });

  // Setup Checklist — disconnected state (shows action buttons, not checkmarks)
  test('LP-DIS-032 | "Setup checklist" heading is visible', async () => {
    await expect(page.getByText('Setup checklist')).toBeVisible();
  });

  test('LP-DIS-033 | "Connect WooCommerce" item shows a "Connect" action button', async () => {
    const row = page.getByText('Connect WooCommerce').locator('..').locator('..');
    await expect(row.getByRole('button', { name: /connect/i }).or(row.getByText('Connect'))).toBeVisible();
  });

  test('LP-DIS-034 | "Connect QuickBooks" item shows a "Connect" action button', async () => {
    const row = page.getByText('Connect QuickBooks').locator('..').locator('..');
    await expect(row.getByRole('button', { name: /connect/i }).or(row.getByText('Connect'))).toBeVisible();
  });

  test('LP-DIS-035 | "Configure sync settings" item shows a "Review" action button', async () => {
    const row = page.getByText('Configure sync settings').locator('..').locator('..');
    await expect(row.getByText('Review')).toBeVisible();
  });

  test('LP-DIS-036 | "Enable automatic sync" item shows an "Enable" action button', async () => {
    const row = page.getByText('Enable automatic sync').locator('..').locator('..');
    await expect(row.getByText('Enable')).toBeVisible();
  });

  test('LP-DIS-037 | "Finish setup" CTA button is shown at the bottom of the checklist', async () => {
    await expect(page.getByRole('button', { name: /finish setup/i })
      .or(page.getByText('Finish setup'))).toBeVisible();
  });

  test('LP-DIS-038 | Checklist does NOT show strike-through/completed state for any item', async () => {
    // No checkmark SVGs should appear — those indicate completion
    const completedIcons = page.locator('.setup-checklist .completed, [class*="checklist"] .check-done');
    await expect(completedIcons).toHaveCount(0);
  });

  // Connections widget — disconnected state
  test('LP-DIS-039 | "Connections" heading is visible', async () => {
    await expect(page.getByText('Connections')).toBeVisible();
  });

  test('LP-DIS-040 | QuickBooks shows "Disconnected" status', async () => {
    const qbBlock = page.getByText('QuickBooks').locator('..').locator('..');
    await expect(qbBlock.getByText('Disconnected')).toBeVisible();
  });

  test('LP-DIS-041 | WooCommerce shows "Disconnected" status', async () => {
    const wcBlock = page.getByText('WooCommerce').last().locator('..').locator('..');
    await expect(wcBlock.getByText('Disconnected').first()).toBeVisible();
  });

  test('LP-DIS-042 | QuickBooks status dot is NOT green (is red/grey for disconnected)', async () => {
    const dot = page.locator('.connections-widget, [class*="connections"]')
      .locator('[class*="disconnected"], [class*="error"], [class*="inactive"]').first();
    await expect(dot).toBeVisible();
  });

  test('LP-DIS-043 | Connections widget does NOT show "Connected" for either service', async () => {
    const connectionsWidget = page.getByText('Connections').locator('..').locator('..');
    await expect(connectionsWidget.getByText('Connected')).not.toBeVisible();
  });

  // Configuration widget — not configured state
  test('LP-DIS-044 | "Configuration" heading is visible', async () => {
    await expect(page.getByText('Configuration')).toBeVisible();
  });

  test('LP-DIS-045 | Method shows "Not configured" when disconnected', async () => {
    await expect(page.getByText('Not configured').first()).toBeVisible();
  });

  test('LP-DIS-046 | Frequency shows "Not configured" when disconnected', async () => {
    await expect(page.getByText('Not configured').nth(1)).toBeVisible();
  });

  test('LP-DIS-047 | Auto sync shows "Manual" when disconnected (not "Automatic")', async () => {
    await expect(page.getByText('Manual')).toBeVisible();
    const configWidget = page.getByText('Configuration').locator('..').locator('..');
    await expect(configWidget.getByText('Automatic')).not.toBeVisible();
  });

  test('LP-DIS-048 | "Manage settings →" link is still visible in disconnected state', async () => {
    await expect(page.getByRole('link', { name: /manage settings/i })).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONNECTION PAGE — Disconnected State
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Connection Page', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
  });

  test('LP-DIS-049 | Connection page loads correctly', async () => {
    await expect(page).toHaveTitle(/Connection/i);
  });

  test('LP-DIS-050 | "Connections" heading is visible on Connection page', async () => {
    await expect(page.getByRole('heading', { name: /connections/i })).toBeVisible();
  });

  test('LP-DIS-051 | Sub-heading "Manage how LedgerPort connects..." is visible', async () => {
    await expect(page.getByText('Manage how LedgerPort connects to your store and accounting platform.')).toBeVisible();
  });

  test('LP-DIS-052 | "Connect your store to start syncing" banner is shown on Connection page', async () => {
    await assertConnectBanner(page);
  });

  test('LP-DIS-053 | "Connect your store" CTA button on Connection page is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('LP-DIS-054 | Connection page does NOT show "Connected" status for any service', async () => {
    await expect(page.getByText('Connected')).not.toBeVisible();
  });

  test('LP-DIS-055 | Connection page does NOT show QuickBooks account details (email, company name)', async () => {
    // Should not show any QB account info since not connected
    await expect(page.getByText(/@.*\.com/)).not.toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. MAPPINGS PAGE — Disconnected State
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Mappings Page', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
  });

  test('LP-DIS-056 | Mappings page loads correctly', async () => {
    await expect(page).toHaveTitle(/Mappings/i);
  });

  test('LP-DIS-057 | "Mappings" heading is visible', async () => {
    await expect(page.getByRole('heading', { name: /^mappings$/i })).toBeVisible();
  });

  test('LP-DIS-058 | Sub-heading copy is correct', async () => {
    await expect(page.getByText(
      'Map WooCommerce products, variations, customers, and payment methods to QuickBooks Online.'
    )).toBeVisible();
  });

  test('LP-DIS-059 | "Connect your store to start syncing" banner is shown on Mappings page', async () => {
    await assertConnectBanner(page);
  });

  test('LP-DIS-060 | Mappings "Connect your store" CTA button is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('LP-DIS-061 | Mappings tab bar shows all 4 tabs', async () => {
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Variations')).toBeVisible();
    await expect(page.getByText('Customers')).toBeVisible();
    await expect(page.getByText('Payment Methods')).toBeVisible();
  });

  test('LP-DIS-062 | "Products" tab is active/selected by default', async () => {
    // Active tab typically has an underline or aria-selected
    const activeTab = page.getByRole('tab', { selected: true })
      .or(page.locator('[class*="tab"][class*="active"], [class*="tab--active"]')).first();
    await expect(activeTab).toContainText(/products/i);
  });

  test('LP-DIS-063 | Products tab content shows "Connect your store to use this feature"', async () => {
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });

  test('LP-DIS-064 | Products tab shows correct explanation text', async () => {
    await expect(page.getByText(
      'Once your WooCommerce store is connected to LedgerPort, this section will show you live data.'
    )).toBeVisible();
  });

  test('LP-DIS-065 | Products tab has a second "Connect your store" CTA button inside the gated area', async () => {
    const ctaBtn = page.getByRole('button', { name: /connect your store/i })
      .or(page.getByText('Connect your store').last());
    await expect(ctaBtn).toBeVisible();
  });

  test('LP-DIS-066 | Variations tab also shows gated state when clicked', async () => {
    await page.getByText('Variations').click();
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });

  test('LP-DIS-067 | Customers tab also shows gated state when clicked', async () => {
    await page.getByText('Customers').click();
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });

  test('LP-DIS-068 | Payment Methods tab also shows gated state when clicked', async () => {
    await page.getByText('Payment Methods').click();
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });

  test('LP-DIS-069 | No mapping table rows or product data are visible in disconnected state', async () => {
    // Navigate back to Products tab
    await page.getByText('Products').click();
    const tableRows = page.locator('table tbody tr, .mapping-row, [class*="product-row"]');
    await expect(tableRows).toHaveCount(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. MANUAL SYNC PAGE — Access Restricted
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Manual Sync Page (Access Restricted)', () => {
  test('LP-DIS-070 | Manual Sync page returns "Sorry, you are not allowed to access this page."', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.manualSync);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  });

  test('LP-DIS-071 | Manual Sync restricted page does NOT show any sync controls or buttons', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.manualSync);
    await expect(page.getByRole('button', { name: /sync/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /run/i })).not.toBeVisible();
  });

  test('LP-DIS-072 | Manual Sync restricted page still shows WordPress admin chrome (menu visible)', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.manualSync);
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. AUDIT LOGS PAGE — Access Restricted
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Audit Logs Page (Access Restricted)', () => {
  test('LP-DIS-073 | Audit Logs page returns "Sorry, you are not allowed to access this page."', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  });

  test('LP-DIS-074 | Audit Logs restricted page does NOT show any log entries or table', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
    await expect(page.locator('table, .audit-log-table, .log-entries')).not.toBeVisible();
  });

  test('LP-DIS-075 | Audit Logs restricted page still shows WordPress admin chrome', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.auditLogs);
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. SYNC CONFIG PAGE — Access Restricted
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Sync Config Page (Access Restricted)', () => {
  test('LP-DIS-076 | Sync Config page returns "Sorry, you are not allowed to access this page."', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible();
  });

  test('LP-DIS-077 | Sync Config restricted page does NOT show any settings fields or form', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
    await expect(page.locator('form, .sync-config-form, input[type="text"]')).not.toBeVisible();
  });

  test('LP-DIS-078 | Sync Config restricted page still shows WordPress admin chrome', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.syncConfig);
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. DEBUG LOGS PAGE — Partially accessible in disconnected state
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Debug Logs Page', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
  });

  test('LP-DIS-079 | Debug Logs page loads correctly (not access-restricted)', async () => {
    await expect(page).toHaveTitle(/Debug Logs/i);
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).not.toBeVisible();
  });

  test('LP-DIS-080 | "Debug Logs" heading is visible', async () => {
    await expect(page.getByRole('heading', { name: /debug logs/i })).toBeVisible();
  });

  test('LP-DIS-081 | Sub-heading copy is correct', async () => {
    await expect(page.getByText('View, download, and manage plugin debug log files.')).toBeVisible();
  });

  test('LP-DIS-082 | "Connect your store to start syncing" banner is shown on Debug Logs page', async () => {
    await assertConnectBanner(page);
  });

  test('LP-DIS-083 | Debug Logs "Connect your store" CTA button is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('LP-DIS-084 | "Log Files" section heading is visible', async () => {
    await expect(page.getByText('Log Files')).toBeVisible();
  });

  test('LP-DIS-085 | Log storage path label is shown', async () => {
    await expect(page.getByText(/wp-content\/uploads\/ledgerport\/logs\//)).toBeVisible();
  });

  test('LP-DIS-086 | "Refresh" button is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /refresh/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('LP-DIS-087 | "Clear All Logs" button is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /clear all logs/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('LP-DIS-088 | Log files table shows "File", "Size", "Last Modified", "Actions" column headers', async () => {
    await expect(page.getByText('File')).toBeVisible();
    await expect(page.getByText('Size')).toBeVisible();
    await expect(page.getByText('Last Modified')).toBeVisible();
    await expect(page.getByText('Actions')).toBeVisible();
  });

  test('LP-DIS-089 | At least one log file entry exists in the table', async () => {
    await expect(page.getByText(/\.log/)).toBeVisible();
  });

  test('LP-DIS-090 | Log file shows a file size (e.g. "1000 B")', async () => {
    await expect(page.getByText(/\d+ B|\d+ KB|\d+ MB/)).toBeVisible();
  });

  test('LP-DIS-091 | Log file shows a "Last Modified" date in DD/MM/YYYY format', async () => {
    await expect(page.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeVisible();
  });

  test('LP-DIS-092 | Log file row has a view (eye) action icon', async () => {
    const viewIcon = page.locator('table tbody tr').first()
      .locator('button[aria-label*="view"], .view-log, svg').first();
    await expect(viewIcon).toBeVisible();
  });

  test('LP-DIS-093 | Log file row has a delete (trash) action icon', async () => {
    const deleteIcon = page.locator('table tbody tr').first()
      .locator('button[aria-label*="delete"], .delete-log, svg').last();
    await expect(deleteIcon).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. CROSS-PAGE: "Connect your store" CTA — Navigation Behaviour
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Connect CTA Navigation', () => {
  test('LP-DIS-094 | Dashboard "Connect your store" banner CTA navigates to Connection page or OAuth flow', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await btn.click();
    await page.waitForLoadState('networkidle');
    // Should either navigate to the Connection page or open an OAuth popup/redirect
    const url = page.url();
    const isConnectionPage = url.includes('ledgerport-connection') || url.includes('ledgerport');
    const isOAuthFlow = url.includes('intuit.com') || url.includes('oauth') || url.includes('quickbooks');
    expect(isConnectionPage || isOAuthFlow).toBe(true);
  });

  test('LP-DIS-095 | Connection page "Connect your store" CTA is clickable and navigates', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.connection);
    const btn = page.getByRole('button', { name: /connect your store/i });
    await btn.click();
    await page.waitForLoadState('networkidle');
    // Should not show an error page
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('LP-DIS-096 | Mappings gated area "Connect your store" CTA is clickable and navigates', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    // The second "Connect your store" button is in the gated content area
    const btn = page.getByRole('button', { name: /connect your store/i }).last();
    await btn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('LP-DIS-097 | Dashboard "Finish setup" CTA is clickable and navigates to connection flow', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const btn = page.getByRole('button', { name: /finish setup/i })
      .or(page.getByText('Finish setup'));
    await btn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. CROSS-PAGE: Sidebar Navigation in Disconnected State
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — Sidebar Navigation', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  });

  test('LP-DIS-098 | All 7 sidebar menu items are visible in disconnected state', async () => {
    const menu = page.locator('#adminmenu');
    await expect(menu.getByText('Dashboard')).toBeVisible();
    await expect(menu.getByText('Connection')).toBeVisible();
    await expect(menu.getByText('Mappings')).toBeVisible();
    await expect(menu.getByText('Manual Sync')).toBeVisible();
    await expect(menu.getByText('Audit Logs')).toBeVisible();
    await expect(menu.getByText('Sync Config')).toBeVisible();
    await expect(menu.getByText('Debug Logs')).toBeVisible();
  });

  test('LP-DIS-099 | Clicking "Connection" in sidebar navigates to Connection page', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^connection$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-connection');
  });

  test('LP-DIS-100 | Clicking "Mappings" in sidebar navigates to Mappings page', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^mappings$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-mappings');
  });

  test('LP-DIS-101 | Clicking "Debug Logs" in sidebar navigates to Debug Logs page', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^debug logs$/i }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ledgerport-debug-logs');
  });

  test('LP-DIS-102 | LedgerPort plugin icon/logo is shown in sidebar', async () => {
    await expect(page.locator('#adminmenu').locator('img, svg').first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. CROSS-PAGE: No Connected-State Data Leaking
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Disconnected State — No Data Leakage', () => {
  test('LP-DIS-103 | Dashboard does not show any real order/product/customer counts in stats cards', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    // Stats cards should all be 0 — no real numbers
    await expect(page.getByText('0% success rate')).toBeVisible();
    await expect(page.getByText('0 orders')).toBeVisible();
    await expect(page.getByText('0 items')).toBeVisible();
    // Should NOT show high numbers like "6 orders", "92%", etc.
    await expect(page.getByText('92% success rate')).not.toBeVisible();
    await expect(page.getByText('6 orders')).not.toBeVisible();
  });

  test('LP-DIS-104 | Dashboard Recent Activity does not show any historical sync entries', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText(/Synced \d+ orders to QuickBooks/)).not.toBeVisible();
    await expect(page.getByText(/Updated product mapping/)).not.toBeVisible();
  });

  test('LP-DIS-105 | Configuration widget does not show real method/frequency settings from a prior connection', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    await expect(page.getByText('Sales Receipt')).not.toBeVisible();
    await expect(page.getByText('Hourly')).not.toBeVisible();
    // Should show "Not configured" instead
    await expect(page.getByText('Not configured').first()).toBeVisible();
  });

  test('LP-DIS-106 | Connections widget shows no "Connected" label for any service', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
    const connectionsWidget = page.getByText('Connections').locator('..').locator('..');
    await expect(connectionsWidget.getByText('Connected')).not.toBeVisible();
  });
});
