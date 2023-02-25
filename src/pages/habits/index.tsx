/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import { z } from "zod";
import type { NextPage } from "next";
import type { Habit } from "@prisma/client";
import { api } from "@/utils/api";
import HabitModal from "@/components/HabitModal";

const inputSchema = z.object({
  name: z.string().min(1).max(50),
  frequency: z.number().min(1).max(7),
});

const HabitPage: NextPage = () => {
  const allHabits = api.habit.getHabits.useQuery();
  const ctx = api.useContext();

  const habits = api.habit.createHabit.useMutation({
    onMutate: () => {
      ctx.habit.getHabits.refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCreateHabit = (habitName: string, habitFrequency: number) => {
    const input = inputSchema.safeParse({
      name: habitName,
      frequency: habitFrequency,
    });

    if (!input.success) {
      console.error(input.error);
      return;
    }

    try {
      habits.mutate(input.data);
      ctx.habit.getHabits.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-w-screen justify-cente flex min-h-screen flex-col items-center bg-zinc-900 p-4">
      <div className="flex w-1/3 flex-col items-center justify-center">
        <section className="flex w-full items-center justify-between rounded-lg bg-zinc-800 p-4">
          <h2 className="text-zinc-100">Habits</h2>
          <HabitModal createHabit={handleCreateHabit} />
        </section>
        {allHabits !== null && (
          <section className="flex flex-col items-center justify-center rounded-lg bg-zinc-800">
            {allHabits.data?.map((habit: Habit) => (
              <div key={habit.id} className="flex w-full justify-between">
                <p>{habit.name}</p>
                <p>
                  {habit.frequency} {habit.frequency == 1 ? "day" : "days"} a
                  week
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default HabitPage;
