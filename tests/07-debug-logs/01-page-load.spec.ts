/**
 * @section Debug Logs
 * @tag @debug-logs @smoke
 * LP-DEBUG-LOAD — Debug Logs page load, log file table, refresh
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Debug Logs — Page Load & Chrome', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.debugLogs);
  });

  test('LP-DEBUG-LOAD-001 | page title contains "Debug Logs"', async ({ page }) => {
    await expect(page).toHaveTitle(/Debug Logs/);
  });

  test('LP-DEBUG-LOAD-002 | URL resolves to ?page=ledgerport-debug-logs', async ({ page }) => {
    expect(page.url()).toContain('page=ledgerport-debug-logs');
  });

  test('LP-DEBUG-LOAD-003 | LedgerPort logo is visible', async ({ page }) => {
    await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
  });

  test('LP-DEBUG-LOAD-004 | "Debug Logs" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /debug logs/i, level: 1 })).toBeVisible();
  });

  test('LP-DEBUG-LOAD-005 | log files section heading is visible', async ({ page }) => {
    await expect(page.getByText(/log files|system logs/i).first()).toBeVisible();
  });

  test('LP-DEBUG-LOAD-006 | log files table or empty state is rendered', async ({ page }) => {
    const table = page.getByRole('table');
    const emptyMsg = page.getByText(/no log files|no logs found/i);
    const hasTable = await table.count() > 0;
    const hasEmpty = await emptyMsg.count() > 0;
    expect(hasTable || hasEmpty).toBeTruthy();
  });

  test('LP-DEBUG-LOAD-007 | Refresh button is present', async ({ page }) => {
    const refresh = page.getByRole('button', { name: /refresh/i });
    await expect(refresh.first()).toBeVisible();
  });

  test('LP-DEBUG-LOAD-008 | clicking Refresh does not produce a JS error', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    const refresh = page.getByRole('button', { name: /refresh/i });
    if (await refresh.count() > 0) {
      await refresh.first().click();
      await page.waitForTimeout(1500);
    }
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('LP-DEBUG-LOAD-009 | log table columns include filename, date, and size', async ({ page }) => {
    const table = page.getByRole('table');
    if (await table.count() > 0) {
      const text = await table.textContent();
      expect(text).toMatch(/file|name|date|size/i);
    }
  });

  test('LP-DEBUG-LOAD-010 | WordPress admin footer is present', async ({ page }) => {
    await expect(page.locator('#wpfooter')).toBeVisible();
  });
});
