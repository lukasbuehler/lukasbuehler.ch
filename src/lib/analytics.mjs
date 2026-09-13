/** Keep the SDK behind this gate: cookieless SDK consent is not a DNT network gate. */
export function trackingBlocked(navigator, windowDnt) {
  const signals = [navigator.doNotTrack, navigator.msDoNotTrack, windowDnt];
  return (
    navigator.globalPrivacyControl === true ||
    signals.some((value) => ["1", "yes"].includes(String(value).toLowerCase()))
  );
}

export function shouldLoadAnalytics({
  enabled,
  token,
  location,
  navigator,
  windowDnt,
}) {
  return (
    enabled &&
    /^phc_[A-Za-z0-9_]+$/.test(token ?? "") &&
    location.protocol === "https:" &&
    location.hostname === "lukasbuehler.ch" &&
    !trackingBlocked(navigator, windowDnt)
  );
}

/** Reduce events to page counts and the SDK's required cookieless transport fields. */
export function pageviewOnly(event, canonicalUrl, blocked) {
  if (blocked || !event || event.event !== "$pageview") return null;
  if (
    event.properties.$cookieless_mode !== true ||
    event.properties.distinct_id !== "$posthog_cookieless"
  )
    return null;
  const url = new URL(canonicalUrl);
  const properties = {};
  for (const key of [
    "token",
    "distinct_id",
    "$cookieless_mode",
    // Required hash input; PostHog drops cookieless events without it, then
    // removes it server-side after hashing rather than storing it on the event.
    "$raw_user_agent",
    "$lib",
    "$lib_version",
  ]) {
    if (key in event.properties) properties[key] = event.properties[key];
  }
  return {
    event: "$pageview",
    timestamp: event.timestamp,
    uuid: event.uuid,
    properties: {
      ...properties,
      $current_url: url.origin + url.pathname,
      $pathname: url.pathname,
      $host: url.hostname,
      $process_person_profile: false,
    },
  };
}

export async function startAnalytics(context, load) {
  if (!shouldLoadAnalytics(context)) return;
  const initialize = await load();
  // A privacy signal may change while the SDK chunk downloads.
  if (shouldLoadAnalytics(context)) initialize();
}
