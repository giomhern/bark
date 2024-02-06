"use client"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

import type { User } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function NewTweet({ user }: { user: User }) {
  const [newTweet, setNewTweet] = useState("");
  const addTweet = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${location.origin}/api/route`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tweet: newTweet, userId: user.id }),
        }
      );
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewTweet("");
    } catch (error) {
      console.error("Failed to submit tweet", error);
    }
  };

  const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTweet(e.target.value);
  };

  return (
    <form className="border border-gray-800 border-t-0" onSubmit={addTweet}>
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
      </div>
    </form>
  );
}
