/**
 * Targeted verification of the OPEN sub-issues under
 * awesomemotive/pushengage-ledgerport#171.
 *
 * Uses ABSOLUTE URLs to navigate (the discovery walkthrough's relative-URL
 * approach was producing artefacts in earlier runs). Captures a screenshot
 * per issue and writes a JSON record describing what was found.
 */
import { test, expect, skipUnlessLoggedIn } from '../fixtures/auth';
import * as fs from 'fs';
import * as path from 'path';

skipUnlessLoggedIn(test);

const ART = path.resolve(__dirname, '../test-results/verify-open-issues');
test.beforeAll(() => fs.mkdirSync(ART, { recursive: true }));

const BASE = process.env.BASE_URL ?? 'https://qastaging.pushengage.com';

type Finding = {
  issue: number;
  title: string;
  reproduces: boolean | 'unknown';
  evidence: string;
  screenshot: string;
};

const findings: Finding[] = [];

async function logFinding(f: Finding) {
  findings.push(f);
  console.log(`#${f.issue} ${f.reproduces === true ? 'STILL FAILING' : f.reproduces === false ? 'VERIFIED FIXED' : 'UNKNOWN'} — ${f.evidence}`);
}

test.afterAll(() => {
  fs.writeFileSync(`${ART}/findings.json`, JSON.stringify(findings, null, 2));
});

