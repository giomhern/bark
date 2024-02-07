"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GithubButton() {
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="p-8 flex gap-5 font-regular tracking-tight items-center hover:scale-105 rounded-xl"
    >
      <Image
        src="/github-logo-dark.png"
        alt="GitHub logo"
        width={100}
        height={100}
      />
      Log in with Github
    </button>
  );
}
