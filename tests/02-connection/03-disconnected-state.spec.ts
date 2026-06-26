/**
 * @section Connection
 * @tag @connection @disconnected
 * LP-CONN-DIS — Disconnected state: connect banner, CTA, access restrictions
 * NOTE: These tests validate behavior when plugin is NOT connected.
 * Run only against a staging environment in a disconnected state.
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Connection — Disconnected State UI', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.connection);
  });

  test('LP-CONN-DIS-001 | page loads without 500 error when disconnected', async ({ page }) => {
    await expect(page.locator('#wpbody-content')).toBeVisible();
  });

  test('LP-CONN-DIS-002 | "Connect" CTA button is visible when QB is not connected', async ({ page }) => {
    // Passes when disconnected; skips gracefully if already connected
    const connectBtn = page.getByRole('button', { name: /connect quickbooks/i });
    const connected = page.getByText(/connected/i);
    if (await connected.count() === 0) {
      await expect(connectBtn).toBeVisible();
    } else {
      test.skip();
    }
  });
});

test.describe('Connection — Access Control for Restricted Pages (Disconnected)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('LP-CONN-DIS-010 | Manual Sync page is accessible (URL loads)', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.manualSync);
    await expect(page).toHaveURL(/ledgerport-manual-sync/);
  });

  test('LP-CONN-DIS-011 | Audit Logs page URL is correct (?page=ledgerport-logs)', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
    // BUG-FIX: The correct slug is ledgerport-logs, NOT ledgerport-audit-logs
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('LP-CONN-DIS-012 | Sync Config page is accessible (URL loads)', async ({ page }) => {
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await expect(page).toHaveURL(/ledgerport-sync-config/);
  });
});
