import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  "todo-users",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified"),
    image: text("image"),
    password: text("password"),
  },
)

export const sessions = pgTable(
  "todo-sessions",
  {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires").notNull(),
  }
)

export const tasks = pgTable(
  "todo-tasks",
  {
    id: serial("id").notNull().primaryKey(),
    userId: text("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
  }
)
