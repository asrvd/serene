import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { habitRouter } from "./routers/habit";
import { journalRouter } from "./routers/journal";
import { openaiRouter } from "./routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  openai: openaiRouter,
  habit: habitRouter,
  journal: journalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
