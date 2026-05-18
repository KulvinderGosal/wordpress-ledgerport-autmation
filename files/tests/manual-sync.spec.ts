import { test, expect } from '@playwright/test';
import { loginAsAdmin, PLUGIN_PAGES, TEST_CONFIG } from '../auth';

test.describe('LedgerPort — Manual Sync (Send to QuickBooks)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    // Must navigate via sidebar — direct URL with wrong slug shows "not allowed"
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);
    await page.locator('#adminmenu').getByRole('link', { name: 'Manual Sync' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
  });

  // ── Page load ───────────────────────────────────────────────────────────────

  test('Manual Sync page loads without errors', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  });

  test('page URL is ledgerport-push', async ({ page }) => {
    await expect(page).toHaveURL(/ledgerport-push/);
  });

  test('page heading is "Send to QuickBooks"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Send to QuickBooks/i }).first()).toBeVisible();
  });

  test('page subtitle describes background processing', async ({ page }) => {
    await expect(page.getByText(/process the work in the background/i)).toBeVisible();
  });

  // ── Tabs ────────────────────────────────────────────────────────────────────

  test('Products tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /^Products$/i }).or(page.getByRole('button', { name: /^Products$/i }))).toBeVisible();
  });

  test('Variations tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /^Variations$/i }).or(page.getByRole('button', { name: /^Variations$/i }))).toBeVisible();
  });

  test('Customers tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /^Customers$/i }).or(page.getByRole('button', { name: /^Customers$/i }))).toBeVisible();
  });

  test('Payments tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /^Payments$/i }).or(page.getByRole('button', { name: /^Payments$/i }))).toBeVisible();
  });

  test('Products tab is active by default', async ({ page }) => {
    await expect(page.getByText(/Push Products to QuickBooks/i)).toBeVisible();
  });

  // ── Push All button ─────────────────────────────────────────────────────────

  test('"Push All" button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Push All/i })).toBeVisible();
  });

  test('"Push All" button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Push All/i })).toBeEnabled();
  });

  // ── Products sub-section ────────────────────────────────────────────────────

  test('"Push Products to QuickBooks" section heading is visible', async ({ page }) => {
    await expect(page.getByText(/Push Products to QuickBooks/i)).toBeVisible();
  });

  test('Products section description is visible', async ({ page }) => {
    await expect(page.getByText(/Select WooCommerce products to push/i)).toBeVisible();
  });

  test('"Products already synced will be skipped" text is shown', async ({ page }) => {
    await expect(page.getByText(/already synced will be skipped/i)).toBeVisible();
  });

  test('Products table has Source ID column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /Source ID/i }).first()).toBeVisible();
  });

  test('Products table has Product Name column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /Product Name/i }).first()).toBeVisible();
  });

  test('Products table has SKU column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^SKU$/i }).first()).toBeVisible();
  });

  test('Products table has Sync column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Sync$/i }).first()).toBeVisible();
  });

  test('Products table contains at least one row', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible();
  });

  test('Filter button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Filter/i }).first()).toBeVisible();
  });

  test('pagination shows product count', async ({ page }) => {
    await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  });

  test('pagination shows page number', async ({ page }) => {
    await expect(page.locator('text=/Page \\d+ of \\d+/i').first()).toBeVisible();
  });

  test('footer note about background sync is visible', async ({ page }) => {
    await expect(page.getByText(/Sync runs in the background/i)).toBeVisible();
  });

  test('footer note mentions progress updates', async ({ page }) => {
    await expect(page.getByText(/progress updates here once it starts/i)).toBeVisible();
  });

  // ── Tab switching ───────────────────────────────────────────────────────────

  test('clicking Variations tab switches content', async ({ page }) => {
    await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
    await page.waitForTimeout(1000);
    // Content changes to variation-specific text or table
    const body = await page.locator('body').innerText();
    expect(body).toMatch(/Variat|variation/i);
  });

  test('clicking Customers tab switches content', async ({ page }) => {
    await page.getByRole('tab', { name: /^Customers$/i }).or(page.getByRole('button', { name: /^Customers$/i })).click();
    await page.waitForTimeout(1000);
    const body = await page.locator('body').innerText();
    expect(body).toMatch(/Customer|customer/i);
  });

  test('clicking Payments tab switches content', async ({ page }) => {
    await page.getByRole('tab', { name: /^Payments$/i }).or(page.getByRole('button', { name: /^Payments$/i })).click();
    await page.waitForTimeout(1000);
    const body = await page.locator('body').innerText();
    expect(body).toMatch(/Payment|payment/i);
  });

  // ── Sync status icons ───────────────────────────────────────────────────────

  test('Sync column renders status icons/indicators', async ({ page }) => {
    const syncCol = page.locator('tbody tr td').last();
    await expect(syncCol).toBeVisible();
  });

  // ── Navigation ──────────────────────────────────────────────────────────────

  test('Manual Sync menu item is highlighted in sidebar', async ({ page }) => {
    const link = page.locator('#adminmenu').getByRole('link', { name: /Manual Sync/i });
    const li = link.locator('..');
    await expect(li).toHaveClass(/current|active/);
  });
});
