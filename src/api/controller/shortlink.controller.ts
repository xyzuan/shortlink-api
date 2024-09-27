import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prismaDatabase";
import { t } from "elysia";

export const ShortLinkController = createElysia()
  .model({
    "shortlink.model": t.Object({
      longUrl: t.String(),
      shortCode: t.String(),
    }),
  })
  .post(
    "/",
    async ({ body }) => {
      return {
        status: 200,
        data: await prismaClient.shortLink.create({
          data: { ...body },
        }),
      };
    },
    {
      body: "shortlink.model",
    }
  )
  .get("/:shortCode", async ({ params: { shortCode } }) => {
    const shortLink = await prismaClient.shortLink.findUnique({
      where: { shortCode },
    });

    if (!shortLink) {
      return {
        status: 404,
        data: { message: "Shortlink not found" },
      };
    }
    return { status: 200, data: shortLink };
  });
