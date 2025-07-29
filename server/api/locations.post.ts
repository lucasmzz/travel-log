import { InsertLocation } from "../../lib/db/schema";
import { DrizzleError } from "drizzle-orm";
import slugify from "slug";
import {
  findLocationByName,
  findUniqueSlug,
  insertLocation,
} from "../../lib/db/queries/location";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized ",
      })
    );
  }

  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "Invalid Body",
      })
    );
  }

  const existingLocation = await findLocationByName(
    result.data,
    event.context.user.id
  );

  if (existingLocation) {
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: "Location already exists",
      })
    );
  }

  const slug = await findUniqueSlug(slugify(result.data.name));

  try {
    return insertLocation(result.data, slug, event.context.user.id);
  } catch (e) {
    const error = e as DrizzleError;
    if (error.message) {
      return sendError(
        event,
        createError({
          statusCode: 409,
          statusMessage: "Slug must be unique!",
        })
      );
    }
    throw error;
  }
});
