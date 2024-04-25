import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  primaryKey
} from 'drizzle-orm/pg-core';
import { type InferSelectModel } from "drizzle-orm"
import type { AdapterAccount } from "next-auth/adapters"

export const accountTable = pgTable(
  "account",
  {
    userId: text("userId").notNull(),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const userTable = pgTable(
  "user",
  {
    id: text("id").notNull()
      .primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified"),
    image: text("image"),
    password: text("password"),
  },
)

export const sessionTable = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").notNull()
      .primaryKey(),
    userId: text("userId").notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    expires: integer("expires").notNull(),
  }
)

export const taskTable = pgTable(
  "todo-tasks",
  {
    id: serial("id").notNull().primaryKey(),
    userId: text("userId").notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    isCompleted: boolean("is_completed")
      .default(false),
    addedToMyDayManually: boolean("added_to_my_day_manually"),
    addedToMyDayAutomatically: boolean("added_to_my_day_automatically"),
    isImportant: boolean("is_important")
      .default(false),
    createdAt: text("created_at"),
    updatedAt: text("updated_at"),
    dueDate: text("due_date"),
    reminderDate: text("reminder_date"),
    completeDate: text("complete_date"),
    priority: integer("priority"),
    inListId: integer("in_list_id").references(() => listTable.id, { onDelete: "cascade" }),
  }
)

export type TaskType = InferSelectModel<typeof taskTable>

export const listTable = pgTable(
  "todo-lists",
  {
    id: serial("id").notNull()
      .primaryKey(),
    userId: text("userId").notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
  }
)

export type TaskListType = InferSelectModel<typeof listTable>