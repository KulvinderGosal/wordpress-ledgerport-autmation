import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';

test.describe('LedgerPort — Debug Logs', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
  });

  // ── Page load ───────────────────────────────────────────────────────────────

  test('Debug Logs page loads without errors', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  });

  test('page heading is "Debug Logs"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Debug Logs/i }).first()).toBeVisible();
  });

  test('page subtitle is correct', async ({ page }) => {
    await expect(page.getByText(/View, download, and manage plugin debug log files/i)).toBeVisible();
  });

  test('LedgerPort logo is visible', async ({ page }) => {
    await expect(page.locator('svg[aria-label="LedgerPort"]').first()).toBeVisible();
  });

  // ── Log Files section ───────────────────────────────────────────────────────

  test('"Log Files" section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log Files' })).toBeVisible();
  });

  test('"Refresh" button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Refresh/i })).toBeVisible();
  });

  test('"Refresh" button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Refresh/i })).toBeEnabled();
  });

  test('storage path is displayed', async ({ page }) => {
    await expect(page.getByText(/wp-content\/uploads\/ledgerport\/logs\//i)).toBeVisible();
  });

  test('storage path is rendered in a code/pre element', async ({ page }) => {
    await expect(page.locator('code, pre, [class*="path"], [class*="code"]').filter({ hasText: /ledgerport\/logs/ }).first()).toBeVisible();
  });

  // ── Empty state ─────────────────────────────────────────────────────────────

  test('empty state message is shown when no log files exist', async ({ page }) => {
    await expect(page.getByText(/No log files found/i)).toBeVisible();
  });

  test('empty state guides user to enable debug logging', async ({ page }) => {
    await expect(page.getByText(/Enable debug logging in Settings/i)).toBeVisible();
  });

  test('empty state mentions Misc settings tab', async ({ page }) => {
    await expect(page.getByText(/Settings > Misc/i)).toBeVisible();
  });

  // ── Refresh interaction ─────────────────────────────────────────────────────

  test('clicking Refresh button does not cause a page error', async ({ page }) => {
    await page.getByRole('button', { name: /Refresh/i }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).not.toContainText(/Fatal error/i);
  });

  test('page content is still visible after clicking Refresh', async ({ page }) => {
    await page.getByRole('button', { name: /Refresh/i }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('heading', { name: 'Log Files' })).toBeVisible();
  });

  // ── Sidebar ─────────────────────────────────────────────────────────────────

  test('Debug Logs menu item is highlighted in sidebar', async ({ page }) => {
    const link = page.locator('#adminmenu').getByRole('link', { name: /Debug Logs/i });
    const li = link.locator('..');
    await expect(li).toHaveClass(/current|active/);
  });
});
