"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function Likes({ tweet }) {
  const router = useRouter();
  const updateLikes = async () => {
    const supabase = createClientComponentClient({
      supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (tweet.user_has_liked_tweet) {
        await supabase.from("likes").delete().match({
          user_id: user.id,
          tweet_id: tweet.id,
        });
      } else {
        await supabase
          .from("likes")
          .insert({ user_id: user.id, tweet_id: tweet.id });
      }
      router.refresh();
    }
  };
  return <button onClick={updateLikes}>{tweet.likes} Likes</button>;
}
