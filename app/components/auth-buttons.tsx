"use client";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButtons() {
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  const handleGithubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="space-y-3 pb-5 border-b  border-gray-300">
      <button
        onClick={handleGoogleSignIn}
        className="border border-gray-300 w-full px-5 py-2 rounded-lg flex items-center hover:bg-gray-200 hover:cursor-pointer justify-center gap-2"
      >
        <FcGoogle size={24} /> Continue with Google
      </button>
      <button
        onClick={handleGithubSignIn}
        className="border border-gray-300 px-5 py-2 w-full rounded-lg flex items-center hover:bg-gray-200 hover:cursor-pointer justify-center gap-2"
      >
        <FaGithub size={24} /> Continue with Github
      </button>
    </div>
  );
}
