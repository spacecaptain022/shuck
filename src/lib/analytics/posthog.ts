import { PostHog } from "posthog-node";

let _posthog: PostHog | null = null;

export function getPostHog(): PostHog {
  if (!_posthog) {
    _posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "placeholder", {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    });
  }
  return _posthog;
}
