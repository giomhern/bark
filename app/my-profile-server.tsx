import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MyProfileClient from "./my-profile-client";
export default async function MyProfileServer() {
  const supabase = createServerComponentClient(
    { cookies },
    {
      supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <MyProfileClient session={session} />;
}
