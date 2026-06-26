/**
 * @section Connection
 * @tag @connection @smoke
 * LP-CONN-LOAD — Connection page load, header, heading
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Connection — Page Load & Chrome', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.connection);
  });

  test('LP-CONN-LOAD-001 | page title contains "Connection"', async ({ page }) => {
    await expect(page).toHaveTitle(/Connection/);
  });

  test('LP-CONN-LOAD-002 | URL resolves to ?page=ledgerport-connection', async ({ page }) => {
    expect(page.url()).toContain('page=ledgerport-connection');
  });

  test('LP-CONN-LOAD-003 | LedgerPort logo is visible in plugin header', async ({ page }) => {
    await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
  });

  test('LP-CONN-LOAD-004 | page heading "Connection" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Connection', level: 1 })).toBeVisible();
  });

  test('LP-CONN-LOAD-005 | WordPress admin footer is present', async ({ page }) => {
    await expect(page.locator('#wpfooter')).toBeVisible();
  });

  test('LP-CONN-LOAD-006 | no console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await goToPluginPage(page, CORRECT_PAGES.connection);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});
