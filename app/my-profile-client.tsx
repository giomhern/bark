"use client";
import {
  Session,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
export default function MyProfileClient({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const handleUserProfileReq = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    router.push(`/users/${user?.id}`);
  };

  return session ? (
    <button
      onClick={handleUserProfileReq}
      className="text-md text-gray-100 hover:text-primary-content md:visible hidden"
    >
      My Profile
    </button>
  ) : (
    <button className="text-md text-gray-100 hidden">Login</button>
  );
}
