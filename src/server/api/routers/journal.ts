/* eslint-disable @typescript-eslint/no-unused-vars */
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
      orderBy: {
        createdAt: "desc",
      },
    });
    return journalEntries;
  }),

  getJournalEntry: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const journalEntry = await prisma.entry.findUnique({
        where: {
          id: input.id,
        },
      });
      return journalEntry;
    }),
});
