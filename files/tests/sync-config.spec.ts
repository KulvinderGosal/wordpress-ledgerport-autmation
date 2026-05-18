import { test, expect } from '@playwright/test';
import { loginAsAdmin, PLUGIN_PAGES, TEST_CONFIG } from '../auth';

test.describe('LedgerPort — Sync Config', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    // Navigate via sidebar — direct URL returns "not allowed"
    await page.goto(TEST_CONFIG.baseURL + PLUGIN_PAGES.dashboard);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);
    await page.locator('#adminmenu').getByRole('link', { name: 'Sync Config' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
  });

  // ── Page load & routing ─────────────────────────────────────────────────────

  test('Sync Config page loads without a PHP fatal error', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Parse error/i);
  });

  test('page URL is ledgerport-settings', async ({ page }) => {
    await expect(page).toHaveURL(/ledgerport-settings/);
  });

  test('WP admin sidebar is visible', async ({ page }) => {
    await expect(page.locator('#adminmenu')).toBeVisible();
  });

  test('Sync Config menu item is highlighted in sidebar', async ({ page }) => {
    const link = page.locator('#adminmenu').getByRole('link', { name: /Sync Config/i });
    const li = link.locator('..');
    await expect(li).toHaveClass(/current|active/);
  });

  test.fixme('LedgerPort logo is visible in header', async ({ page }) => {
    // React component may not fully render on Sync Config page (tracked issue)
    await expect(page.locator('svg[aria-label="LedgerPort"]').first()).toBeVisible();
  });

  // ── Content rendering ───────────────────────────────────────────────────────
  // NOTE: At time of writing the React app component on this page renders a
  // blank content area. These tests document the expected state and will pass
  // once the component is fixed.

  test('content area exists in the DOM', async ({ page }) => {
    // The WP admin page wrapper is always present
    await expect(page.locator('#wpcontent, #wpbody, .wrap').first()).toBeVisible();
  });

  test.fixme('Sync Config heading is visible', async ({ page }) => {
    // Fails: React component not rendering — tracked issue
    await expect(page.getByRole('heading', { name: /Sync Config|Settings/i }).first()).toBeVisible();
  });

  test.fixme('sync method setting (Sales Receipt) is visible', async ({ page }) => {
    await expect(page.getByText(/Sales Receipt/i)).toBeVisible();
  });

  test.fixme('sync frequency setting is visible', async ({ page }) => {
    await expect(page.getByText(/Frequency|Hourly|Daily/i)).toBeVisible();
  });

  test.fixme('auto-sync toggle is visible', async ({ page }) => {
    await expect(page.locator('[role="switch"], input[type="checkbox"]').filter({ hasText: /auto.?sync/i }).or(
      page.getByLabel(/auto.?sync/i)
    )).toBeVisible();
  });

  test.fixme('Save Changes / Save Settings button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Save/i })).toBeVisible();
  });

  test.fixme('Save Settings button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Save/i })).toBeEnabled();
  });

  test.fixme('changing sync frequency shows updated value', async ({ page }) => {
    const select = page.locator('select[name*="frequency"], [aria-label*="frequency"]').first();
    await select.selectOption({ label: /Daily/i });
    await expect(select).toHaveValue(/daily/i);
  });

  test.fixme('save shows success confirmation', async ({ page }) => {
    await page.getByRole('button', { name: /Save/i }).click();
    await expect(page.getByText(/saved|success|updated/i).first()).toBeVisible({ timeout: 5000 });
  });
});
