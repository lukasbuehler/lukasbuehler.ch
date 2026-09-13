import { test } from "node:test";
import assert from "node:assert/strict";
import { startAnalytics, pageviewOnly } from "../src/lib/analytics.mjs";

const context = () => ({
  enabled: true,
  token: "phc_test",
  location: { protocol: "https:", hostname: "lukasbuehler.ch" },
  navigator: {},
  windowDnt: undefined,
});

test("privacy signals prevent SDK loading entirely", async () => {
  for (const values of [
    { doNotTrack: "1" },
    { doNotTrack: "yes" },
    { msDoNotTrack: "1" },
    { globalPrivacyControl: true },
  ]) {
    let loads = 0;
    await startAnalytics({ ...context(), navigator: values }, async () => {
      loads++;
      return () => {};
    });
    assert.equal(loads, 0);
  }
  let loads = 0;
  await startAnalytics({ ...context(), windowDnt: "1" }, async () => {
    loads++;
  });
  assert.equal(loads, 0);
});

test("only configured production host loads analytics; local builds stay quiet", async () => {
  for (const overrides of [
    { enabled: false },
    { token: "" },
    { token: "phx_personal_key" },
    { location: { protocol: "http:", hostname: "lukasbuehler.ch" } },
    { location: { protocol: "https:", hostname: "preview.pages.dev" } },
    { location: { protocol: "http:", hostname: "localhost" } },
  ]) {
    await startAnalytics({ ...context(), ...overrides }, async () => {
      assert.fail("SDK should not load");
    });
  }
  let initialized = 0;
  await startAnalytics(
    { ...context(), navigator: { doNotTrack: "0" } },
    async () => () => initialized++,
  );
  assert.equal(initialized, 1);
});

test("DNT changing during download prevents initialization", async () => {
  const ctx = context();
  await startAnalytics(ctx, async () => {
    ctx.navigator.doNotTrack = "1";
    return () => assert.fail("should not initialize");
  });
});

test("only sanitized pageviews are allowed; no referrers, query strings, IDs, or content", () => {
  const input = {
    event: "$pageview",
    uuid: "event-id",
    timestamp: "2026-09-13",
    $set: { email: "private@example.com" },
    properties: {
      token: "phc_test",
      distinct_id: "$posthog_cookieless",
      $cookieless_mode: true,
      $raw_user_agent: "Mozilla/5.0 test-browser",
      $device_id: "device",
      $session_id: "session",
      $referrer: "https://example.com/private",
      $current_url: "https://lukasbuehler.ch/?email=secret#token",
      $set: { name: "private" },
      text: "page contents",
    },
  };
  const result = pageviewOnly(
    input,
    "https://lukasbuehler.ch/notes/?email=secret#token",
    false,
  );
  assert.deepEqual(result.properties, {
    token: "phc_test",
    distinct_id: "$posthog_cookieless",
    $cookieless_mode: true,
    $raw_user_agent: "Mozilla/5.0 test-browser",
    $current_url: "https://lukasbuehler.ch/notes/",
    $pathname: "/notes/",
    $host: "lukasbuehler.ch",
    $process_person_profile: false,
  });
  assert.ok(!("$set" in result));
  assert.equal(pageviewOnly(input, "https://lukasbuehler.ch/", true), null);
  assert.equal(
    pageviewOnly(
      { ...input, event: "$autocapture" },
      "https://lukasbuehler.ch/",
      false,
    ),
    null,
  );
});
