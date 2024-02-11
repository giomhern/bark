import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewTweet from "./components/new-tweet";
import Tweets from "./components/tweets";
import Navigation from "./components/nav-bar";
import LeftSideBar from "./components/left-side-bar";
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
    <div className="w-full bg-gray-100">
      <Navigation session={session} />
      <div className="grid md:grid-cols-4 grid-cols-1">
        <LeftSideBar user={session.user} />
        <div className="border-t-0 md:flex md:flex-col md:col-span-2">
          <NewTweet user={session.user} />
          <Tweets tweets={tweets} />
        </div>
        <div className=" md:visible hidden">hello world</div>
      </div>
    </div>
  );
}
