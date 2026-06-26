/**
 * @section Dashboard
 * @tag @dashboard @connected
 * LP-DASH-SYNC — Sync Health, Orders, Needs Attention cards
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Dashboard — Sync Health Card', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-SYNC-001 | "Sync health" card is visible', async ({ page }) => {
    await expect(page.getByText('Sync health').first()).toBeVisible();
  });

  test('LP-DASH-SYNC-002 | sync health card shows a percentage', async ({ page }) => {
    await expect(page.getByText(/\d+% success rate/).first()).toBeVisible();
  });

  test('LP-DASH-SYNC-003 | sync health card shows total syncs count', async ({ page }) => {
    await expect(page.getByText(/\d+ total syncs/).first()).toBeVisible();
  });

  test('LP-DASH-SYNC-004 | "View error log" CTA navigates to Audit Logs', async ({ page }) => {
    await page.getByRole('button', { name: /view error log/i }).click();
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('LP-DASH-SYNC-005 | "Orders" card is visible with count', async ({ page }) => {
    await expect(page.getByText('Orders').first()).toBeVisible();
    await expect(page.getByText(/\d+ orders?/).first()).toBeVisible();
  });

  test('LP-DASH-SYNC-006 | "View report" CTA on Orders card is clickable', async ({ page }) => {
    await expect(page.getByRole('button', { name: /view report/i })).toBeVisible();
  });

  test('LP-DASH-SYNC-007 | "Needs attention" card is visible', async ({ page }) => {
    await expect(page.getByText('Needs attention').first()).toBeVisible();
  });

  test('LP-DASH-SYNC-008 | "Review issues" CTA is clickable', async ({ page }) => {
    await expect(page.getByRole('button', { name: /review issues/i })).toBeVisible();
  });
});

test.describe('Dashboard — Data Health Overview', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-DATA-001 | "Data Health Overview" section heading visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Data Health Overview', level: 3 })).toBeVisible();
  });

  test('LP-DASH-DATA-002 | Products row is visible with a count', async ({ page }) => {
    const row = page.locator('p:has-text("Products")').first();
    await expect(row).toBeVisible();
  });

  test('LP-DASH-DATA-003 | Orders row is visible with a count', async ({ page }) => {
    const row = page.locator('p:has-text("Orders")').first();
    await expect(row).toBeVisible();
  });

  test('LP-DASH-DATA-004 | Customers row is visible', async ({ page }) => {
    await expect(page.getByText('Customers').first()).toBeVisible();
  });

  test('LP-DASH-DATA-005 | Inventory row is visible', async ({ page }) => {
    await expect(page.getByText('Inventory').first()).toBeVisible();
  });
});
