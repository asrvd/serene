/* eslint-disable react/no-unescaped-entities */
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon } from "./icons/CrossIcon";
import { useState } from "react";
// import { Cross2Icon } from '@radix-ui/react-icons';

const HabitModal = ({
  createHabit,
}: {
  createHabit: (name: string, frequency: number) => void;
}) => {
  const [habitName, setHabitName] = useState<string>("");
  const [habitFrequency, setHabitFrequency] = useState<number>(7);

  const handleAdd = () => {
    console.log(habitName, habitFrequency )
    createHabit(habitName, habitFrequency);
    setHabitName("");
    setHabitFrequency(7);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-violet-11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Create Habit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-zinc-800/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-800 p-4 shadow-xl focus:outline-none">
          <Dialog.Title className="m-0 text-xl font-medium text-zinc-100">
            Create New Habit
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-sm leading-normal text-zinc-300">
            Add a new habit to your list.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex flex-col gap-2">
            <label className="text-right text-xs text-zinc-400" htmlFor="name">
              Habit Name
            </label>
            <input
              className="focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-zinc-700 px-3 py-2 text-base leading-none text-zinc-200 shadow-lg outline-none placeholder:text-zinc-200 focus:shadow-[0_0_0_2px]"
              id="name"
              placeholder="Drink 8 glasses of water"
              onChange={(e) => setHabitName(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex flex-col gap-2">
            <label
              className="text-right text-xs text-zinc-400"
              htmlFor="username"
            >
              Days per week (Enter a number between 1 and 7)
            </label>
            <input
              className="focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-zinc-700 px-3 py-2 text-base leading-none text-zinc-200 shadow-lg outline-none focus:shadow-[0_0_0_2px]"
              id="frequency"
              defaultValue={7}
              onChange={(e) => setHabitFrequency(parseInt(e.target.value))}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="inline-flex h-[35px] items-center justify-center rounded-lg bg-zinc-700/60 px-3 py-2 leading-none text-zinc-200 shadow-lg hover:bg-zinc-700/80 focus:outline-none"
                onClick={() => handleAdd()}
              >
                Add Habit
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[30px] w-[30px] appearance-none items-center justify-center rounded-full bg-zinc-700/60 p-2 text-base text-zinc-200 hover:bg-zinc-700/80 focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HabitModal;
