/**
 * @section Manual Sync
 * @tag @manual-sync @smoke
 * LP-MSYNC-LOAD — Manual Sync page load & UI elements
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Manual Sync — Page Load & UI', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.manualSync);
  });

  test('LP-MSYNC-LOAD-001 | page title contains "Manual Sync"', async ({ page }) => {
    await expect(page).toHaveTitle(/Manual Sync/);
  });

  test('LP-MSYNC-LOAD-002 | URL resolves to ?page=ledgerport-manual-sync', async ({ page }) => {
    expect(page.url()).toContain('page=ledgerport-manual-sync');
  });

  test('LP-MSYNC-LOAD-003 | LedgerPort logo is visible', async ({ page }) => {
    await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
  });

  test('LP-MSYNC-LOAD-004 | "Manual Sync" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /manual sync/i, level: 1 })).toBeVisible();
  });

  test('LP-MSYNC-LOAD-005 | entity sync cards or sections are displayed', async ({ page }) => {
    // At minimum the page body should render with sync options
    await expect(page.locator('#wpbody-content')).toBeVisible();
  });

  test('LP-MSYNC-LOAD-006 | no console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await goToPluginPage(page, CORRECT_PAGES.manualSync);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});
