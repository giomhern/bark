"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function NewTweet({ user }: { user: User }) {
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const router = useRouter();
  const [newTweet, setNewTweet] = useState("");
  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent the form from submitting on Enter key or form action
  };
  async function addTweet({ newTweet }: { newTweet: string }) {
    try {
      const { error } = await supabase
        .from("tweets")
        .insert({ tweet: newTweet, user_id: user.id });

      if (error) throw error;
      setNewTweet("");
      router.refresh();
    } catch {
      alert("error submitting data!");
    }
  }

  const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTweet(e.target.value);
  };

  return (
    <form
      className="border border-gray-200 border-t-0"
      onSubmit={handleFormSubmit}
    >
      <div className="flex w-full gap-2 py-8 px-6 items-center justify-evenly ">
        <Image
          src={user.user_metadata.avatar_url}
          alt="logo"
          height={50}
          width={50}
          className="rounded-full"
        />
        <input
          name="title"
          className="flex-1 appearance-none text-sm text-[#191515]  placeholder-gray-500 placeholder:text-md bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="What is happening?!"
          onChange={(e) => setNewTweet(e.target.value)}
          value={newTweet}
          contentEditable="true"
        />
        <button
          className="hover:bg-[#940a0a] bg-[#5a0101] text-sm pl-4 flex-shrink-0 text-[#f7f7f7] px-4 py-1"
          onClick={() => addTweet({ newTweet })}
          type="button"
        >
          Send
        </button>
      </div>
    </form>
  );
}
