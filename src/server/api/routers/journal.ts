import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const journalRouter = createTRPCRouter({
  createJournalEntry: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const journalEntry = await prisma.entry.create({
          data: {
            title: input.title,
            text: input.text,
            userId: ctx.session.user.id,
          },
        });
        return journalEntry;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          message: "Could not create journal entry",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getJournalEntries: protectedProcedure.query(async ({ ctx }) => {
    const journalEntries = await prisma.entry.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return journalEntries;
  }),
});
