import { relations } from "drizzle-orm";
import { boolean, index, text, timestamp, unique } from "drizzle-orm/pg-core";

import { accounts } from "@/drizzle/schemas/auth/accounts";
import { authSchema } from "@/drizzle/schemas/auth/auth-schema";
import { sessions } from "@/drizzle/schemas/auth/sessions";

export const users = authSchema.table(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    role: text("role"),
    banned: boolean("banned").default(false),
    banReason: text("ban_reason"),
    banExpires: timestamp("ban_expires"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    unique("uq_users_email").on(t.email),
    index("idx_users_email").on(t.email),
    index("idx_users_name").on(t.name),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));
