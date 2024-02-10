import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Tweets from "./tweets";
import Image from "next/image";
import MyProfileServer from "./my-profile-server";
import Link from "next/link";
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
    <div className="w-full">
      <div className="grid grid-cols-2 items-center py-8 md:py-0">
        <a href="/" className="px-10">
          <Image src="/bark-logo.png" alt="dog logo" height={40} width={40} />
        </a>
        <div className="flex gap-5 justify-end items-center pr-5 bg-primary-dark py-8">
          <MyProfileServer />
          <Link
            href="#"
            className="font-regular text-gray-100 md:visible hidden hover:text-primary-content "
          >
            Messages
          </Link>
          <Link
            href="#"
            className="font-regular text-gray-100 md:visible hidden hover:text-primary-content "
          >
            Favorites
          </Link>
          <AuthButtonServer />
        </div>
      </div>
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </div>
  );
}
