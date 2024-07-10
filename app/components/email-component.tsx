"use client";
import { useState } from "react";

export default function EmailComponent() {
  const [email, setEmail] = useState("");
  return (
    <form className="pt-5 space-y-3">
      <input
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="border peer border-gray-300 text-sm px-5 py-2 rounded-md w-full focus:outline-none invalid:text-pink-600 disabled:bg-slate-50"
      />

      <button className="w-full text-white text-md bg-green-300 py-2 rounded-lg hover:bg-green-400">
        Continue with email
      </button>

      <p className="text-xs">
        By continuing with Google, Apple, or email, you agree to Bark's{" "}
        <a className="underline">Terms of Service</a> and{" "}
        <a className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
