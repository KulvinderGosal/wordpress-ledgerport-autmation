/**
 * @section Audit Logs
 * @tag @audit-logs @smoke
 * LP-AUDIT-LOAD — Audit Logs page load & UI elements
 * IMPORTANT: Correct URL slug is "ledgerport-logs" (NOT "ledgerport-audit-logs")
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Audit Logs — Page Load & Chrome', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
  });

  test('LP-AUDIT-LOAD-001 | page title contains "Audit Logs"', async ({ page }) => {
    await expect(page).toHaveTitle(/Audit Logs/);
  });

  test('LP-AUDIT-LOAD-002 | URL uses correct slug "ledgerport-logs"', async ({ page }) => {
    expect(page.url()).toContain('page=ledgerport-logs');
  });

  test('LP-AUDIT-LOAD-003 | URL does NOT use wrong slug "ledgerport-audit-logs"', async ({ page }) => {
    // Regression guard: wrong slug caused WP Error on staging
    expect(page.url()).not.toContain('page=ledgerport-audit-logs');
  });

  test('LP-AUDIT-LOAD-004 | LedgerPort logo is visible', async ({ page }) => {
    await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
  });

  test('LP-AUDIT-LOAD-005 | "Audit Logs" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /audit logs/i, level: 1 })).toBeVisible();
  });

  test('LP-AUDIT-LOAD-006 | page body renders without WordPress error', async ({ page }) => {
    await expect(page.getByText(/wordpress error|sorry.*trouble|cannot be found/i)).toHaveCount(0);
  });

  test('LP-AUDIT-LOAD-007 | no console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});
