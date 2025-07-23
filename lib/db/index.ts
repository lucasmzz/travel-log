import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken:
      process.NODE_ENV === "production"
        ? process.env.TURSO_AUTH_TOKEN
        : undefined,
  },
  schema,
});

export default db;
