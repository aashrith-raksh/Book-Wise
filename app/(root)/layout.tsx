import Header from "@/components/Header";
import { db } from "@/db";
import redis from "@/db/redis";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  after(async () => {
    try {
      if (!session.user?.id) {
        throw new Error("User not authenticated");
      }

      console.log(`User authenticated: ${session.user.id}`);
      const lastActivityDate = await redis.get("LAST_ACTIVITY_DATE");

      if (lastActivityDate) {
        console.log(
          `Skipping DB update. Last activity already recorded: ${lastActivityDate}`
        );
        return;
      }

      const now = new Date();
      const latestActivityDate = now.toISOString().slice(0, 10);

      console.log(
        `Updating last activity status for user ${session.user.id} to ${latestActivityDate}`
      );

      await db
        .update(users)
        .set({ lastActivityStatus: latestActivityDate })
        .where(eq(users.id, session?.user?.id));

      // set the expiry time of key in redis
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const midnight_in_seconds = Math.floor(midnight.getTime() / 1000);
      const now_in_seconds = Math.floor(now.getTime() / 1000);

      const seconds_until_midnight = midnight_in_seconds - now_in_seconds;

      console.log(
        `Caching last activity date in Redis with expiry in ${seconds_until_midnight} seconds (until midnight)`
      );

      Promise.all([
        redis.set("LAST_ACTIVITY_DATE", latestActivityDate),
        redis.expire("LAST_ACTIVITY_DATE", seconds_until_midnight),
      ]);
    } catch (error) {
      console.log((error as Error).message);
    }
  });
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session}></Header>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
