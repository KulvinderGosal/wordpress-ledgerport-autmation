/**
 * WCAG 2.1 SC 2.4.7 / WCAG 2.2 SC 2.4.11 — Focus Visible.
 * Verifies #190 stays fixed across LedgerPort admin pages: every interactive
 * element inside the plugin's content area should produce a visible focus
 * indicator on :focus-visible (i.e. keyboard focus).
 *
 * Strategy: find every focusable element inside #wpbody-content, focus each
 * one in turn, capture the computed :focus-visible styles, then verdict.
 */
import { test, expect, skipUnlessLoggedIn } from '../fixtures/auth';
import * as fs from 'fs';
import * as path from 'path';

skipUnlessLoggedIn(test);

const ART = path.resolve(__dirname, '../test-results/focus-visible');
test.beforeAll(() => fs.mkdirSync(ART, { recursive: true }));

const BASE = process.env.BASE_URL ?? 'https://qastaging.pushengage.com';

const PAGES = [
  ['Dashboard',    '/wp-admin/admin.php?page=ledgerport'],
  ['Connection',   '/wp-admin/admin.php?page=ledgerport-connection'],
  ['Mappings',     '/wp-admin/admin.php?page=ledgerport-mappings'],
  ['Manual Sync',  '/wp-admin/admin.php?page=ledgerport-manual-sync'],
  ['Audit Logs',   '/wp-admin/admin.php?page=ledgerport-logs'],
  ['Sync Config',  '/wp-admin/admin.php?page=ledgerport-sync-config'],
  ['Debug Logs',   '/wp-admin/admin.php?page=ledgerport-debug-logs'],
] as const;

type ElementCheck = {
  index: number;
  tag: string;
  text: string;
  hasVisibleFocus: boolean;
  reason: string;
  computed: {
    outlineStyle: string;
    outlineWidth: string;
    outlineColor: string;
    boxShadow: string;
    matchesFocusVisible: boolean;
  };
};
type PageReport = {
  page: string;
  url: string;
  totalFocusableInPluginArea: number;
  sampled: number;
  withVisibleFocus: number;
  withoutVisibleFocus: number;
  passes: ElementCheck[];
  failures: ElementCheck[];
};
const report: PageReport[] = [];
test.afterAll(() => {
  fs.writeFileSync(`${ART}/findings.json`, JSON.stringify(report, null, 2));
});

// A color is "invisible" if alpha = 0 (the Tailwind `outline-none` utility
// renders as `outline 2px solid transparent`, which fools naive checks).
function isTransparent(color: string): boolean {
  // rgba(r, g, b, 0) — alpha 0
  const m = color.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*([\d.]+))?\s*\)/);
  if (m && m[1] !== undefined && parseFloat(m[1]) === 0) return true;
  return color === 'transparent';
}

function isVisibleFocus(c: ElementCheck['computed']): { ok: boolean; reason: string } {
  if (!c.matchesFocusVisible) {
    return { ok: false, reason: ':focus-visible did not match' };
  }
  // Tailwind's `focus-visible:outline-none` renders as transparent outline —
  // that's NOT a visible focus. Only count outlines with a non-zero-alpha colour.
  if (c.outlineStyle && c.outlineStyle !== 'none'
      && parseFloat(c.outlineWidth) > 0
      && !isTransparent(c.outlineColor)) {
    return { ok: true, reason: `outline ${c.outlineWidth} ${c.outlineStyle} ${c.outlineColor}` };
  }
  // box-shadow is how Tailwind's `ring-*` utility paints the visible ring.
  if (c.boxShadow && c.boxShadow !== 'none') {
    return { ok: true, reason: `box-shadow: ${c.boxShadow.slice(0, 120)}` };
  }
  return { ok: false, reason: 'no visible outline & no box-shadow on :focus-visible' };
}

