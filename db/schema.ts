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
