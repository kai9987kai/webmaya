import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const source = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("ships one syntactically valid editor module", async () => {
  const scripts = [...source.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const directory = await mkdtemp(join(tmpdir(), "webmaya-source-"));
  try {
    const modulePath = join(directory, "editor.mjs");
    await writeFile(modulePath, scripts[0][1], "utf8");
    const result = spawnSync(process.execPath, ["--check", modulePath], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("keeps DOM ids unique and required Component Studio surfaces present", () => {
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of [
    "viewport", "component-selection", "component-hud", "marquee-box",
    "select-through", "left-panel", "right-panel", "show-tools-btn", "show-inspector-btn"
  ]) assert.ok(ids.includes(id), `missing #${id}`);
});

test("retains the release safety and dense-selection invariants", () => {
  assert.match(source, /visibleComponentIds\(mesh, topo, rect, bounds\)/);
  assert.match(source, /const ProjectLimits =/);
  assert.match(source, /Undo failed safely:/);
  assert.match(source, /panel\.inert = mobile && !open/);
  assert.match(source, /Vertex deletion is disabled/);
  assert.match(source, /sanitizeAnimationTrack\(track,camera=false\)/);
  assert.match(source, /c\.isInstancedMesh/);
  assert.match(source, /ProjectLimits\.validateGeometry\(geo\)/);
});
