import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const habitRouter = createTRPCRouter({
  createHabit: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        frequency: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const habit = await prisma.habit.create({
          data: {
            name: input.name,
            frequency: input.frequency,
            userId: ctx.session.user.id,
          },
        });
        console.log(habit);
        return habit;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          message: "Could not create habit",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getHabits: protectedProcedure.query(async ({ ctx }) => {
    try {
      const habits = await prisma.habit.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      return habits;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        message: "Could not get habits",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
