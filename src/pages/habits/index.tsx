/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { z } from "zod";
import type { NextPage } from "next";
import type { Habit } from "@prisma/client";
import { api } from "@/utils/api";
import HabitModal from "@/components/HabitModal";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

const inputSchema = z.object({
  name: z.string().min(1).max(50),
  frequency: z.number().min(1).max(7),
});

const HabitsPage: NextPage = () => {
  const allHabits = api.habit.getHabits.useQuery();
  const ctx = api.useContext();
  const router = useRouter();

  const habits = api.habit.createHabit.useMutation({
    onMutate: () => {
      ctx.habit.getHabits.refetch();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      ctx.habit.getHabits.invalidate();
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
      // ctx.habit.getHabits.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center lg:w-[95%] ">
        <section className="flex w-full items-center justify-between lg:px-16">
          <h2 className="font-serif text-[4rem] font-bold tracking-tight text-zinc-50 lg:text-[6rem]">
            Habits
          </h2>
          <HabitModal createHabit={handleCreateHabit} />
        </section>
        {allHabits !== null && (
          <section className="grid h-full max-h-full w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:px-16 ">
            {allHabits.data?.map((habit: Habit) => (
              <div
                key={habit.id}
                className="flex cursor-pointer h-full w-full flex-col justify-between gap-6 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/60 duration-200 p-4 text-left shadow-xl"
                // href={`/journal/habit/${habit.id}`}
                onClick={() => router.push(`/habits/habit/${habit.id}`)}
              >
                <h2 className="text-2xl font-black text-zinc-100">
                  {habit.name}
                </h2>
                <p className="text-sm text-zinc-300">
                  created{" "}
                  {new Date(habit.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default HabitsPage;
