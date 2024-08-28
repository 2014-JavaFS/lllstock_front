"use client";
import Image from "next/image";
import LSP from "./livestock/page";
import LTP from "./livestock_table/page";
import Link from "next/link";
import Register from "./register/page";
import Profile from "./user_profile/page";
import Error from "./error/error_page";
export default function Home() {
  return (
    <main className="flex-grow">
      <Profile />
    </main>
  );
}
