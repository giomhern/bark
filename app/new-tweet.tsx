"use client";
import {
  createClientComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

import type { User } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Tweet } from "./global";

export default function NewTweet({ user }: { user: User }) {
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const [newTweet, setNewTweet] = useState("");

  async function addTweet({ newTweet }: { newTweet: string }) {
    try {
      const { error } = await supabase
        .from("tweets")
        .insert({ tweet: newTweet, user_id: user.id });
      if (Error) throw Error;
      alert("tweet submitted!");
    } catch {
        alert("error submitting data!")
    }
  }

  const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTweet(e.target.value);
  };

  return (
    <form className="border border-gray-800 border-t-0">
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <input
          name="title"
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2 text-white"
          placeholder="What is happening?!"
          onChange={handleTweetChange}
          value={newTweet}
        />
        <button onClick={() => addTweet}>Submit</button>
      </div>
    </form>
  );
}
