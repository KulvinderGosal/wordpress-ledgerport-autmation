/**
 * LedgerPort — Regression coverage for sub-issues of awesomemotive/pushengage-ledgerport#171.
 *
 * Naming:
 *   - LP-FIX-XXX: asserts the EXPECTED post-fix behaviour for a sub-issue I verified as fixed.
 *                 These should PASS in CI.
 *   - LP-BUG-XXX: asserts the EXPECTED behaviour for a still-open sub-issue.
 *                 These will currently FAIL — the failure documents that the bug still reproduces.
 *                 They will start passing automatically when the bug is fixed.
 *
 * State assumptions:
 *   - Staging is in the CONNECTED state (QuickBooks + WooCommerce).
 *   - Account is on Growth Plan or higher (some tests skip if Free is detected).
 *   - Audit Logs contains at least one row that can be expanded.
 *
 * Note: helpers/auth.ts PLUGIN_PAGES uses the intuitive (but currently-broken, see #184)
 * slugs for syncConfig / manualSync / auditLogs. We use CORRECT_PAGES with the slugs
 * the plugin actually registers, so these tests assert behaviour, not the URL bug.
 */
import { test, expect, Page } from '@playwright/test';
import { TEST_CONFIG, PLUGIN_PAGES } from './helpers/auth';

const BASE = 'https://qastaging.pushengage.com';

/**
 * Robust login that doesn't rely on `networkidle` (staging holds long-lived
 * connections that never go idle, which hangs the default helper).
 */
async function login(p: Page) {
  await p.goto(`${BASE}/wp-login.php`, { waitUntil: 'domcontentloaded' });
  await p.locator('#user_login').fill(TEST_CONFIG.username);
  await p.locator('#user_pass').fill(TEST_CONFIG.password);
  await Promise.all([
    p.waitForURL(/wp-admin/, { timeout: 30_000 }),
    p.locator('#wp-submit').click(),
  ]);
}

/** Actual slugs the plugin registers (see #184 for the alias-mismatch bug). */
const CORRECT_PAGES = {
  dashboard:  `${BASE}/wp-admin/admin.php?page=ledgerport`,
  connection: `${BASE}/wp-admin/admin.php?page=ledgerport-connection`,
  mappings:   `${BASE}/wp-admin/admin.php?page=ledgerport-mappings`,
  manualSync: `${BASE}/wp-admin/admin.php?page=ledgerport-push`,
  auditLogs:  `${BASE}/wp-admin/admin.php?page=ledgerport-logs`,
  syncConfig: `${BASE}/wp-admin/admin.php?page=ledgerport-settings`,
  debugLogs:  `${BASE}/wp-admin/admin.php?page=ledgerport-debug-logs`,
};

async function goto(p: Page, url: string) {
  await p.goto(url);
  await p.waitForLoadState('domcontentloaded');
}

let page: Page;

test.beforeAll(async ({ browser }) => {
  test.setTimeout(60_000);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  page = await ctx.newPage();
  await login(page);
});

test.afterAll(async () => { await page.close(); });

