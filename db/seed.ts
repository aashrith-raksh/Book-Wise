import { drizzle } from "drizzle-orm/neon-http";
import { users } from "./schema";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function main() {
  const user1: typeof users.$inferInsert = {
    fullName: "Jay",
    email: "jay@gmail.com",
    password: await bcrypt.hash("jay", 10),
    universityCard: "null",
    universityNumber: 456,
  };

  const user2: typeof users.$inferInsert = {
    fullName: "Roy",
    email: "roy@gmail.com",
    password: await bcrypt.hash("roy", 10),
    universityCard: "dummy-url",
    universityNumber: 789,
  };

  const usersData = [user1, user2];

  try {
    console.log("INSERTING SEED USERS....\n");
    const insertedDummyUsers = await db
      .insert(users)
      .values(usersData)
      .onConflictDoNothing();

    console.log("INSERTED SEED USRS:\n", insertedDummyUsers);
  } catch (error) {
    console.log(`DB Seeding failed:
        error:${error}\n
        error-message:${(error as Error).message}
        `);
  }
}

main();
