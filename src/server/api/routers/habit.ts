/* eslint-disable @typescript-eslint/no-unused-vars */
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
        orderBy: {
          createdAt: "desc",
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

  getHabit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const habit = await prisma.habit.findUnique({
          where: {
            id: input.id,
          },
        });
        return habit;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          message: "Could not get habit",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  enterDate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const date = await prisma.habitDate.create({
          data: {
            date: input.date,
            habitId: input.id,
          },
        });
        return date;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          message: "Could not enter date",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getHabitDates: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const dates = await prisma.habitDate.findMany({
          where: {
            habitId: input.id,
          },
        });
        return dates;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          message: "Could not get dates",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
