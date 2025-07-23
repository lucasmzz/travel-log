import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema/index.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken:
      process.NODE_ENV === "production"
        ? process.env.TURSO_AUTH_TOKEN
        : undefined,
  },
});
