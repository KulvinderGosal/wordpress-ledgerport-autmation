import { randomUUID } from 'crypto';
import * as path from 'path';
import type {
  Reporter, FullConfig, FullResult, Suite, TestCase, TestResult,
} from '@playwright/test/reporter';
import { openDb, RunStatus } from './db';

interface Options {
  dbPath: string;
  env: string;
  baseUrl: string;
  tester: string;
  commitSha: string;
  product: string;
  reportUrl?: string;
}

export default class SqliteReporter implements Reporter {
  private runId = randomUUID();
  private startedAt = new Date();
  private db = openDb(this.opts.dbPath);
  private buffer: Array<{
    feature: string;
    spec_file: string;
    test_title: string;
    project: string;
    status: RunStatus;
    duration_ms: number;
    error_message: string | null;
    screenshot_path: string | null;
    video_path: string | null;
    trace_path: string | null;
  }> = [];

  constructor(private opts: Options) {}

  onBegin(_config: FullConfig, _suite: Suite) {
    if (!this.db) {
      process.stdout.write(
        `[sqlite-reporter] better-sqlite3 unavailable — run ${this.runId} will not be persisted.\n`
      );
      return;
    }
    this.db.prepare(`
      INSERT INTO runs (run_id, started_at, product, env, base_url, commit_sha, tester, status)
      VALUES (@run_id, @started_at, @product, @env, @base_url, @commit_sha, @tester, 'passed')
    `).run({
      run_id: this.runId,
      started_at: this.startedAt.toISOString(),
      product: this.opts.product,
      env: this.opts.env,
      base_url: this.opts.baseUrl,
      commit_sha: this.opts.commitSha,
      tester: this.opts.tester,
    });
    process.stdout.write(`[sqlite-reporter] run ${this.runId} started\n`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const featureAnno = test.annotations.find((a) => a.type === 'feature');
    const feature = featureAnno?.description ?? path.basename(test.location.file, '.spec.ts');

    const screenshot = result.attachments.find((a) => a.name === 'screenshot')?.path ?? null;
    const video      = result.attachments.find((a) => a.name === 'video')?.path ?? null;
    const trace      = result.attachments.find((a) => a.name === 'trace')?.path ?? null;

    this.buffer.push({
      feature,
      spec_file: path.relative(process.cwd(), test.location.file),
      test_title: test.titlePath().slice(1).join(' › '),
      project: test.parent.project()?.name ?? 'unknown',
      status: result.status as RunStatus,
      duration_ms: result.duration,
      error_message: result.error?.message ?? null,
      screenshot_path: screenshot,
      video_path: video,
      trace_path: trace,
    });
  }

  async onEnd(result: FullResult) {
    const finishedAt = new Date();
    if (!this.db) {
      // No persistence this run — counts will still appear in stdout via list reporter.
      return;
    }
    const insertTest = this.db.prepare(`
      INSERT INTO tests (
        run_id, feature, spec_file, test_title, project, status,
        duration_ms, error_message, screenshot_path, video_path, trace_path
      ) VALUES (
        @run_id, @feature, @spec_file, @test_title, @project, @status,
        @duration_ms, @error_message, @screenshot_path, @video_path, @trace_path
      )
    `);
    const tx = this.db.transaction((rows: typeof this.buffer) => {
      for (const row of rows) insertTest.run({ run_id: this.runId, ...row });
    });
    tx(this.buffer);

    const counts = this.buffer.reduce(
      (acc, t) => {
        acc.total += 1;
        if (t.status === 'passed')  acc.passed += 1;
        if (t.status === 'failed' || t.status === 'timedout') acc.failed += 1;
        if (t.status === 'skipped') acc.skipped += 1;
        acc.duration_ms += t.duration_ms;
        return acc;
      },
      { total: 0, passed: 0, failed: 0, flaky: 0, skipped: 0, duration_ms: 0 },
    );

    const overall: RunStatus = result.status === 'passed' ? 'passed'
      : result.status === 'failed' ? 'failed'
      : result.status === 'timedout' ? 'timedout'
      : result.status === 'interrupted' ? 'interrupted'
      : 'failed';

    this.db.prepare(`
      UPDATE runs SET
        finished_at = @finished_at,
        total       = @total,
        passed      = @passed,
        failed      = @failed,
        flaky       = @flaky,
        skipped     = @skipped,
        duration_ms = @duration_ms,
        status      = @status,
        report_url  = @report_url
      WHERE run_id  = @run_id
    `).run({
      run_id: this.runId,
      finished_at: finishedAt.toISOString(),
      ...counts,
      status: overall,
      report_url: this.opts.reportUrl ?? null,
    });

    process.stdout.write(
      `[sqlite-reporter] run ${this.runId} finished — ${counts.passed}/${counts.total} passed in ${counts.duration_ms}ms\n`,
    );
    if (this.db) this.db.close();
  }

  printsToStdio() {
    return false;
  }
}
