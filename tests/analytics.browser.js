// Playwright CLI expects a function expression without a trailing semicolon.
// prettier-ignore
async (page) => {
  const results = [];
  for (const signal of ["none", "dnt", "gpc"]) {
    const context = await page
      .context()
      .browser()
      .newContext({
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      });
    await context.addInitScript(
      ({ signal }) => {
        Object.defineProperty(navigator, "doNotTrack", {
          get: () => (signal === "dnt" ? "1" : "0"),
        });
        Object.defineProperty(navigator, "globalPrivacyControl", {
          get: () => signal === "gpc",
        });
        window.analyticsWrites = [];
        const setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function (key, value) {
          window.analyticsWrites.push(key);
          return setItem.call(this, key, value);
        };
        const cookie = Object.getOwnPropertyDescriptor(
          Document.prototype,
          "cookie",
        );
        Object.defineProperty(document, "cookie", {
          get: () => cookie.get.call(document),
          set: (value) => {
            window.analyticsWrites.push("cookie:" + value);
            cookie.set.call(document, value);
          },
        });
      },
      { signal },
    );
    const requests = [];
    const chunks = [];
    await context.route("**/*", async (route) => {
      const href = route.request().url();
      const [, hostname, pathname] = href.match(/^https?:\/\/([^/]+)([^?#]*)/);
      const url = { href, hostname, pathname };
      if (url.hostname !== "lukasbuehler.ch") {
        const bytes = Array.from(route.request().postDataBuffer() || []);
        const data = await testPage.evaluate(async (bytes) => {
          if (!bytes.length) return null;
          const blob = new Blob([new Uint8Array(bytes)]);
          const body =
            bytes[0] === 31
              ? await new Response(
                  blob.stream().pipeThrough(new DecompressionStream("gzip")),
                ).text()
              : await blob.text();
          return JSON.parse(body);
        }, bytes);
        requests.push({ url: url.href, data });
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: '{"status":1}',
        });
      }
      if (url.pathname.endsWith(".js")) chunks.push(url.pathname);
      const response = await page.request.get(
        "http://127.0.0.1:4323" + url.pathname,
      );
      await route.fulfill({ response });
    });
    const testPage = await context.newPage();
    await testPage.goto(
      "https://lukasbuehler.ch/notes/?email=private@example.com#secret",
    );
    await testPage.waitForTimeout(1200);
    const storage = await testPage.evaluate(() => ({
      cookies: document.cookie,
      local: localStorage.length,
      session: sessionStorage.length,
      writes: window.analyticsWrites,
    }));
    if (storage.cookies || storage.local || storage.session)
      throw new Error("Persistent browser storage found");
    if (
      signal !== "none" &&
      (requests.length ||
        storage.writes.length ||
        chunks.some((c) => c.includes("module.no-external")))
    )
      throw new Error("Privacy signal was not respected");
    if (
      signal === "none" &&
      (requests.length !== 1 || requests[0].data.batch?.length !== 1 || requests[0].data.batch[0].event !== "$pageview")
    )
      throw new Error("Expected one pageview: " + JSON.stringify(requests));
    if (
      requests.some(
        (r) =>
          JSON.stringify(r.data).includes("private@example.com") ||
          JSON.stringify(r.data).includes("#secret"),
      )
    )
      throw new Error("URL data leaked");
    results.push({ signal, requests, chunks, storage });
    await context.close();
  }
  return results;
}
