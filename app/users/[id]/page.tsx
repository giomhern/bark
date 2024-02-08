import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { profile } from "console";
import { cookies } from "next/headers";

export default async function ProfilePage({ params }: { params: any }) {
  const supabase = createServerComponentClient(
    { cookies },
    {
      supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );
  try {
    const { id } = params;
    const { data: user, error: error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (user) {
      return (
        <div>
          <p>{user.user_name}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Error fetching user profile page</p>
        </div>
      );
    }
  } catch (error) {
    alert("Error fetching user profile page");
  }
}
