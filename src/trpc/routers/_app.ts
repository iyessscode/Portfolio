import { createTRPCRouter } from "@/trpc/init";

import { authRoute } from "@/trpc/routers/auth";

export const appRouter = createTRPCRouter({
  auth: authRoute,
});

export type AppRouter = typeof appRouter;
