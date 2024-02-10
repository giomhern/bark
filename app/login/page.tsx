import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButton from "../components/auth-button";
import GithubButton from "./github-button";
export const dynamic = "force-dynamic";
export default async function Login() {
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

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <GithubButton />
    </div>
  );
}
