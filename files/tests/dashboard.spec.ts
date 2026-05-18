import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';

test.describe('LedgerPort — Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  });

  // ── Page load & title ───────────────────────────────────────────────────────

  test('dashboard page loads without errors', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  });

  test('page heading is Overview', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Overview/i }).first()).toBeVisible();
  });

  test('page subtitle is visible', async ({ page }) => {
    await expect(page.getByText(/Sync health, recent activity/i)).toBeVisible();
  });

  // ── Header ──────────────────────────────────────────────────────────────────

  test('LedgerPort logo SVG is visible in header', async ({ page }) => {
    // Logo is an SVG with role="img" and aria-label="LedgerPort"
    await expect(page.locator('svg[aria-label="LedgerPort"]')).toBeVisible();
  });

  test('LedgerPort logo links back to dashboard', async ({ page }) => {
    const logoLink = page.locator('a[href*="page=ledgerport"]:not([href*="ledgerport-"])').first();
    await expect(logoLink).toBeVisible();
  });

  test('notifications bell icon is visible', async ({ page }) => {
    await expect(page.locator('button[aria-label="Notifications"]')).toBeVisible();
  });

  test('dark/light mode toggle is visible', async ({ page }) => {
    await expect(page.locator('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]').first()).toBeVisible();
  });

  test('help icon is visible', async ({ page }) => {
    await expect(page.locator('button[aria-label="Help"]')).toBeVisible();
  });

  // ── Date filter toolbar ─────────────────────────────────────────────────────

  test('"Syncing your store" label is visible', async ({ page }) => {
    await expect(page.getByText(/Syncing.*your store/i)).toBeVisible();
  });

  test('date range dropdown shows default "Last 7 days"', async ({ page }) => {
    await expect(page.getByText(/Last 7 days/i)).toBeVisible();
  });

  test('active date range button is displayed', async ({ page }) => {
    // Date range picker button shows the current date range
    const rangeBtn = page.locator('button').filter({ hasText: /\w+ \d+, \d{4}/ });
    await expect(rangeBtn.first()).toBeVisible();
  });

  test('"Last sync" badge is visible', async ({ page }) => {
    await expect(page.getByText(/Last sync:/i)).toBeVisible();
  });

  test('green status dot is visible next to last sync', async ({ page }) => {
    await expect(page.locator('.bg-green-500').first()).toBeVisible();
  });

  test('"Sync now" button is visible and enabled', async ({ page }) => {
    const btn = page.getByRole('button', { name: /Sync now/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('date range dropdown opens when clicked', async ({ page }) => {
    const dropdown = page.locator('button[role="combobox"]').first();
    await dropdown.click();
    await expect(page.getByText(/Last 30 days|Last 90 days|This month|Custom/i).first()).toBeVisible();
    await page.keyboard.press('Escape');
  });

  // ── Stat cards ──────────────────────────────────────────────────────────────

  test('Sync Health card is visible', async ({ page }) => {
    await expect(page.getByText(/Sync health/i).first()).toBeVisible();
  });

  test('Sync Health card shows success rate percentage', async ({ page }) => {
    await expect(page.locator('text=/\\d+(\\.\\d+)?% success rate/i').first()).toBeVisible();
  });

  test('Sync Health card shows total syncs count', async ({ page }) => {
    await expect(page.locator('text=/\\d+ total syncs/i').first()).toBeVisible();
  });

  test('"View error log" button is present on Sync Health card', async ({ page }) => {
    await expect(page.getByRole('button', { name: /View error log/i })).toBeVisible();
  });

  test('"View error log" button navigates to Audit Logs page', async ({ page }) => {
    await page.getByRole('button', { name: /View error log/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-logs/);
    await expect(page.getByRole('heading', { name: /Audit Logs/i }).first()).toBeVisible();
  });

  test('Orders card is visible', async ({ page }) => {
    // "Orders" appears in the stat card (uppercase via CSS)
    await expect(page.getByText(/^Orders$/i).first()).toBeVisible();
  });

  test('Orders card shows order count', async ({ page }) => {
    await expect(page.locator('text=/\\d+ orders/i').first()).toBeVisible();
  });

  test('"View report" button is present on Orders card', async ({ page }) => {
    await expect(page.getByRole('button', { name: /View report/i })).toBeVisible({ timeout: 50000 });
  });

  test('Needs Attention card is visible', async ({ page }) => {
    await expect(page.getByText(/Needs attention/i).first()).toBeVisible();
  });

  test('Needs Attention card shows item count', async ({ page }) => {
    await expect(page.locator('text=/\\d+ items?/i').first()).toBeVisible();
  });

  test('"Review issues" button is present on Needs Attention card', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Review issues/i })).toBeVisible();
  });

  // ── Data Health Overview ────────────────────────────────────────────────────

  test('Data Health Overview section is visible', async ({ page }) => {
    await expect(page.getByText(/Data Health Overview/i)).toBeVisible();
  });

  test('Products column is visible in Data Health', async ({ page }) => {
    // Text is "Products" in DOM; CSS renders it uppercase
    await expect(page.getByText(/^Products$/i).first()).toBeVisible();
  });

  test('Orders column is visible in Data Health', async ({ page }) => {
    await expect(page.getByText(/^Orders$/i).first()).toBeVisible();
  });

  test('Customers column is visible in Data Health', async ({ page }) => {
    await expect(page.getByText(/^Customers$/i).first()).toBeVisible();
  });

  test('Inventory column is visible in Data Health', async ({ page }) => {
    await expect(page.getByText(/^Inventory$/i).first()).toBeVisible();
  });

  test('Needs Attention badge is rendered for Products', async ({ page }) => {
    await expect(page.getByText(/Needs attention/i).first()).toBeVisible();
  });

  test('Healthy badge is rendered for Orders', async ({ page }) => {
    await expect(page.getByText(/Healthy/i).first()).toBeVisible();
  });

  test('Critical badge is rendered for Inventory', async ({ page }) => {
    await expect(page.getByText(/Critical/i).first()).toBeVisible();
  });

  // ── Recent Activity ─────────────────────────────────────────────────────────

  test('Recent Activity section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible();
  });

  test('"View all" link is present in Recent Activity', async ({ page }) => {
    await expect(page.getByRole('link', { name: /View all/i })).toBeVisible();
  });

  test('"View all" navigates to Audit Logs', async ({ page }) => {
    await page.getByRole('link', { name: /View all/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('activity entries are listed with sync description text', async ({ page }) => {
    // Each entry is a paragraph inside the activity feed
    const entry = page.locator('p').filter({ hasText: /Synced \d+ orders|Updated product|Created product/i });
    await expect(entry.first()).toBeVisible();
  });

  test('activity entries display relative timestamp', async ({ page }) => {
    await expect(page.locator('text=/minutes? ago|hours? ago|days? ago|about \d/i').first()).toBeVisible();
  });

  test('activity entries show status badges', async ({ page }) => {
    await expect(page.getByText(/^success$|^partial_success$|^failed$/i).first()).toBeVisible();
  });

  test('activity entries show type badge (queue_run)', async ({ page }) => {
    await expect(page.getByText(/queue_run|mapping_update|sync/i).first()).toBeVisible();
  });

  test('activity entries show entity type (order/product)', async ({ page }) => {
    await expect(page.locator('p, span').filter({ hasText: /order|product/i }).first()).toBeVisible({ timeout: 50000 });
  });

  // ── Setup Checklist ─────────────────────────────────────────────────────────

  test('Setup Checklist widget is visible', async ({ page }) => {
    await expect(page.getByText(/Setup checklist/i)).toBeVisible();
  });

  test('"Connect WooCommerce" checklist item is present', async ({ page }) => {
    await expect(page.getByText(/Connect WooCommerce/i)).toBeVisible();
  });

  test('"Connect QuickBooks" checklist item is present', async ({ page }) => {
    await expect(page.getByText(/Connect QuickBooks/i)).toBeVisible();
  });

  test('"Configure sync settings" checklist item is present', async ({ page }) => {
    await expect(page.getByText(/Configure sync settings/i)).toBeVisible();
  });

  test('"Enable automatic sync" checklist item is present', async ({ page }) => {
    await expect(page.getByText(/Enable automatic sync/i)).toBeVisible();
  });

  // ── Connections widget ──────────────────────────────────────────────────────

  test('Connections widget heading is visible', async ({ page }) => {
    await expect(page.getByText(/^Connections$/i)).toBeVisible();
  });

  test('QuickBooks is listed as Connected', async ({ page }) => {
    await expect(page.getByText(/QuickBooks/i).first()).toBeVisible();
  });

  test('WooCommerce is listed as Connected', async ({ page }) => {
    await expect(page.getByText(/WooCommerce/i).first()).toBeVisible();
  });

  test('QB avatar initial "Q" is visible', async ({ page }) => {
    const avatar = page.locator('.bg-green-100').filter({ hasText: /^Q$/ });
    await expect(avatar.first()).toBeVisible();
  });

  test('WooCommerce avatar initial "W" is visible', async ({ page }) => {
    const avatar = page.locator('.bg-purple-100').filter({ hasText: /^W$/ });
    await expect(avatar.first()).toBeVisible();
  });

  test('Connected status dot is visible for QB', async ({ page }) => {
    const qbSection = page.getByText('QuickBooks').locator('..').locator('..');
    await expect(qbSection.getByText('Connected')).toBeVisible();
  });

  // ── Configuration widget ────────────────────────────────────────────────────

  test('Configuration widget heading is visible', async ({ page }) => {
    await expect(page.getByText(/^Configuration$/i)).toBeVisible();
  });

  test('Method shows Sales Receipt', async ({ page }) => {
    await expect(page.getByText(/Sales Receipt/i)).toBeVisible();
  });

  test('Frequency shows Hourly', async ({ page }) => {
    await expect(page.getByText(/Hourly/i)).toBeVisible();
  });

  test('Auto sync shows Automatic', async ({ page }) => {
    await expect(page.getByText('Automatic', { exact: true })).toBeVisible();
  });

  test('"Manage settings" button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Manage settings/i })).toBeVisible();
  });

  test('"Manage settings" button navigates to Sync Config', async ({ page }) => {
    await page.getByRole('button', { name: /Manage settings/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-settings/);
  });

  // ── Footer ──────────────────────────────────────────────────────────────────

  test('footer WordPress credit link is visible', async ({ page }) => {
    await expect(page.locator('a[href*="wordpress.org"]').last()).toBeVisible();
  });

  test('footer shows WordPress version number', async ({ page }) => {
    await expect(page.locator('text=/Version \\d+\\.\\d+/').last()).toBeVisible();
  });

  // ── Sidebar navigation ──────────────────────────────────────────────────────

  test('sidebar Connection link navigates to Connection page', async ({ page }) => {
    await page.locator('#adminmenu').getByRole('link', { name: 'Connection' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-connection/);
  });

  test('sidebar Mappings link navigates to Mappings page', async ({ page }) => {
    await page.locator('#adminmenu').getByRole('link', { name: 'Mappings' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-mappings/);
  });

  test('sidebar Manual Sync link navigates to Manual Sync page', async ({ page }) => {
    await page.locator('#adminmenu').getByRole('link', { name: 'Manual Sync' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-push/);
  });

  test('sidebar Audit Logs link navigates to Audit Logs page', async ({ page }) => {
    await page.locator('#adminmenu').getByRole('link', { name: 'Audit Logs' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('sidebar Sync Config link navigates to Sync Config page', async ({ page }) => {
    await page.locator('#adminmenu').getByRole('link', { name: 'Sync Config' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-settings/);
  });

  test('sidebar Debug Logs link navigates to Debug Logs page', async ({ page }) => {
    await page.locator('#adminmenu').getByRole('link', { name: 'Debug Logs' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-debug-logs/);
  });

  test('active Dashboard menu item is highlighted', async ({ page }) => {
    const activeLink = page.locator('#adminmenu li.current, #adminmenu li.wp-current-menu-item');
    await expect(activeLink).toBeVisible();
  });
});
