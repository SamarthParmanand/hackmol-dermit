import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const uid = (await supabase.auth.getUser()).data.user?.id;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", uid)
        .single();

      if (!error) {
        // if an error isnt caught, check if the user has their profile updated, if yes, send them to /general-qa and if not, send them to /profile
        if (!data || !data.name || !data.age || !data.gender) {
          return NextResponse.redirect(`${origin}/profile?v=0`);
        }
        return NextResponse.redirect(`${origin}/general-qa?v=1`);
      }
      return NextResponse.redirect(`${origin}/profile?v=0`); // default fallback in case any error is returned by the supabase query, the most common error returned is "PGRST116", which means that the user entry doesnt exist in the table.
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
