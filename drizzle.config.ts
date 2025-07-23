import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: process.NODE_ENV === 'production' ? 'turso' : 'sqlite',
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: process.NODE_ENV === 'production' ? process.env.TURSO_DATABASE_URL! : 'file:local.db',
    authToken: process.NODE_ENV === 'production' ? process.env.TURSO_AUTH_TOKEN : undefined,
  },

});
