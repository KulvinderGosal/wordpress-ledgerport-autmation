/**
 * @section Dashboard
 * @tag @dashboard @interactive
 * LP-DASH-DATE — Date filter toolbar interactions (GAP: was not covered before)
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Dashboard — Date Filter Toolbar', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-DATE-001 | "Syncing your store" label is visible', async ({ page }) => {
    await expect(page.getByText(/syncing.*your store/i)).toBeVisible();
  });

  test('LP-DASH-DATE-002 | date range dropdown is present with default value', async ({ page }) => {
    const dropdown = page.locator('[role="combobox"]').first();
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toContainText(/last 7 days|yesterday|last 30 days|custom/i);
  });

  test('LP-DASH-DATE-003 | date range dropdown opens on click', async ({ page }) => {
    const dropdown = page.locator('[role="combobox"]').first();
    await dropdown.click();
    await expect(page.getByText('Yesterday')).toBeVisible();
  });

  test('LP-DASH-DATE-004 | selecting "Yesterday" updates the date range label', async ({ page }) => {
    const dropdown = page.locator('[role="combobox"]').first();
    await dropdown.click();
    await page.getByText('Yesterday').click();
    await expect(dropdown).toContainText(/yesterday/i);
  });

  test('LP-DASH-DATE-005 | selecting "Last 30 days" updates the date range label', async ({ page }) => {
    const dropdown = page.locator('[role="combobox"]').first();
    await dropdown.click();
    await page.getByText(/last 30 days/i).click();
    await expect(dropdown).toContainText(/last 30 days/i);
  });

  test('LP-DASH-DATE-006 | date range button shows formatted date range string', async ({ page }) => {
    await expect(page.getByRole('button', { name: /\d{4}/ }).first()).toBeVisible();
  });

  test('LP-DASH-DATE-007 | "Last sync" timestamp is visible', async ({ page }) => {
    await expect(page.getByText(/last sync:/i)).toBeVisible();
  });
});

test.describe('Dashboard — Sync Now Button', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-SYNC-NOW-001 | "Sync now" button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sync now/i })).toBeVisible();
  });

  test('LP-DASH-SYNC-NOW-002 | "Sync now" button is enabled when connected', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sync now/i })).toBeEnabled();
  });

  test('LP-DASH-SYNC-NOW-003 | "Sync now" button click triggers a sync action (no JS error)', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.getByRole('button', { name: /sync now/i }).click();
    await page.waitForTimeout(2000);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});
