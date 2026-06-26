/**
 * @section Dashboard
 * @tag @dashboard @smoke
 * LP-DASH-LOAD — Page load, title, WP chrome, header branding
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Dashboard — Page Load & Chrome', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-LOAD-001 | page title contains "Dashboard"', async ({ page }) => {
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('LP-DASH-LOAD-002 | URL resolves to ?page=ledgerport', async ({ page }) => {
    expect(page.url()).toContain('page=ledgerport');
  });

  test('LP-DASH-LOAD-003 | LedgerPort logo is visible in header', async ({ page }) => {
    await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
  });

  test('LP-DASH-LOAD-004 | Dark mode toggle button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /dark mode/i })).toBeVisible();
  });

  test('LP-DASH-LOAD-005 | Help button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /help/i })).toBeVisible();
  });

  test('LP-DASH-LOAD-006 | page heading "Overview" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Overview', level: 1 })).toBeVisible();
  });

  test('LP-DASH-LOAD-007 | sub-heading description is visible', async ({ page }) => {
    await expect(page.getByText('Sync health, recent activity, and what needs your attention.')).toBeVisible();
  });

  test('LP-DASH-LOAD-008 | WordPress admin footer is present', async ({ page }) => {
    await expect(page.locator('#wpfooter')).toBeVisible();
  });

  test('LP-DASH-LOAD-009 | no console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});
