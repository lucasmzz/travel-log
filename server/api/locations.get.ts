import { db } from '../database/db';
import { locations } from '../database/schema';

export default defineEventHandler(async () => {
  // Fetch all locations ordered by createdAt descending
  const result = await db.select().from(locations);

  return {
    locations: result,
  };
});