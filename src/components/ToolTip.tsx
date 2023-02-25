/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
// import { PlusIcon } from '@radix-ui/react-icons';

const ToolTip = ({
  children,
  // key,
  name,
  position,
}: {
  children: ReactNode;
  // key: string;
  name: string;
  position: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="text-violet11 select-none rounded-lg bg-zinc-800 px-[15px] py-[10px] text-[15px] leading-none text-zinc-200 shadow-xl will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
            sideOffset={5}
            side={position}
          >
            {name}
            <Tooltip.Arrow className="fill-zinc-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ToolTip;
