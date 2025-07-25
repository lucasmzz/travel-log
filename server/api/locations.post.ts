import { insertLocation, location } from "../../lib/db/schema";
import db from "../../lib/db";

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

  const [created] = await db
    .insert(location)
    .values({
      ...result.data,
      userId: event.context.user.id,
      slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
    })
    .returning();

  return created;
});
