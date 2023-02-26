/* eslint-disable react/no-unescaped-entities */
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
// import { Cross2Icon } from '@radix-ui/react-icons';

const DeleteModal = ({
  children,
  handleDelete,
  type,
}: {
  children: ReactNode;
  handleDelete: () => void;
  type: "Habit" | "Entry";
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-zinc-800/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-800 p-4 shadow-xl focus:outline-none">
          <Dialog.Title className="m-0 text-xl font-medium text-zinc-100">
            Are you sure you want to delete this {type}?
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-sm leading-normal text-zinc-300">
            This action cannot be undone.
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                className="inline-flex h-[35px] items-center justify-center rounded-lg bg-red-500/40 px-3 py-2 leading-none text-zinc-200 shadow-lg focus:outline-none hover:bg-red-500/60"
                onClick={() => handleDelete()}
              >
                Yes, Delete
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button
                className="inline-flex h-[35px] items-center justify-center rounded-lg bg-zinc-700/60 px-3 py-2 leading-none text-zinc-200 shadow-lg focus:outline-none hover:bg-zinc-700/80"
                aria-label="Close"
              >
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteModal;