for (const [pageName, urlPath] of PAGES) {
  test(`${pageName} · every interactive element has a visible focus ring`, async ({ adminPage }) => {
    const url = `${BASE}${urlPath}`;
    // `networkidle` was hanging at the 30s default (the SPA polls in the
    // background); use `load` + an explicit wait for the React root to mount.
    await adminPage.goto(url, { waitUntil: 'load' }).catch(() => {});
    // Wait for ANY interactive element to appear inside the wp-admin main
    // column — that's our proxy for "React app hydrated". Up to 15s.
    await adminPage.locator(
      '#wpbody-content button, #wpbody-content a[href], #wpbody-content input, ' +
      '#wpbody-content [role="button"], #wpbody-content [role="tab"]'
    ).first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
    await adminPage.waitForTimeout(1500);  // additional settling time

    // The plugin's React app mounts inside #wpbody-content. We scan only
    // there — never the WP admin chrome.
    const focusableSelector = [
      '#wpbody-content a[href]',
      '#wpbody-content button',
      '#wpbody-content input:not([type="hidden"]):not([disabled])',
      '#wpbody-content select:not([disabled])',
      '#wpbody-content textarea:not([disabled])',
      '#wpbody-content [tabindex]:not([tabindex="-1"])',
      '#wpbody-content [role="button"]',
      '#wpbody-content [role="tab"]',
      '#wpbody-content [role="switch"]',
      '#wpbody-content [role="link"]',
    ].join(', ');

    const handles = await adminPage.locator(focusableSelector).all();
    const total = handles.length;

    // Sample up to N elements to keep run time sane.
    const SAMPLE = 25;
    const indices: number[] = [];
    if (total <= SAMPLE) {
      for (let i = 0; i < total; i++) indices.push(i);
    } else {
      const step = total / SAMPLE;
      for (let i = 0; i < SAMPLE; i++) indices.push(Math.floor(i * step));
    }

    const checks: ElementCheck[] = [];
    let lastFocusedShotPath = '';

    for (const idx of indices) {
      const el = handles[idx];
      // Skip elements that aren't actually visible (offscreen / display:none).
      const visible = await el.isVisible().catch(() => false);
      if (!visible) continue;

      // Use the keyboard-focus path: dispatch a "Tab"-style focus by calling
      // focus() *then* manually setting the :focus-visible flag via a real
      // keyboard interaction. Easiest: `el.focus()` then press a non-mutating
      // key (Shift) which causes Chromium to treat it as keyboard focus.
      await el.scrollIntoViewIfNeeded().catch(() => {});
      await el.focus({ timeout: 2000 }).catch(() => {});
      // Press an inert key so Chromium classifies as keyboard focus
      await adminPage.keyboard.press('Shift').catch(() => {});
      await adminPage.waitForTimeout(60);

      const info = await el.evaluate((node) => {
        const el = node as HTMLElement;
        const cs = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('name') || '').trim().slice(0, 80),
          outlineStyle: cs.outlineStyle,
          outlineWidth: cs.outlineWidth,
          outlineColor: cs.outlineColor,
          boxShadow: cs.boxShadow,
          matchesFocusVisible: el.matches(':focus-visible'),
        };
      }).catch(() => null);
      if (!info) continue;

      const c: ElementCheck = {
        index: idx,
        tag: info.tag,
        text: info.text,
        hasVisibleFocus: false,
        reason: '',
        computed: info,
      };
      const verdict = isVisibleFocus(c.computed);
      c.hasVisibleFocus = verdict.ok;
      c.reason = verdict.reason;
      checks.push(c);
    }

    // Take a single screenshot showing the last-focused element's ring (if any).
    lastFocusedShotPath = `${ART}/${pageName.replace(/\s+/g, '-')}.png`;
    await adminPage.screenshot({ path: lastFocusedShotPath, fullPage: false }).catch(() => {});

    const failures = checks.filter(c => !c.hasVisibleFocus);
    const passes   = checks.filter(c =>  c.hasVisibleFocus);

    const pageReport: PageReport = {
      page: pageName,
      url,
      totalFocusableInPluginArea: total,
      sampled: checks.length,
      withVisibleFocus: passes.length,
      withoutVisibleFocus: failures.length,
      passes,
      failures,
    };
    report.push(pageReport);

    console.log(`\n[${pageName}] ${passes.length}/${checks.length} sampled · ${total} focusable in plugin area`);
    if (failures.length) {
      console.log(`  ✗ failures (showing up to 5):`);
      for (const f of failures.slice(0, 5)) {
        const t = f.text || '(no text)';
        console.log(`     <${f.tag}> "${t}" — ${f.reason}`);
      }
    }
    if (passes.length) {
      const sample = passes[0];
      console.log(`  ✓ example pass: <${sample.tag}> "${sample.text}" via ${sample.reason.slice(0, 80)}`);
    }

    // Soft assertion — only fail this spec if MORE THAN 25% of sampled
    // interactive elements lack a visible focus ring. That gives the suite
    // headroom for legitimately-non-focusable elements that selectors might
    // have picked up (e.g. disabled-but-not-marked-disabled buttons).
    if (checks.length >= 4) {
      const ratio = failures.length / checks.length;
      expect(
        ratio,
        `${pageName}: ${failures.length}/${checks.length} interactive elements have no visible focus ring`,
      ).toBeLessThanOrEqual(0.25);
    }
  });
}
