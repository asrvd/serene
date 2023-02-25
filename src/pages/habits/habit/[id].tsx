/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import Layout from "@/components/layout";
import ToolTip from "@/components/ToolTip";

const HabitPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady)
    return <div className="bg-zinc-900 text-zinc-200">Loading...</div>;

  const ctx = api.useContext();

  const habit = api.habit.getHabit.useQuery({
    id: id as string,
  });

  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const sevenDates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    sevenDates.push(date);
  }

  const date = api.habit.enterDate.useMutation({
    onMutate: () => {
      ctx.habit.getHabitDates.refetch();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      ctx.habit.getHabitDates.invalidate();
    },
  });

  const handleDateEnter = (habitDate: Date) => {
    try {
      date.mutate({
        id: id as string,
        date: habitDate,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dates = api.habit.getHabitDates
    .useQuery({
      id: id as string,
    })
    .data?.slice(-10)
    .filter(
      (date) =>
        new Date(date.date) >= oneWeekAgo && new Date(date.date) <= today
    );

  const streak = dates?.reduce(
    (acc: number, curr: { date: string | number | Date }, index: number) => {
      if (index == 0) return 1;
      const prevDate = dates[index - 1]?.date || new Date();
      const currDate = new Date(curr.date);
      const diff = Math.abs(currDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (diffDays == 1) return acc + 1;
      return 1;
    },
    0
  );

  return (
    <Layout>
      <div className="my-14 flex h-full w-[95%] flex-col items-center justify-start lg:px-16">
        <div className="flex h-full w-full flex-col justify-start divide-y-2 divide-zinc-500">
          <div className="py-3">
            <h2 className="text-[4rem] font-black leading-none text-zinc-100 lg:text-[5rem]">
              {habit.data?.name}
            </h2>
            <p className="mt-2 text-base text-zinc-300">
              <strong>Habit Goal</strong>: {habit.data?.frequency}{" "}
              {habit.data?.frequency == 1 ? "day" : "days"} a week
            </p>
            <p className="text-base text-zinc-300">
              <strong>Current Streak</strong>: {streak} day
            </p>
          </div>
          <div className="py-3">
            <div className="flex w-full gap-6 rounded-lg bg-zinc-800/60 p-4 shadow-xl">
              {sevenDates.reverse().map((date, index) => {
                // const dateStr = date.toISOString().split("T")[0];
                return (
                  <div
                    key={index}
                    className="w-1/7 flex h-20 flex-col items-center justify-center rounded-lg"
                  >
                    <p className="text-xs text-zinc-300">
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <p className="text-xs text-zinc-300">
                      {date.toLocaleDateString("en-US", {
                        day: "2-digit",
                      })}
                    </p>
                    <ToolTip
                      name={
                        dates?.find((d) => d.date.getDay() == date.getDay())
                          ? "Done"
                          : "Not Done"
                      }
                      position="bottom"
                    >
                      <div
                        className={`mt-2 h-6 w-6 rounded-full ${
                          dates?.find((d) => d.date.getDay() == date.getDay())
                            ? "bg-green-200"
                            : date < today
                            ? "bg-red-200"
                            : "bg-zinc-500"
                        }`}
                      ></div>
                    </ToolTip>
                  </div>
                );
              })}
            </div>
            <button
              className="mt-4 rounded-lg bg-zinc-800/60 px-4 py-2 text-zinc-300 hover:bg-zinc-800/80"
              onClick={() => handleDateEnter(today)}
              disabled={
                dates?.find((d) => d.date.getDay() == today.getDay())
                  ? true
                  : false
              }
            >
              {dates?.find((d) => d.date.getDay() == today.getDay())
                ? "Already Marked"
                : "Mark as Done"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HabitPage;
