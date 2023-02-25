/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CloseIcon } from "./icons/CrossIcon";
import { signOut } from "next-auth/react";
// import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

const ProfilePopover = ({ avatar, name }: { avatar: string; name: string }) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <img
        className="h-[2.5em] w-[2.5em] cursor-pointer rounded-full shadow-lg"
        src={avatar}
        alt="user image"
      />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[150px] rounded-lg bg-zinc-800 p-2 shadow-lg will-change-[transform,opacity] focus:shadow-xl"
        side="right"
        sideOffset={5}
      >
        <div className="flex flex-col gap-1 text-zinc-200">
          <p>{name.split(" ")[0]}</p>
          <button
            className="w-full rounded-lg p-2 mt-2 text-zinc-200 focus:outline-none bg-zinc-700/40 hover:bg-zinc-700/60"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
        <Popover.Close
          className="absolute top-[5px] right-[5px] inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-xs text-zinc-200 shadow-lg focus:outline-none hover:bg-zinc-700/60"
          aria-label="Close"
        >
          <CloseIcon />
        </Popover.Close>
        <Popover.Arrow className="fill-zinc-800" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default ProfilePopover;
