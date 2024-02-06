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
import { useRouter } from "next/navigation";

export default function NewTweet({ user }: { user: User }) {
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const router = useRouter();
  const [newTweet, setNewTweet] = useState("");
  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the form from submitting on Enter key or form action
  };
  async function addTweet({ newTweet }: { newTweet: string }) {
    try {
      const { error } = await supabase
        .from("tweets")
        .insert({ tweet: newTweet, user_id: user.id });
      console.log(newTweet);
      console.log(user.id);

      if (error) throw error;
      setNewTweet('')
      router.refresh()
    } catch {
      alert("error submitting data!");
    }
  }

  const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTweet(e.target.value);
  };

  return (
    <form className="border border-gray-800 border-t-0" onSubmit={handleFormSubmit}>
      <div className="flex gap-2 py-8 px-4 items-center">
        <input
          name="title"
          className="bg-inherit ml-2 text-2xl leading-loose placeholder-gray-500 placeholder:text-sm px-2 text-white"
          placeholder="What is happening?!"
          onChange={(e) => setNewTweet(e.target.value)}
          value={newTweet}
        />
        <button
          className="border border-white bg-white text-sm px-4 py-2"
          onClick={() => addTweet({ newTweet })}
        >
          Add tweet
        </button>
      </div>
    </form>
  );
}
