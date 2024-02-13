"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/auth-helpers-nextjs";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewTweet({ user }: { user: User }) {
  const router = useRouter();
  const [newTweet, setNewTweet] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  useEffect(() => {
    adjustTextareaHeight();
  }, [newTweet]); // Adjust height whenever newTweet changes

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"; // Reset height to calculate new scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

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

  return (
    <form
      className="border bg-white rounded-xl shadow-sm"
      onSubmit={handleFormSubmit}
    >
      <div className="flex w-full gap-2 py-4 px-6 items-center justify-evenly ">
        <Image
          src={user.user_metadata.avatar_url}
          alt="logo"
          height={50}
          width={50}
          className="rounded-full"
        />
        <textarea
          ref={textareaRef}
          name="title"
          className="flex-1 appearance-none text-sm text-primary-content placeholder-gray-500 placeholder:text-md bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none resize-none overflow-hidden"
          placeholder="What are you barking?!"
          onChange={(e) => setNewTweet(e.target.value)}
          value={newTweet}
        />
        <button
          className=" bg-primary-dark hover:bg-primary-light hover:border-primary-light flex gap-1 text-xs tracking-regular border border-primary-dark px-5 text-white py-2 rounded-full"
          onClick={() => addTweet({ newTweet })}
          type="button"
        >
          Send
        </button>
      </div>
    </form>
  );
}
