import {
  startAnalytics,
  trackingBlocked,
  pageviewOnly,
} from "../lib/analytics.mjs";
import type { PostHogConfig } from "posthog-js";
import { analyticsConfig } from "../lib/analytics-config";

const context = {
  enabled: import.meta.env.PROD && analyticsConfig.enabled,
  token: analyticsConfig.token,
  location: window.location,
  navigator: window.navigator,
  get windowDnt() {
    return (window as Window & { doNotTrack?: string }).doNotTrack;
  },
};
const blocked = () => trackingBlocked(context.navigator, context.windowDnt);

void startAnalytics(context, async () => {
  const { default: posthog } = await import("posthog-js/no-external");
  const canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )?.href;
  return () => {
    // Only published, canonical pages are measured. Never collect arbitrary 404 paths.
    if (!canonical || canonical.endsWith("/404.html")) return;
    const config: Partial<PostHogConfig> = {
      api_host: "https://eu.i.posthog.com",
      ui_host: "https://eu.posthog.com",
      cookieless_mode: "always",
      persistence: "memory",
      disable_persistence: true,
      respect_dnt: true,
      person_profiles: "never",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_dead_clicks: false,
      capture_heatmaps: false,
      capture_performance: false,
      capture_exceptions: false,
      logs: { captureConsoleLogs: false, beforeSend: () => null },
      rageclick: false,
      disable_session_recording: true,
      disable_surveys: true,
      disable_conversations: true,
      disable_product_tours: true,
      disable_web_experiments: true,
      disable_external_dependency_loading: true,
      advanced_disable_flags: true,
      save_referrer: false,
      save_campaign_params: false,
      ip: false,
      request_batching: false,
      get_current_url: () => canonical,
      before_send: (event) => pageviewOnly(event, canonical, blocked()),
    };
    posthog.init(context.token, config);
    if (!blocked()) posthog.capture("$pageview");
  };
}).catch(() => {
  // Analytics being unavailable must never interfere with reading.
});
