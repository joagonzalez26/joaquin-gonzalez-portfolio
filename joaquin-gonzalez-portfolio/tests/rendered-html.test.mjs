import assert from "node:assert/strict";
import test from "node:test";

test("renders portfolio identity and working local link targets", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Joaquín Gonzalez \| Analista en Sistemas · Software · QA · AI<\/title>/);
  assert.match(html, /<html lang="es"/);
  assert.match(html, /href="mailto:joagonzalez166@gmail.com"/);
  assert.match(html, /href="https:\/\/github.com\/joagonzalez26"/);
  assert.match(html, /href="https:\/\/www.linkedin.com\/in\/joagonzalez26\/"/);
  assert.match(html, /href="\/assets\/Joaquin-Gonzalez-CV.pdf" download/);
  const { existsSync } = await import("node:fs");
  for (const [, id] of html.matchAll(/href="#([^"#]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `Missing anchor: ${id}`);
  }
  for (const [, asset] of html.matchAll(/(?:href|src)="(\/(?:images|assets)\/[^"?]+\.(?:png|pdf))"/g)) {
    assert.ok(existsSync(new URL(`../public${asset}`, import.meta.url)), `Missing asset: ${asset}`);
  }
});
