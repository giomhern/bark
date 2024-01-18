import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButton from "./auth-button";

// async lets us fetch data in the same component
export default async function Home() {
  // runs all on the server
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_ANON_KEY;
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseUrl: url, supabaseKey: key }
  );
  const { data: tweets } = await supabase.from("tweets").select();

  return (
    <>
      <AuthButton />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>;
    </>
  );
}
