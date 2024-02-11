"use client";
import Image from "next/image";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import AuthButtonClient from "./auth-button";
import MyProfileClient from "./my-profile-client";

import { useState } from "react";

export default function Navigation({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 w-full">
      <div className="md:grid md:grid-cols-2 flex justify-center md:justify-start items-center">
        <div className="items-center px-7 py-5 md:py-0">
          <a
            href="/"
            className="md:flex md:justify-center justify-start items-center md:h-14 md:w-14 h-20 w-20"
          >
            <Image
              src="/bark-logo.png"
              alt="bark Logo"
              height={60}
              width={60}
              className="pl-5"
            />
          </a>
        </div>
        <div className="bg-primary-dark items-center" id="navbar-default">
          <ul className="font-regular md:visible hidden text-white md:flex md:flex-row md:justify-end text-xs items-center px-5 py-4 space-x-5">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <MyProfileClient session={session} />
            </li>
            <li>
              <Link href="#">Favorites</Link>
            </li>
            <li>
              <AuthButtonClient session={session} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
