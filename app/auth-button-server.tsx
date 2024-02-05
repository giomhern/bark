import {
  createServerComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButton from "./auth-button";

export default async function AuthButtonServer() {
  const supabase = createServerComponentClient<Database>(
    { cookies },
    {
      supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthButton session={session} />;
}