test.describe('Verify currently-OPEN sub-issues under #171', () => {

  test('#193 · Mappings > Payment Methods: double-encoded "&amp;"', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport-mappings`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    const shot = `${ART}/193-mappings-payment.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    // Try to click "Payment Methods" tab if visible
    const pmTab = adminPage.getByRole('tab', { name: /payment methods/i }).first();
    if (await pmTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await pmTab.click();
      await adminPage.waitForTimeout(2000);
      await adminPage.screenshot({ path: shot, fullPage: true });
    }
    const html = await adminPage.content();
    const doubleEncoded = html.includes('&amp;amp;');
    await logFinding({
      issue: 193,
      title: 'Mappings > Payment Methods: gateway label with "&" is double HTML-encoded',
      reproduces: doubleEncoded ? true : (await adminPage.url() === url ? false : 'unknown'),
      evidence: doubleEncoded
        ? `Found "&amp;amp;" in rendered HTML on ${url}`
        : `No "&amp;amp;" double-encoding signature in HTML on ${url} (current URL: ${adminPage.url()})`,
      screenshot: shot,
    });
  });

  test('#194 · Sync Config: Upgrade pill on Sync frequency', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport-sync-config`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    const shot = `${ART}/194-sync-config.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    const html = await adminPage.content();
    const hasUpgradeBadge = /Upgrade/i.test(html) && /sync.?frequency/i.test(html);
    await logFinding({
      issue: 194,
      title: 'Sync Config: "Upgrade" pill on Sync frequency persists',
      reproduces: hasUpgradeBadge ? 'unknown' : false,
      evidence: hasUpgradeBadge
        ? 'Both "Upgrade" text and "sync frequency" found on the page — manual review needed to confirm if it is the persistent post-upgrade case (needs paid plan state knowledge).'
        : `No "Upgrade" + "sync frequency" co-occurrence detected on ${url}.`,
      screenshot: shot,
    });
  });

  test('#196 · Orders Settings: product name HTML-encoded', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport-sync-config`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    // Try to click Orders tab
    const ordersTab = adminPage.getByRole('tab', { name: /^orders/i }).first();
    if (await ordersTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await ordersTab.click();
      await adminPage.waitForTimeout(2000);
    }
    const shot = `${ART}/196-orders-settings.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    const html = await adminPage.content();
    const hasEncoded = html.includes('&amp;amp;') || /Shipping &amp; Handling/.test(html);
    await logFinding({
      issue: 196,
      title: 'Orders Settings: chosen product name displays HTML entities',
      reproduces: hasEncoded ? true : 'unknown',
      evidence: hasEncoded
        ? 'Found HTML-encoded ampersand patterns in Orders Settings HTML'
        : `No "&amp;" mis-encoding signature on Orders Settings; manual review needed to confirm (depends on whether a product with "&" is currently selected)`,
      screenshot: shot,
    });
  });

  test('#197 · Connection issue banner: customer.updated webhook', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    const shot = `${ART}/197-connection-banner.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    const html = await adminPage.content();
    const hasBanner = /1 issue with your connection/i.test(html)
                  || /customer\.updated/i.test(html)
                  || /webhook.*inactive/i.test(html);
    await logFinding({
      issue: 197,
      title: 'WooCommerce webhook customer.updated inactive',
      reproduces: hasBanner ? true : false,
      evidence: hasBanner
        ? 'Connection-issue banner / webhook-inactive text still present in dashboard HTML'
        : 'No "1 issue with your connection" / "customer.updated" / "webhook inactive" signature in dashboard HTML',
      screenshot: shot,
    });
  });

  test('#219 · API Request Logging toggle throws VALIDATION_ERROR', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport-sync-config#misc`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    // Locate the Misc tab and click it (in case the # anchor doesn't drive the React state)
    const miscTab = adminPage.getByRole('tab', { name: /^misc/i }).first();
    if (await miscTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await miscTab.click();
      await adminPage.waitForTimeout(1500);
    }
    const before = `${ART}/219-misc-before.png`;
    await adminPage.screenshot({ path: before, fullPage: true });

    // Try to click any toggle labelled "Log error" or "Log success"
    const toggle = adminPage.locator('text=/Log (error|success) request/i').first();
    let triggeredError = false;
    if (await toggle.isVisible({ timeout: 3000 }).catch(() => false)) {
      await toggle.click().catch(() => {});
      await adminPage.waitForTimeout(2000);
      const html = await adminPage.content();
      triggeredError = /Validation failed|VALIDATION_ERROR/i.test(html);
    }
    const after = `${ART}/219-misc-after.png`;
    await adminPage.screenshot({ path: after, fullPage: true });

    await logFinding({
      issue: 219,
      title: 'API Request Logging toggles throw Validation failed / VALIDATION_ERROR',
      reproduces: triggeredError ? true : 'unknown',
      evidence: triggeredError
        ? 'After clicking a logging toggle, "Validation failed" / "VALIDATION_ERROR" appeared in the page HTML'
        : 'Could not reproduce: either toggle not found, or the click did not surface a Validation failed dialog. Manual review needed.',
      screenshot: after,
    });
  });

  test('#220 · Sync Now button error: "must have both ecommerce and accounting"', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    const syncBtn = adminPage.getByRole('button', { name: /^sync now/i }).first();
    let triggeredError = false;
    if (await syncBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await syncBtn.click().catch(() => {});
      await adminPage.waitForTimeout(3000);
      const html = await adminPage.content();
      triggeredError = /must have both ecommerce and accounting/i.test(html);
    }
    const shot = `${ART}/220-sync-now.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    await logFinding({
      issue: 220,
      title: 'Sync Now → error "must have both ecommerce and accounting platforms connected"',
      reproduces: triggeredError ? true : 'unknown',
      evidence: triggeredError
        ? 'Error text matched after Sync Now click'
        : 'Could not reproduce: Sync Now button not found or no error surfaced. Manual review needed.',
      screenshot: shot,
    });
  });

  test('#221 · Mappings > Payment Methods: empty list', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport-mappings`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    const pmTab = adminPage.getByRole('tab', { name: /payment methods/i }).first();
    if (await pmTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await pmTab.click();
      await adminPage.waitForTimeout(2500);
    }
    const shot = `${ART}/221-payment-methods.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    const html = await adminPage.content();
    // Look for any payment-gateway row pattern
    const hasGatewayRows = /paypal|stripe|cod|cheque|bacs|ppcp-card-button-gateway/i.test(html);
    await logFinding({
      issue: 221,
      title: 'Payment section does not display any payment methods',
      reproduces: !hasGatewayRows,
      evidence: hasGatewayRows
        ? 'Payment Methods page contains gateway-name references (paypal/stripe/etc.) — list is populated'
        : 'No gateway-name patterns found in Payment Methods HTML — page appears empty',
      screenshot: shot,
    });
  });

  test('#222 · Audit Logs cross-platform contamination', async ({ adminPage }) => {
    const url = `${BASE}/wp-admin/admin.php?page=ledgerport-logs`;
    await adminPage.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(2500);
    const shot = `${ART}/222-audit-logs.png`;
    await adminPage.screenshot({ path: shot, fullPage: true });
    const html = await adminPage.content();
    const hasShopify = /shopify/i.test(html);
    const hasWooCommerce = /woocommerce|woo-store|wp-store/i.test(html);
    await logFinding({
      issue: 222,
      title: 'WordPress account audit logs show Shopify entries (cross-platform leak)',
      reproduces: hasShopify ? true : false,
      evidence: hasShopify
        ? `Audit Logs HTML contains 'shopify' references. WooCommerce-related references also present: ${hasWooCommerce}`
        : `No 'shopify' references in Audit Logs HTML. WooCommerce-related references present: ${hasWooCommerce}`,
      screenshot: shot,
    });
  });

  test('#191 · Sidebar icon style (capture for visual review)', async ({ adminPage }) => {
    await adminPage.goto(`${BASE}/wp-admin/`, { waitUntil: 'networkidle' }).catch(() => {});
    await adminPage.waitForTimeout(1500);
    const shot = `${ART}/191-sidebar-icon.png`;
    // Crop to just the sidebar to make visual comparison easier
    const sidebar = adminPage.locator('#adminmenuwrap');
    if (await sidebar.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sidebar.screenshot({ path: shot });
    } else {
      await adminPage.screenshot({ path: shot, fullPage: false });
    }
    await logFinding({
      issue: 191,
      title: 'Ledgerport sidebar icon should match WP plugin menu icon style',
      reproduces: 'unknown',
      evidence: 'Visual / subjective — screenshot captured for human review',
      screenshot: shot,
    });
  });
});