// ─── Verified FIXED issues (should pass) ─────────────────────────────────────
test.describe('Verified fixes', () => {
  test('LP-FIX-172 | Help > Contact support has a real href and target=_blank', async () => {
    await goto(page, CORRECT_PAGES.dashboard);
    await page.getByRole('button', { name: 'Help' }).click();
    const link = page.getByRole('link', { name: 'Contact support' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /ledgerport\.com\/support/);
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('LP-FIX-174 | Sync Config page loads with no console errors', async () => {
    const consoleErrors: string[] = [];
    const onMsg = (m: any) => { if (m.type() === 'error') consoleErrors.push(m.text()); };
    page.on('console', onMsg);
    await goto(page, CORRECT_PAGES.syncConfig);
    await expect(page).toHaveTitle(/Sync Config/i);
    await expect(page.getByText('Auto Sync Entities')).toBeVisible();
    page.off('console', onMsg);
    expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join('\n')}`).toEqual([]);
  });

  // FLAKY: the Sync frequency combobox uses Radix Select, whose trigger isn't always
  // located reliably by accessible name. Manually verified passing via MCP; needs a
  // stable hook (e.g. data-testid) on the trigger element.
  test('LP-FIX-176 | Sync frequency dropdown disables options gated by plan', async () => {
    await goto(page, CORRECT_PAGES.syncConfig);
    // Combobox text is the currently-selected frequency, e.g. "1 hour" / "15 minutes" / "30 minutes".
    const freqCombo = page.getByRole('combobox', { name: /minute|hour|day/i }).first();
    await freqCombo.click();
    const options = page.getByRole('option');
    await expect(options.first()).toBeVisible();
    const disabledCount = await options.evaluateAll(els =>
      els.filter(e =>
        e.getAttribute('aria-disabled') === 'true' ||
        e.hasAttribute('data-disabled')
      ).length
    );
    expect(disabledCount, 'expected at least one plan-gated frequency option').toBeGreaterThan(0);
    await page.keyboard.press('Escape');
    // Wait for the dropdown overlay to fully detach before the next test navigates.
    await expect(options.first()).toBeHidden();
  });

  // FLAKY: same Radix Select issue as LP-FIX-176. Manually verified passing via MCP.
  test('LP-FIX-178 | "Yesterday" date range loads without 404', async () => {
    await goto(page, CORRECT_PAGES.dashboard);
    // Date range combobox is keyed by its currently-selected label
    const dateCombo = page.getByRole('combobox', { name: /last \d+ days|today|yesterday|this month|last month|last \d+ months|custom/i }).first();
    await dateCombo.click();
    await page.getByRole('option', { name: 'Yesterday' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveTitle(/404|not found|error/i);
    await expect(dateCombo).toContainText(/Yesterday/i);
  });

  test('LP-FIX-179 | Audit Logs search auto-filters as user types and shows clear (x) button', async () => {
    await goto(page, CORRECT_PAGES.auditLogs);
    // Wait for at least one log row to render before measuring
    const rows = page.getByRole('row');
    await expect(rows.nth(1)).toBeVisible({ timeout: 10_000 });
    const rowsBefore = await rows.count();
    const search = page.locator('input[type="text"]').first();
    await expect(search).toBeVisible();
    await search.fill('order');
    await page.waitForTimeout(800); // debounce
    const rowsAfter = await rows.count();
    expect(rowsAfter, `Expected row count to change after filtering (before=${rowsBefore} after=${rowsAfter})`)
      .not.toBe(rowsBefore);
    await expect(page.getByRole('button', { name: /clear search/i })).toBeVisible();
  });

  test('LP-FIX-181 | LedgerPort header logo renders within its container', async () => {
    await goto(page, CORRECT_PAGES.dashboard);
    const logoLink = page.getByRole('link', { name: 'LedgerPort', exact: true });
    await expect(logoLink).toBeVisible();
    const overflow = await logoLink.evaluate(link => {
      const child = link.querySelector('svg, img') as HTMLElement | SVGElement | null;
      if (!child) return { found: false, overflowing: false };
      const r = (child as HTMLElement).getBoundingClientRect();
      const parent = link.getBoundingClientRect();
      return { found: true, svgRight: r.right, parentRight: parent.right, overflowing: r.right > parent.right + 1 };
    });
    expect(overflow.found, 'Logo SVG/IMG child not found inside the LedgerPort link').toBe(true);
    expect(overflow.overflowing, `Logo overflows its anchor (${JSON.stringify(overflow)})`).toBe(false);
  });

  test('LP-FIX-182 | Dashboard has no horizontal scroll at 375px viewport', async () => {
    await page.setViewportSize({ width: 375, height: 812 });
    try {
      await goto(page, CORRECT_PAGES.dashboard);
      const widths = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(widths.scrollWidth, `Horizontal overflow at 375px (${widths.scrollWidth} > ${widths.clientWidth})`)
        .toBeLessThanOrEqual(widths.clientWidth + 1);
    } finally {
      await page.setViewportSize({ width: 1280, height: 800 });
    }
  });

  // FLAKY: clicking the row sometimes hits a non-expand target (e.g. status badge inside
  // the row) and the expansion doesn't mount. Needs an explicit row-expand chevron with
  // a stable selector to be reliable. Manually verified passing via MCP.
  test('LP-FIX-183 | Audit Logs expanded row shows full detail fields', async () => {
    await goto(page, CORRECT_PAGES.auditLogs);
    // Wait for log rows to load (header is row[0], first data row is row[1])
    const firstDataRow = page.getByRole('row').nth(1);
    await expect(firstDataRow).toBeVisible({ timeout: 10_000 });
    await firstDataRow.scrollIntoViewIfNeeded();
    await firstDataRow.click();
    // Expansion injects metadata fields below the row. The exact label set varies by row type,
    // but "Entity Type" appears on every kind of sync entry.
    await expect(page.getByText(/^Entity Type$/i).first()).toBeVisible({ timeout: 10_000 });
    // Also assert that the entity TYPE value (Product/Order/Customer/etc.) is fully rendered (no "..." truncation)
    const valueText = await page.locator('text=Entity Type').first().locator('xpath=..').textContent();
    expect(valueText, `Entity Type label/value appears truncated: ${valueText}`).not.toMatch(/\.\.\.$/);
  });

  test('LP-FIX-185 | Mappings > Customers tab shows the Status column', async () => {
    await goto(page, CORRECT_PAGES.mappings);
    await page.getByRole('tab', { name: 'Customers' }).click();
    await page.waitForLoadState('networkidle');
    const statusHeader = page.getByRole('columnheader', { name: /^Status$/i });
    await expect(statusHeader).toBeVisible();
    const fits = await statusHeader.evaluate(el => {
      const r = el.getBoundingClientRect();
      return r.right <= document.documentElement.clientWidth + 1;
    });
    expect(fits, 'Status column header is cut off by the viewport').toBe(true);
  });

  test('LP-FIX-187 | Dark mode: partial_success badge has WCAG AA contrast (>=4.5:1)', async () => {
    await goto(page, CORRECT_PAGES.auditLogs);
    // Toggle into dark mode only if currently in light mode
    const darkBtn = page.locator('button[aria-label="Switch to dark mode"]');
    if (await darkBtn.count()) await darkBtn.click();
    try {
      const badge = page.getByText('partial_success').first();
      await expect(badge).toBeVisible();
      const ratio = await badge.evaluate(el => {
        const cs = getComputedStyle(el as Element);
        const parse = (s: string) => (s.match(/\d+/g) || []).slice(0, 3).map(Number);
        const lum = ([r, g, b]: number[]) => {
          const a = [r, g, b].map(v => {
            const x = v / 255;
            return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
        };
        const f = lum(parse(cs.color));
        const b = lum(parse(cs.backgroundColor));
        return (Math.max(f, b) + 0.05) / (Math.min(f, b) + 0.05);
      });
      expect(ratio, `Badge contrast ${ratio.toFixed(2)} below WCAG AA 4.5:1`).toBeGreaterThanOrEqual(4.5);
    } finally {
      const lightBtn = page.locator('button[aria-label="Switch to light mode"]');
      if (await lightBtn.count()) await lightBtn.click().catch(() => {});
    }
  });

  test('LP-FIX-188 | Dashboard "Last sync" line uses white-space: nowrap', async () => {
    await goto(page, CORRECT_PAGES.dashboard);
    const lastSync = page.getByText(/Last sync:.*ago/i).first();
    await expect(lastSync).toBeVisible();
    const meta = await lastSync.evaluate(el => {
      const cs = getComputedStyle(el as Element);
      return {
        whiteSpace: cs.whiteSpace,
        height: (el as Element).getBoundingClientRect().height,
        lineHeight: parseFloat(cs.lineHeight),
      };
    });
    expect(meta.whiteSpace).toMatch(/nowrap/);
    expect(meta.height, `Last sync wraps (height ${meta.height}px > lineHeight ${meta.lineHeight}px)`)
      .toBeLessThanOrEqual(meta.lineHeight + 2);
  });

  test('LP-FIX-189 | Manual Sync > Orders shows formatted dates and currency-prefixed amounts', async () => {
    await goto(page, CORRECT_PAGES.manualSync);
    await page.getByRole('tab', { name: 'Orders' }).click();
    await page.waitForLoadState('networkidle');
    const cellTexts = await page.locator('tbody td').allTextContents();
    const isoMatches = cellTexts.filter(t => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(t));
    expect(isoMatches, `Found raw ISO timestamps in Orders table: ${isoMatches.slice(0, 3)}`).toEqual([]);
    const currencyMatches = cellTexts.filter(t => /^\$[\d,]+\.?\d*$/.test(t));
    expect(currencyMatches.length, 'Expected at least one currency-formatted amount').toBeGreaterThan(0);
  });
});

// ─── Still-open bugs (should currently FAIL — auto-pass when fix lands) ──────
test.describe('Still-open bugs (expected to fail until fixed)', () => {
  test('LP-BUG-184 | Direct URL aliases `ledgerport-sync-config` and `ledgerport-manual-sync` should resolve', async () => {
    // These are the slugs in helpers/auth.ts PLUGIN_PAGES — see the bug for context.
    await goto(page, PLUGIN_PAGES.syncConfig);
    await expect(page, 'ledgerport-sync-config alias returns WP error page').not.toHaveTitle(/error/i);
    await goto(page, PLUGIN_PAGES.manualSync);
    await expect(page, 'ledgerport-manual-sync alias returns WP error page').not.toHaveTitle(/error/i);
  });

  test('LP-BUG-186 | Mappings > Payment Methods tab should expose the standard toolbar', async () => {
    await goto(page, CORRECT_PAGES.mappings);
    await page.getByRole('tab', { name: 'Payment Methods' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByPlaceholder(/filter/i), 'Filter input missing on Payment Methods tab').toBeVisible();
    await expect(page.getByRole('button', { name: /refresh/i }), 'Refresh button missing on Payment Methods tab').toBeVisible();
    await expect(page.getByRole('button', { name: /automap/i }), 'Automap button missing on Payment Methods tab').toBeVisible();
  });

  test('LP-BUG-190 | Every focusable element on the Dashboard renders a visible focus ring', async () => {
    await goto(page, CORRECT_PAGES.dashboard);
    const missing = await page.evaluate(() => {
      const focusable = Array.from(document.querySelectorAll<HTMLElement>(
        'main button:not([disabled]), main a[href], main input:not([type="hidden"])'
      )).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && el.tabIndex !== -1;
      });
      const failures: string[] = [];
      for (const el of focusable) {
        el.focus();
        const cs = getComputedStyle(el);
        const hasBoxShadow = cs.boxShadow !== 'none' && /rgb\(\s*(?!0,\s*0,\s*0,\s*0)/.test(cs.boxShadow);
        const hasOutline = cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px' && cs.outlineColor !== 'rgba(0, 0, 0, 0)';
        if (!hasBoxShadow && !hasOutline) {
          const label = el.getAttribute('aria-label') || (el.textContent || '').trim().slice(0, 40);
          failures.push(`${el.tagName.toLowerCase()}[${label}]`);
        }
      }
      return failures;
    });
    expect(missing, `Elements without a visible focus ring on Dashboard: ${missing.join(', ')}`).toEqual([]);
  });

  test('LP-BUG-191 | Sidebar LedgerPort menu icon should use a WP dashicon, not a custom <img>', async () => {
    await goto(page, CORRECT_PAGES.dashboard);
    const usesCustomImg = await page.evaluate(() => {
      const link = document.querySelector('#adminmenu a[href*="page=ledgerport"]:not([href*="-"])');
      const img = link?.querySelector('.wp-menu-image img');
      return !!img;
    });
    expect(usesCustomImg, 'Sidebar icon still uses a custom <img> instead of a CSS-based dashicon').toBe(false);
  });

  test('LP-BUG-193 | WooCommerce gateway titles containing "&" must not be double HTML-encoded', async () => {
    await goto(page, CORRECT_PAGES.mappings);
    await page.getByRole('tab', { name: 'Payment Methods' }).click();
    await page.waitForLoadState('networkidle');
    const offenders = await page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('td, [role="cell"], p, div'));
      return cells
        .filter(el => el.children.length === 0)
        .map(el => ({ text: (el.textContent || '').trim(), inner: (el as HTMLElement).innerHTML }))
        .filter(o => o.text.includes('&amp;') || /&amp;amp;/.test(o.inner));
    });
    expect(offenders, `Found cells with double-encoded ampersands: ${JSON.stringify(offenders.slice(0, 3))}`).toEqual([]);
  });

  test('LP-BUG-194 | Sync frequency "Upgrade" pill should not be shown on a paid plan', async () => {
    await goto(page, CORRECT_PAGES.connection);
    const planLabel = (await page.locator('main').textContent({ timeout: 10_000 })) || '';
    test.skip(/free plan/i.test(planLabel), 'Account is on Free Plan; the upgrade pill is expected here');
    await goto(page, CORRECT_PAGES.syncConfig);
    const pill = page.locator('a').filter({ hasText: /^Upgrade$/ });
    await expect(pill, 'Upgrade pill is still rendered next to Sync frequency on a paid plan').toHaveCount(0);
  });
});
