import db from "../../lib/db";
import { location } from "../../lib/db/schema";

export default defineEventHandler(async () => {
  const result = await db.select().from(location);

  return {
    locations: result,
  };
});
