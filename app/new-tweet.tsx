import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function NewTweet() {
  const addTweet = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));

    const supabase = createServerActionClient<Database>(
      { cookies },
      {
        supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      }
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("tweets").insert({ tweet: title, user_id: user.id });
    }
  };
  return (
    <form action={addTweet} className="bg-inherit text-black">
      <input name="title" />
    </form>
  );
}
