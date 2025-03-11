import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "REJECTED",
  "APPROVED",
]);
export const ROLE_ENUM = pgEnum("role", ["STUDENT", "ADMIN"]);
export const BORROWED_ENUM = pgEnum("borrowed", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
  fullName: varchar({ length: 255 }).notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  universityNumber: integer("university_number").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("STUDENT"),
  lastActivityStatus: date("last_activity_status").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const borrowRecord = pgTable("borrow_record", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROWED_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
