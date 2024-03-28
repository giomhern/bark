import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewTweet from "./components/new-tweet";
import Tweets from "./components/tweets";
import LeftSideBar from "./components/left-side-bar";
import RightSideBar from "./components/right-side-bar";
import Image from "next/image";
export const dynamic = "force-dynamic";

// anything in the app directory is automatically a server component unless
// directed by using the 'use client' directive at the top of the page

// async lets us fetch data in the same component
export default async function Home() {
  // runs all on the server
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
    <div className="w-full ">
      <div className="grid md:grid-cols-4 grid-cols-1">
        <LeftSideBar user={session.user} />
        <div className="flex flex-col md:justify-normal md:col-span-2 gap-3 px-5 md:px-0 bg-gray-100">
          <div className="max-w-lg mx-auto">
            <Image
              className="md:hidden visible py-2"
              src="/bark-logo.png"
              alt="this is the logo"
              width={50}
              height={50}
            />
          </div>
          <NewTweet user={session.user} />
          <div
            className="overflow-y-auto flex flex-col gap-3 md:px-0"
            style={{ maxHeight: "calc(100vh)" }}
          >
            <Tweets tweets={tweets} />
          </div>
        </div>
        <RightSideBar user={session.user} />
      </div>
    </div>
  );
}
