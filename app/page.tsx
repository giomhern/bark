import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Tweets from "./tweets";
import Image from "next/image";
import MyProfileClient from "./my-profile-client";
import MyProfileServer from "./my-profile-server";

export const dynamic = "force-dynamic";

// anything in the app directory is automatically a server component unless
// directed by using the 'use client' directive at the top of the page

// async lets us fetch data in the same component
export default async function Home() {
  // runs all on the server
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_ANON_KEY;
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

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)")
    .order("created_at", { ascending: false });

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between px-4 py-6 border border-gray-200 border-t-0">
        <a href="/">
          <Image src="/dog-logo.png" alt="dog logo" height={80} width={80} />
        </a>
        <div className="flex gap-3">
            <MyProfileServer />
            <AuthButtonServer />
        </div>
      </div>
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </div>
  );
}
