import { drizzle } from "drizzle-orm/neon-http";
import { books, users } from "./schema";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import ImageKit from "imagekit";
import dummyBooks from "@/dummy-books.json";
dotenv.config({ path: "./.env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

const seedUsers = async () => {
  const admin1: typeof users.$inferInsert = {
    fullName: "Admin 1",
    email: "admin1@gmail.com",
    password: await bcrypt.hash("12345678", 10),
    universityCard:
      "https://ik.imagekit.io/rakshTechnologies/ids/admin_id_card_book-wise.jpeg?updatedAt=1741417522842",
    universityNumber: 456,
    role: "ADMIN",
  };

  const admin2: typeof users.$inferInsert = {
    fullName: "Admin 2",
    email: "admin2@gmail.com",
    password: await bcrypt.hash("12345678", 10),
    universityCard:
      "https://ik.imagekit.io/rakshTechnologies/ids/admin_id_card_book-wise.jpeg?updatedAt=1741417522842",
    universityNumber: 789,
    role: "ADMIN",
  };

  const usersData = [admin1, admin2];

  try {
    console.log("Seeding Users Data....\n");
    const dummyUsers = await db.insert(users).values(usersData).returning();

    console.log("Seeded Users Data Successfully:\n", dummyUsers);
  } catch (error) {
    console.log(`DB Seeding failed:
        error:${error}\n
        error-message:${(error as Error).message}
        `);
  }
};

const seedBooks = async () => {
  console.log("Seeding Books Data...\n");
  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }
    console.log("Books Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

async function main() {
  await seedUsers();
  await seedBooks();
}

main();
