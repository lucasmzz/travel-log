import { insertLocation, location } from "../../lib/db/schema";
import db from "../../lib/db";
import { DrizzleError, eq, and } from "drizzle-orm";
import slugify from "slug";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

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

  const result = await readValidatedBody(event, insertLocation.safeParse);

  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "Invalid Body",
      })
    );
  }

  const existingLocation = await db.query.location.findFirst({
    where: and(
      eq(location.name, result.data.name),
      eq(location.userId, event.context.user.id)
    ),
  });

  if (existingLocation) {
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: "Location already exists",
      })
    );
  }

  let slug = slugify(result.data.name);
  let existing = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await db.query.location.findFirst({
      where: eq(location.slug, idSlug),
    }));

    if (!existing) {
      slug = idSlug;
    }
  }

  try {
    const [created] = await db
      .insert(location)
      .values({
        ...result.data,
        userId: event.context.user.id,
        slug,
      })
      .returning();
    return created;
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
