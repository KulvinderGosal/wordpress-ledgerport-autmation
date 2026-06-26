/**
 * @section Dashboard
 * @tag @dashboard @navigation
 * LP-DASH-NAV — Sidebar navigation links from Dashboard
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Dashboard — Sidebar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-NAV-001 | LedgerPort menu item is visible in sidebar', async ({ page }) => {
    await expect(page.getByRole('link', { name: /^ledgerport$/i })).toBeVisible();
  });

  test('LP-DASH-NAV-002 | Dashboard sub-menu link is active/highlighted', async ({ page }) => {
    const dashLink = page.getByRole('link', { name: 'Dashboard' }).first();
    await expect(dashLink).toBeVisible();
  });

  test('LP-DASH-NAV-003 | clicking "Connection" navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Connection' }).click();
    await expect(page).toHaveURL(/ledgerport-connection/);
  });

  test('LP-DASH-NAV-004 | clicking "Mappings" navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Mappings' }).click();
    await expect(page).toHaveURL(/ledgerport-mappings/);
  });

  test('LP-DASH-NAV-005 | clicking "Manual Sync" navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Manual Sync' }).click();
    await expect(page).toHaveURL(/ledgerport-manual-sync/);
  });

  test('LP-DASH-NAV-006 | clicking "Audit Logs" navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Audit Logs' }).click();
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('LP-DASH-NAV-007 | clicking "Sync Config" navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Sync Config' }).click();
    await expect(page).toHaveURL(/ledgerport-sync-config/);
  });

  test('LP-DASH-NAV-008 | clicking "Debug Logs" navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Debug Logs' }).click();
    await expect(page).toHaveURL(/ledgerport-debug-logs/);
  });
});
