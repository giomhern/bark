"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );
    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });

  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tweets",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return tweets.map((tweet) => (
    <div
      key={tweet.id}
      className="flex justify-center border border-gray-200 px-6 py-4 rounded-xl bg-white shadow-sm"
    >
      <div>
        <Image
          className="rounded-full"
          src={tweet.author.avatar_url ?? ""}
          alt="tweet user avatar"
          width={50}
          height={50}
        />
      </div>
      <div className="ml-4 flex-1">
        <p>
          <span className="font-semibold text-md text-primary-content">
            {tweet.author.name}
          </span>
          <span className="text-sm ml-2 text-secondary-content">
            {tweet.author.user_name}
          </span>
        </p>

        <p className="text-black text-sm break-all overflow-hidden pb-1">
          {tweet.tweet}
        </p>
        <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div>
  ));
}
