import { createBrowserClient } from "@supabase/ssr";

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co";

export function isDemo() {
  return DEMO_MODE;
}

export function createClient() {
  if (DEMO_MODE) {
    // Return a minimal mock so the app doesn't crash in demo mode
    return null as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
