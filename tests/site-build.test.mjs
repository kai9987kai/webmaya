import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png"
};

const assets = {
  async fetch(request) {
    const pathname = new URL(request.url).pathname;
    const relative = pathname.replace(/^\/+/, "");
    try {
      const body = await readFile(new URL(`../dist/client/${relative}`, import.meta.url));
      const ext = relative.slice(relative.lastIndexOf("."));
      return new Response(body, { headers: { "Content-Type": contentTypes[ext] || "application/octet-stream" } });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }
};

test("serves the Component Studio shell from the root route", async () => {
  const response = await worker.fetch(new Request("https://example.test/"), { ASSETS: assets });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /^text\/html\b/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  const html = await response.text();
  assert.match(html, /WebMaya Advanced Studio v6/);
  assert.match(html, /id="component-selection"/);
  assert.match(html, /id="marquee-box"/);
});

test("serves the social card with durable caching", async () => {
  const response = await worker.fetch(new Request("https://example.test/og.png"), { ASSETS: assets });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.match(response.headers.get("cache-control") || "", /immutable/);
  assert.ok((await response.arrayBuffer()).byteLength > 100_000);
});

test("rejects unsupported methods and missing assets", async () => {
  const post = await worker.fetch(new Request("https://example.test/", { method: "POST" }), { ASSETS: assets });
  assert.equal(post.status, 405);
  const missing = await worker.fetch(new Request("https://example.test/missing.txt"), { ASSETS: assets });
  assert.equal(missing.status, 404);
});
