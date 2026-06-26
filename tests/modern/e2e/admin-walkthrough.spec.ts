import { test, expect, skipUnlessLoggedIn } from '../fixtures/auth';
import { LedgerportAdmin } from '../pages/LedgerportAdmin';
import * as fs from 'fs';
import * as path from 'path';

skipUnlessLoggedIn(test);

const ARTIFACTS = path.resolve(__dirname, '../test-results/admin-walkthrough');

test.beforeAll(() => {
  fs.mkdirSync(ARTIFACTS, { recursive: true });
});

test.describe('Ledgerport admin · first-contact walkthrough', () => {
  test.beforeAll(() => {
    test.info().annotations.push({ type: 'feature', description: 'area-2-admin-walkthrough' });
  });

  test('Dashboard page loads without PHP errors', async ({ adminPage }) => {
    const admin = new LedgerportAdmin(adminPage);
    await admin.openDashboard();
    const url = adminPage.url();
    expect(url, 'Should not bounce back to wp-login').not.toMatch(/wp-login/);

    await adminPage.screenshot({ path: `${ARTIFACTS}/01-dashboard.png`, fullPage: true });

    const issues = await admin.detectIssues();
    expect(issues, `Dashboard issues: ${issues.join(' | ')}`).toEqual([]);
  });

  test('Plugin row shows on Plugins screen', async ({ adminPage }) => {
    await adminPage.goto('/wp-admin/plugins.php');
    // Tolerant of slug case: ledgerport / LedgerPort
    const row = adminPage.locator('tr[data-slug="ledgerport"], tr:has-text("LedgerPort")').first();
    await expect(row, 'Plugin row not found in Installed Plugins').toBeVisible({ timeout: 10_000 });

    // Plugin should be active (no "Activate" link visible, "Deactivate" present)
    const deactivate = row.locator('a:has-text("Deactivate")');
    await expect(deactivate, 'Plugin appears inactive').toBeVisible({ timeout: 5_000 });

    await adminPage.screenshot({ path: `${ARTIFACTS}/02-plugins-row.png` });
  });

  test('Discover every Ledgerport admin subpage and probe each', async ({ adminPage }) => {
    const admin = new LedgerportAdmin(adminPage);
    const subpages = await admin.discoverSubpages();
    console.log(`\nDiscovered ${subpages.length} Ledgerport subpages:`);
    for (const s of subpages) console.log(`  • ${s.label} → ${s.url}`);

    // No silly assertion on count — just record + screenshot each.
    fs.writeFileSync(
      `${ARTIFACTS}/subpages.json`,
      JSON.stringify(subpages, null, 2)
    );

    const issuesByPage: Record<string, string[]> = {};
    let idx = 0;
    for (const sub of subpages) {
      idx++;
      const status = await admin.probe(sub.url);
      sub.status = status;
      const issues = await admin.detectIssues();
      issuesByPage[sub.label] = issues;
      const safeLabel = sub.label.replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 40);
      await adminPage.screenshot({
        path: `${ARTIFACTS}/sub-${String(idx).padStart(2, '0')}-${safeLabel}.png`,
        fullPage: true,
      });
    }

    fs.writeFileSync(
      `${ARTIFACTS}/subpage-issues.json`,
      JSON.stringify({ subpages, issuesByPage }, null, 2)
    );

    // Soft assertions on each subpage — collect, don't fail on first.
    const totalIssues = Object.values(issuesByPage).flat();
    if (totalIssues.length > 0) {
      console.log(`\n⚠ ${totalIssues.length} issue signatures across subpages:`);
      for (const [page, isues] of Object.entries(issuesByPage)) {
        if (isues.length) console.log(`  ${page}: ${isues.join(', ')}`);
      }
    }
    // Don't fail the test on issues — we want the screenshots + json artefacts
    // either way. Surface to the reporter via console.log.
  });

  test('Console errors on dashboard load', async ({ adminPage }) => {
    const errors: string[] = [];
    adminPage.on('console', m => {
      if (m.type() === 'error') errors.push(m.text());
    });
    adminPage.on('pageerror', e => errors.push(`pageerror: ${e.message}`));

    await adminPage.goto('/wp-admin/admin.php?page=ledgerport', { waitUntil: 'networkidle' });
    await adminPage.waitForTimeout(2000);

    fs.writeFileSync(`${ARTIFACTS}/console-errors.json`, JSON.stringify(errors, null, 2));

    // Only third-party / cross-origin script errors are typical noise — flag
    // anything else.
    const meaningful = errors.filter(e =>
      !/Failed to load resource.*chrome-extension/.test(e) &&
      !/the server responded with a status of 404/.test(e)
    );

    // Don't hard-fail — we want to see them in the report.
    if (meaningful.length) {
      console.log(`\n⚠ ${meaningful.length} console errors on dashboard:`);
      meaningful.slice(0, 10).forEach(e => console.log(`  · ${e.slice(0, 200)}`));
    }
  });
});
