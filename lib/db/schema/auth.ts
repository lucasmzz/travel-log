import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: int().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text(),
  createdAt: integer()
    .$default(() => Date.now())
    .notNull(),
  updatedAt: integer()
    .$default(() => Date.now())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: int().primaryKey(),
  expiresAt: integer().notNull(),
  token: text().notNull().unique(),
  createdAt: integer().notNull(),
  updatedAt: integer().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: int().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: integer(),
  refreshTokenExpiresAt: integer(),
  scope: text(),
  password: text(),
  createdAt: integer().notNull(),
  updatedAt: integer().notNull(),
});

export const verification = sqliteTable("verification", {
  id: int().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer().notNull(),
  createdAt: integer().$default(() => Date.now()),
  updatedAt: integer().$default(() => Date.now()),
});
