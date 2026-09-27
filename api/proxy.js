const ORIGIN = "https://joaquin-gonzalez-portfolio.joagonzalez26.chatgpt.site";

export default async function handler(req, res) {
  try {
    const rawPath = Array.isArray(req.query.path)
      ? req.query.path.join("/")
      : (req.query.path || "");

    const search = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";

    const cleanSearch = search
      .replace(/([?&])path=[^&]*/g, "$1")
      .replace(/[?&]$/, "");

    const upstreamUrl = ORIGIN + "/" + rawPath + cleanSearch;

    const headers = {};
    for (const [key, value] of Object.entries(req.headers || {})) {
      if (!value) continue;
      const lower = key.toLowerCase();
      if (["host", "content-length", "connection", "accept-encoding"].includes(lower)) continue;
      headers[key] = Array.isArray(value) ? value.join(", ") : value;
    }

    const upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers,
      redirect: "manual"
    });

    res.statusCode = upstream.status;

    upstream.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (["content-encoding", "content-length", "transfer-encoding", "connection"].includes(lower)) return;
      if (lower === "content-security-policy") return;
      if (lower === "content-security-policy-report-only") return;
      if (lower === "location" && value.startsWith(ORIGIN)) {
        res.setHeader(key, value.replace(ORIGIN, ""));
        return;
      }
      res.setHeader(key, value);
    });

    const body = Buffer.from(await upstream.arrayBuffer());
    res.end(body);
  } catch (err) {
    res.statusCode = 502;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Proxy error: " + (err?.message || String(err)));
  }
}
