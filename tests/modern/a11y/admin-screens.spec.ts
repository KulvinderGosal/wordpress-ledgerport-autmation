import { test, expect, skipUnlessLoggedIn } from '../fixtures/auth';
import AxeBuilder from '@axe-core/playwright';
import { LedgerportAdmin } from '../pages/LedgerportAdmin';
import * as fs from 'fs';
import * as path from 'path';

skipUnlessLoggedIn(test);

const ARTIFACTS = path.resolve(__dirname, '../test-results/a11y');
test.beforeAll(() => fs.mkdirSync(ARTIFACTS, { recursive: true }));

test.describe('Ledgerport admin · accessibility (WCAG 2.1 AA)', () => {
  test.beforeAll(() => {
    test.info().annotations.push({ type: 'feature', description: 'area-14-a11y' });
  });

  test('Dashboard screen has no critical/serious WCAG violations', async ({ adminPage }) => {
    const admin = new LedgerportAdmin(adminPage);
    await admin.openDashboard();
    await adminPage.waitForLoadState('networkidle');

    const result = await new AxeBuilder({ page: adminPage })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    fs.writeFileSync(`${ARTIFACTS}/axe-dashboard.json`, JSON.stringify(result, null, 2));

    const blocking = result.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    const minor = result.violations.filter(v => v.impact === 'minor' || v.impact === 'moderate');

    console.log(`\nDashboard a11y: ${result.violations.length} total · ${blocking.length} blocking · ${minor.length} minor`);
    for (const v of blocking) {
      console.log(`  ✗ [${v.impact}] ${v.id}: ${v.help}`);
      for (const n of v.nodes.slice(0, 2)) {
        console.log(`      target: ${n.target.join(', ')}`);
      }
    }

    expect(blocking, `Blocking a11y violations on dashboard`).toEqual([]);
  });

  test('Discover and a11y-scan every Ledgerport subpage', async ({ adminPage }) => {
    const admin = new LedgerportAdmin(adminPage);
    const subpages = await admin.discoverSubpages();

    const report: Record<string, any> = {};
    for (const sub of subpages) {
      await adminPage.goto(sub.url, { waitUntil: 'domcontentloaded' });
      await adminPage.waitForLoadState('networkidle').catch(() => {});

      const result = await new AxeBuilder({ page: adminPage })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const blocking = result.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      report[sub.label] = {
        url: sub.url,
        violationsTotal: result.violations.length,
        blocking: blocking.map(v => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.slice(0,3).map(n=>n.target.join(',')) })),
      };
      console.log(`  ${sub.label}: ${result.violations.length} violations (${blocking.length} blocking)`);
    }

    fs.writeFileSync(`${ARTIFACTS}/axe-by-subpage.json`, JSON.stringify(report, null, 2));
  });
});
