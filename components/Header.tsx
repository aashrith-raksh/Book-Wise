"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { isUserAdmin } from "@/db/utils";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = ({ session }: { session: Session }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => {
    async function checkAdmin() {
      if (session?.user?.id) {
        const result = await isUserAdmin(session.user.id);
        setIsAdmin(result);
      }
    }
    checkAdmin();
  }, [session?.user?.id]);
  return (
    <header className="my-10 flex justify-between gap-5 items-center">
      <Link href={"/"}>
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      {isAdmin && (
        <Link
          className="font-semibold text-light-200 underline"
          href={"/admin/books"}
        >
          Go to Admin Section
        </Link>
      )}

      <ul className="flex flex-row justify-between items-center gap-5">
        <li>
          <Avatar>
            <AvatarFallback className="bg-amber-100">
              {getInitials(session?.user?.name ?? "User")}
            </AvatarFallback>
          </Avatar>
        </li>
        <li>
          <form
            action={async () => {
              await signOut();
            }}
          >
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
