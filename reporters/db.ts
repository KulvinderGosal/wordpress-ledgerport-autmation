// better-sqlite3 is loaded lazily inside openDb() so this file can be required
// even when the optional native dep isn't installed — the reporter falls back
// to no-op mode in that case.
import * as fs from 'fs';
import * as path from 'path';

// Late-bound — only resolved when openDb() is called.
type Database = any;

export type RunStatus = 'passed' | 'failed' | 'flaky' | 'skipped' | 'interrupted' | 'timedout';

export interface RunRow {
  id?: number;
  run_id: string;            // UUID per `playwright test` invocation
  started_at: string;        // ISO
  finished_at: string | null;
  product: string;           // e.g. pushengage-wordpress-plugin
  env: string;               // local | staging | prod
  base_url: string;
  commit_sha: string;
  tester: string;
  total: number;
  passed: number;
  failed: number;
  flaky: number;
  skipped: number;
  duration_ms: number;
  status: RunStatus;
  report_url: string | null;
  issue_urls: string | null; // JSON array
}

export interface TestRow {
  id?: number;
  run_id: string;
  feature: string;           // from annotations
  spec_file: string;
  test_title: string;
  project: string;           // chromium | firefox | webkit
  status: RunStatus;
  duration_ms: number;
  error_message: string | null;
  screenshot_path: string | null;
  video_path: string | null;
  trace_path: string | null;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT UNIQUE NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  product TEXT NOT NULL,
  env TEXT NOT NULL,
  base_url TEXT NOT NULL,
  commit_sha TEXT NOT NULL,
  tester TEXT NOT NULL,
  total INTEGER NOT NULL DEFAULT 0,
  passed INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  flaky INTEGER NOT NULL DEFAULT 0,
  skipped INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  report_url TEXT,
  issue_urls TEXT
);

CREATE TABLE IF NOT EXISTS tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL REFERENCES runs(run_id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  spec_file TEXT NOT NULL,
  test_title TEXT NOT NULL,
  project TEXT NOT NULL,
  status TEXT NOT NULL,
  duration_ms INTEGER NOT NULL,
  error_message TEXT,
  screenshot_path TEXT,
  video_path TEXT,
  trace_path TEXT
);

CREATE INDEX IF NOT EXISTS idx_tests_run_id ON tests(run_id);
CREATE INDEX IF NOT EXISTS idx_runs_started_at ON runs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_runs_env ON runs(env);
CREATE INDEX IF NOT EXISTS idx_runs_product ON runs(product);
`;

export function openDb(dbPath: string): Database | null {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  let Database: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Database = require('better-sqlite3');
  } catch (err) {
    process.stderr.write(
      "[qa-runner] better-sqlite3 not installed — run history won't be persisted this run.\n" +
      "[qa-runner] Fix: cd to QA-Automation root and run 'npm install'.\n"
    );
    return null;
  }
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(SCHEMA);
  return db;
}
