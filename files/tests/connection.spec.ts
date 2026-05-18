import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';

test.describe('LedgerPort — Connection', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, PLUGIN_PAGES.connection);
  });

  // ── Page load ───────────────────────────────────────────────────────────────

  test('Connection page loads without errors', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  });

  test('page heading is "Connection"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^Connection$/i }).first()).toBeVisible();
  });

  test('page subtitle is visible', async ({ page }) => {
    await expect(page.locator('#wpcontent').getByText(/Manage your accounting foundation and store connection/i).first()).toBeVisible();
  });

  test('LedgerPort logo is visible in header', async ({ page }) => {
    await expect(page.locator('svg[aria-label="LedgerPort"]').first()).toBeVisible();
  });

  // ── QuickBooks card ─────────────────────────────────────────────────────────

  test('QuickBooks Online card is visible', async ({ page }) => {
    await expect(page.getByText(/QuickBooks Online/i).first()).toBeVisible();
  });

  test('QuickBooks card shows "Connected" status badge', async ({ page }) => {
    const card = page.locator('[class*="card"], [class*="provider"]').filter({ hasText: /QuickBooks/i }).first();
    await expect(card.getByText(/Connected/i)).toBeVisible();
  });

  test('QuickBooks card shows "Locked" badge', async ({ page }) => {
    await expect(page.getByText(/Locked/i)).toBeVisible();
  });

  test('QuickBooks card shows company name', async ({ page }) => {
    await expect(page.getByText(/WordPress LedgerPort/i)).toBeVisible();
  });

  test('QuickBooks card shows company ID', async ({ page }) => {
    await expect(page.getByText(/QuickBooks company ID:/i)).toBeVisible();
    await expect(page.locator('text=/\\d{10,}/').first()).toBeVisible();
  });

  test('QuickBooks card shows connected email address', async ({ page }) => {
    await expect(page.getByText(/kgosal@awesomemotive\.com/i)).toBeVisible();
  });

  test('QuickBooks card shows locked account info text', async ({ page }) => {
    await expect(page.getByText(/accounting platform is fixed/i)).toBeVisible();
  });

  // ── WooCommerce card ────────────────────────────────────────────────────────

  test('WooCommerce card is visible', async ({ page }) => {
    await expect(page.getByText(/WooCommerce/i).first()).toBeVisible();
  });

  test('WooCommerce card shows "Connected" status badge', async ({ page }) => {
    const card = page.locator('[class*="card"], [class*="provider"]').filter({ hasText: /WooCommerce/i }).first();
    await expect(card.getByText(/Connected/i)).toBeVisible();
  });

  test('WooCommerce card shows store domain', async ({ page }) => {
    await expect(page.getByText(/qastaging\.pushengage\.com/i)).toBeVisible();
  });

  test('WooCommerce card shows "API key active" indicator', async ({ page }) => {
    await expect(page.getByText(/API key active/i)).toBeVisible();
  });

  test('WooCommerce card shows webhooks count', async ({ page }) => {
    await expect(page.locator('text=/\\d+ webhooks?/i').first()).toBeVisible();
  });

  test('"Disconnect" button is visible on WooCommerce card', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Disconnect/i })).toBeVisible();
  });

  test('"Disconnect" button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Disconnect/i })).toBeEnabled();
  });

  // ── Plan card ───────────────────────────────────────────────────────────────

  test('Free Plan card is visible', async ({ page }) => {
    await expect(page.getByText(/Free Plan/i)).toBeVisible();
  });

  test('Free Plan shows "Active" badge', async ({ page }) => {
    await expect(page.getByText(/Active/i).first()).toBeVisible();
  });

  test('Free Plan shows upgrade prompt text', async ({ page }) => {
    await expect(page.getByText(/Upgrade to unlock premium features/i)).toBeVisible();
  });

  test('"Manage Billing" link is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Manage Billing/i })).toBeVisible();
  });

  test('"Manage Billing" link opens in new tab (external)', async ({ page }) => {
    const link = page.getByRole('link', { name: /Manage Billing/i });
    const target = await link.getAttribute('target');
    const rel = await link.getAttribute('rel');
    expect(target === '_blank' || (rel ?? '').includes('noopener')).toBeTruthy();
  });

  // ── Usage & Limits ──────────────────────────────────────────────────────────

  test('Usage & Limits section heading is visible', async ({ page }) => {
    await expect(page.getByText(/USAGE & LIMITS|Usage & Limits/i)).toBeVisible();
  });

  test('"Orders synced this month" metric is visible', async ({ page }) => {
    await expect(page.getByText(/Orders synced this month/i)).toBeVisible();
  });

  test('Orders synced count shows "X of 50 included"', async ({ page }) => {
    await expect(page.locator('text=/\\d+ of 50 included/i').first()).toBeVisible();
  });

  test('progress bar is rendered for orders synced', async ({ page }) => {
    await expect(page.locator('.rounded-full[style*="width"], .bg-emerald-500').first()).toBeVisible();
  });

  test('"Active businesses" metric is visible', async ({ page }) => {
    await expect(page.getByText(/Active businesses/i)).toBeVisible();
  });

  test('Active businesses shows "1 of 1 included"', async ({ page }) => {
    await expect(page.locator('text=/1 of 1 included/i').first()).toBeVisible();
  });

  test('"Team members" metric is visible', async ({ page }) => {
    await expect(page.getByText(/Team members/i)).toBeVisible();
  });

  test('"Upgrade your plan anytime" link is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Upgrade your plan anytime/i })).toBeVisible();
  });

  // ── Sidebar active state ────────────────────────────────────────────────────

  test('Connection menu item is highlighted in sidebar', async ({ page }) => {
    const link = page.locator('#adminmenu').getByRole('link', { name: /Connection/i });
    const liParent = link.locator('..');
    await expect(liParent).toHaveClass(/current|active/);
  });
});
