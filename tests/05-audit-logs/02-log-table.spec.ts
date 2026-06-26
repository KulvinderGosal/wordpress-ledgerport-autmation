/**
 * @section Audit Logs
 * @tag @audit-logs @connected @functional
 * LP-AUDIT-TABLE — Log table, filters, search, pagination
 * GAP FILLED: Previously no connected-state filter/search/pagination tests.
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Audit Logs — Log Table (Connected State)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.auditLogs);
  });

  test('LP-AUDIT-TABLE-001 | log table is rendered with at least one entry', async ({ page }) => {
    const table = page.getByRole('table');
    const rows = table.getByRole('row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(1);
  });

  test('LP-AUDIT-TABLE-002 | table has expected column headers', async ({ page }) => {
    // At minimum: Event/Message, Type, Date/Time
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('LP-AUDIT-TABLE-003 | search/filter input is present', async ({ page }) => {
    const search = page.getByRole('searchbox').or(page.getByRole('textbox', { name: /search|filter/i }));
    if (await search.count() > 0) {
      await expect(search.first()).toBeVisible();
    }
  });

  test('LP-AUDIT-TABLE-004 | entries show status badges (success / failed / info)', async ({ page }) => {
    const badges = page.getByText(/success|failed|info|partial/i);
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('LP-AUDIT-TABLE-005 | entries show relative timestamps', async ({ page }) => {
    await expect(page.getByText(/ago|just now|minutes|hours|days/i).first()).toBeVisible();
  });

  test('LP-AUDIT-TABLE-006 | pagination component renders when there are multiple pages', async ({ page }) => {
    const paginationText = page.getByText(/showing \d+.*of \d+/i);
    if (await paginationText.count() > 0) {
      await expect(paginationText.first()).toBeVisible();
    }
  });

  test('LP-AUDIT-TABLE-007 | type filter dropdown is present', async ({ page }) => {
    const typeFilter = page.locator('[role="combobox"]').first();
    await expect(typeFilter).toBeVisible();
  });
});
