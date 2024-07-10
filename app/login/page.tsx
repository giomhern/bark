import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButton from "../components/auth-button";
import GithubButton from "./github-button";
import AuthButtons from "../components/auth-buttons";
import EmailComponent from "../components/email-component";
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
    <main>
      <div className="grid grid-cols-2 place-items-center">
        <div className="w-5/12">
          <h3 className="text-4xl font-medium pb-5">Sign up or log in</h3>
          <AuthButtons />
          <EmailComponent />
        </div>

        <div>
          <img src="/login.png" alt="login screen"/>
        </div>
      </div>
    </main>
  );
}
