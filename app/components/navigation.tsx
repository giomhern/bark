import AuthButtonClient from "./auth-button";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navigation() {
  return <nav className="w-full"></nav>;
}
