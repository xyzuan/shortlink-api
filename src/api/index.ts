import { createElysia } from "@libs/elysia";
import { ShortLinkController } from "./controller/shortlink.controller";

const apiRoutes = createElysia({ prefix: "v1" }).group("/shortener", (api) =>
  api.use(ShortLinkController)
);

export default apiRoutes;
