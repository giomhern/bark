"use server";
import { useRouter } from "next/router";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { createClient } from "@supabase/supabase-js";

export default async function ProfilePage({ params }: {params: any}) {
  const { id } = params;
  return <h1>This is your profile page...in the works for ID {id ?? "1"}</h1>;
}
