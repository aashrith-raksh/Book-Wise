"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { isUserAdmin } from "@/db/utils";

const Header = ({ session }: { session: Session }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  const pathname = usePathname();

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
          <Link
            href={"/library"}
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name ?? "User")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
