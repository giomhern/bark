"use client";
import {
  Session,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/dist/server/api-utils";

export default function MyProfileClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const handleUserProfileReq = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  };

  return session ? (
    <button
      onClick={handleUserProfileReq}
      className="text-xs text-gray-400 hover:text-[#940a0a]"
    >
      My Profile
    </button>
  ) : (
    <button className="text-xs text-gray-400 hidden">Login</button>
  );
}
