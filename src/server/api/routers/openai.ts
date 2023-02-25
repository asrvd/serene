import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const openaiRouter = createTRPCRouter({
  reply: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log("input", input);
      try {
        const res = await ctx.openai.createCompletion({
          model: "text-davinci-002",
          prompt: `Suppose you are a therapist, now provide emotional support for the following issue - \n\n${input.prompt}`,
          max_tokens: 1500,
          temperature: 0.4,
          top_p: 1,
          best_of: 1,
        });
        const data = res.data;
        console.log("data", data);
        return data;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          message: "Could not generate a response",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
