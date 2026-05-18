import { test, expect } from '@playwright/test';
import { loginAsAdmin, PLUGIN_PAGES, TEST_CONFIG } from '../auth';

test.describe('LedgerPort — Audit Logs', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    // Must navigate via sidebar — direct URL returns "not allowed"
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);
    await page.locator('#adminmenu').getByRole('link', { name: 'Audit Logs' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
  });

  // ── Page load ───────────────────────────────────────────────────────────────

  test('Audit Logs page loads without errors', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  });

  test('page URL is ledgerport-logs', async ({ page }) => {
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('page heading is "Audit Logs"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Audit Logs/i }).first()).toBeVisible();
  });

  test('page subtitle mentions sync activity and error logs', async ({ page }) => {
    await expect(page.getByText(/View sync activity and error logs/i)).toBeVisible();
  });

  // ── Controls ─────────────────────────────────────────────────────────────────

  test('search/filter input is visible', async ({ page }) => {
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('"Show N" rows-per-page selector is visible', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Show \d+/i })).toBeVisible();
  });

  // ── Table columns ────────────────────────────────────────────────────────────

  test('table has # (row number) column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^#$/ }).first()).toBeVisible();
  });

  test('table has Created column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Created$/ }).first()).toBeVisible();
  });

  test('table has Type column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Type$/ }).first()).toBeVisible();
  });

  test('table has Status column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Status$/ }).first()).toBeVisible();
  });

  test('table has Details column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Details$/ }).first()).toBeVisible();
  });

  test('table has Title column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Title$/ }).first()).toBeVisible();
  });

  // ── Table data ───────────────────────────────────────────────────────────────

  test('audit log table contains at least one row', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible();
  });

  test('log entries show sync activity descriptions', async ({ page }) => {
    await expect(page.locator('text=/Synced \\d+ orders?|Updated product|Created product/i').first()).toBeVisible();
  });

  test('log entries show "success" status badge', async ({ page }) => {
    await expect(page.locator('text=/^success$/i').first()).toBeVisible();
  });

  test('log entries show type badges', async ({ page }) => {
    await expect(page.locator('text=/queue_run|mapping_update|sync|Order|Product/i').first()).toBeVisible();
  });

  test('log entries show timestamp (relative time)', async ({ page }) => {
    await expect(page.locator('text=/minutes? ago|hours? ago|days? ago/i').first()).toBeVisible();
  });

  test('"partial_success" status badge is rendered where applicable', async ({ page }) => {
    const badge = page.locator('text=/partial_success/i');
    // May or may not have entries — check it renders correctly if present
    const count = await badge.count();
    if (count > 0) {
      await expect(badge.first()).toBeVisible();
    }
  });

  test('"failed" status badge is rendered where applicable', async ({ page }) => {
    const badge = page.locator('text=/^failed$/i');
    const count = await badge.count();
    if (count > 0) {
      await expect(badge.first()).toBeVisible();
    }
  });

  // ── Pagination ───────────────────────────────────────────────────────────────

  test('pagination shows total entries count', async ({ page }) => {
    await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  });

  // ── Sidebar active state ──────────────────────────────────────────────────────

  test('Audit Logs menu item is highlighted in sidebar', async ({ page }) => {
    const link = page.locator('#adminmenu').getByRole('link', { name: /Audit Logs/i });
    const li = link.locator('..');
    await expect(li).toHaveClass(/current|active/);
  });

  // ── Dashboard cross-link ──────────────────────────────────────────────────────

  test('"View error log" on dashboard links here', async ({ page }) => {
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await page.waitForTimeout(2000);
    // "View error log" is a button on the dashboard, not a link
    await page.getByRole('button', { name: /View error log/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-logs/);
    await expect(page.getByRole('heading', { name: /Audit Logs/i }).first()).toBeVisible();
  });

  test('"View all" on dashboard recent activity links here', async ({ page }) => {
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2500);
    await page.getByRole('link', { name: /View all/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/ledgerport-logs/);
  });
});
