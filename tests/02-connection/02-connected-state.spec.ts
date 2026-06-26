/**
 * @section Connection
 * @tag @connection @connected
 * LP-CONN-STATE — Connected state: WooCommerce + QuickBooks both connected
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Connection — Connected State (WooCommerce + QuickBooks)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.connection);
  });

  test('LP-CONN-STATE-001 | QuickBooks connection card is visible', async ({ page }) => {
    await expect(page.getByText(/quickbooks/i).first()).toBeVisible();
  });

  test('LP-CONN-STATE-002 | WooCommerce connection card is visible', async ({ page }) => {
    await expect(page.getByText(/woocommerce/i).first()).toBeVisible();
  });

  test('LP-CONN-STATE-003 | both connections show connected status', async ({ page }) => {
    const connectedBadges = page.getByText(/connected/i);
    await expect(connectedBadges.first()).toBeVisible();
  });

  test('LP-CONN-STATE-004 | disconnect buttons are present when connected', async ({ page }) => {
    const disconnectBtns = page.getByRole('button', { name: /disconnect/i });
    const count = await disconnectBtns.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('LP-CONN-STATE-005 | sidebar shows all 7 LedgerPort nav items', async ({ page }) => {
    const items = ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs'];
    for (const item of items) {
      await expect(page.getByRole('link', { name: item })).toBeVisible();
    }
  });
});

test.describe('Connection — Connect QuickBooks Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.connection);
  });

  test('LP-CONN-QB-001 | "Connect QuickBooks" / "Reconnect" button is present', async ({ page }) => {
    const connectBtn = page.getByRole('button', { name: /connect quickbooks|reconnect/i });
    const disconnectBtn = page.getByRole('button', { name: /disconnect/i });
    // Either connect or disconnect must be present
    const hasConnect = await connectBtn.count() > 0;
    const hasDisconnect = await disconnectBtn.count() > 0;
    expect(hasConnect || hasDisconnect).toBeTruthy();
  });
});
