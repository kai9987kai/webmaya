import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");

const worker = `const securityHeaders = {
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};

async function assetResponse(request, env, pathname) {
  const target = new URL(pathname, request.url);
  const assetRequest = new Request(target, {
    method: request.method,
    headers: request.headers
  });
  const response = await env.ASSETS.fetch(assetRequest);
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
  if (pathname === "/og.png" && response.ok) headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD")
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    if (!env?.ASSETS?.fetch) return new Response("Static asset binding unavailable", { status: 503 });
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    return assetResponse(request, env, pathname);
  }
};
`;

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await copyFile(resolve(root, "index.html"), resolve(client, "index.html"));
await copyFile(resolve(root, "og.png"), resolve(client, "og.png"));
await writeFile(resolve(server, "index.js"), worker, "utf8");

console.log("Built WebMaya v6 for Sites.");
