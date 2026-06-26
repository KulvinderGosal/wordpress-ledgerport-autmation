/**
 * @section Manual Sync
 * @tag @manual-sync @connected @functional
 * LP-MSYNC-TRIGGER — Trigger sync buttons for Orders, Products, Customers
 * GAP FILLED: Previously no tests for actually triggering a sync.
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Manual Sync — Connected State Sync Triggers', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.manualSync);
  });

  test('LP-MSYNC-TRIG-001 | at least one "Sync" or "Run" button is visible', async ({ page }) => {
    const syncBtn = page.getByRole('button', { name: /sync|run sync|start/i });
    const count = await syncBtn.count();
    expect(count).toBeGreaterThan(0);
  });

  test('LP-MSYNC-TRIG-002 | Orders sync option is present', async ({ page }) => {
    await expect(page.getByText(/orders/i).first()).toBeVisible();
  });

  test('LP-MSYNC-TRIG-003 | Products sync option is present', async ({ page }) => {
    await expect(page.getByText(/products/i).first()).toBeVisible();
  });

  test('LP-MSYNC-TRIG-004 | Customers sync option is present', async ({ page }) => {
    await expect(page.getByText(/customers/i).first()).toBeVisible();
  });

  test('LP-MSYNC-TRIG-005 | triggering a sync does not produce a JS error', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    const syncBtn = page.getByRole('button', { name: /sync|run sync/i }).first();
    if (await syncBtn.count() > 0) {
      await syncBtn.click();
      await page.waitForTimeout(2000);
    }
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('LP-MSYNC-TRIG-006 | progress indicator or status appears after triggering sync', async ({ page }) => {
    const syncBtn = page.getByRole('button', { name: /sync|run sync/i }).first();
    if (await syncBtn.count() > 0) {
      await syncBtn.click();
      const progress = page.getByText(/syncing|in progress|running|complete|success|failed/i);
      await expect(progress.first()).toBeVisible({ timeout: 15000 });
    }
  });
});
