/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { HomeIcon } from "./icons/HomeIcon";
import { VentIcon } from "./icons/VentIcon";
import { TrackerIcon } from "./icons/TrackerIcon";
import { JournalIcon } from "./icons/JournalIcon";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BackIcon } from "./icons/BackIcon";
import { MenuIcon } from "./icons/MenuIcon";
import ToolTip from "./ToolTip";
import ProfilePopover from "./ProfilePopover";
import { CloseIcon } from "./icons/CrossIcon";
import clsx from "clsx";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

type NavItem = {
  name: string;
  href: string;
  icon: ReactElement;
};

type NavItems = NavItem[];

const navItems: NavItems = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon({}),
  },
  {
    name: "Habit Tracker",
    href: "/habits",
    icon: TrackerIcon({}),
  },
  {
    name: "Journal",
    href: "/journal",
    icon: JournalIcon({}),
  },
  {
    name: "Vent",
    href: "/vent",
    icon: VentIcon({}),
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const current = router.pathname;
  const { data: session } = useSession();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Serene</title>
        <link rel="icon" href="https://fmj.asrvd.me/🌸" />
      </Head>
      <div
        className="min-w-screen flex min-h-screen flex-col items-center justify-center p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 scrollbar-thumb-rounded-lg"
        style={{
          backgroundColor: !session?.user ? "#99faff" : "#18181b",
          backgroundImage: !session?.user
            ? `radial-gradient(at 3% 42%, rgb(228, 105, 236) 0px, transparent 50%), radial-gradient(at 88% 60%, rgb(106, 220, 213) 0px, transparent 50%), radial-gradient(at 90% 0%, rgb(150, 171, 248) 0px, transparent 50%), radial-gradient(at 86% 90%, rgb(254, 114, 228) 0px, transparent 50%), radial-gradient(at 51% 93%, rgb(224, 144, 97) 0px, transparent 50%), radial-gradient(at 77% 35%, rgb(143, 239, 212) 0px, transparent 50%), radial-gradient(at 64% 29%, rgb(185, 246, 116) 0px, transparent 50%)`
            : undefined,
        }}
      >
        <div className="relative flex h-full min-h-screen w-full min-w-full items-center justify-center font-sans">
          {session?.user && (
            <div className="fixed left-5 hidden w-[5%] flex-col items-center justify-evenly gap-10 rounded-lg bg-zinc-800/40 p-3 shadow-xl lg:flex">
              {navItems.map((item) => (
                <ToolTip key={item.name} name={item.name} position="right">
                  <button
                    className={clsx(
                      "items-center rounded-full bg-zinc-700/40 p-3 text-lg text-gray-100 shadow-lg duration-200 hover:bg-zinc-700/80",
                      {
                        "bg-zinc-700/80": current === item.href,
                      }
                    )}
                    //   onClick={() => router.push(item.href)}
                    onClick={() => router.push(item.href)}
                  >
                    {item.icon}
                    {/* <p className="text-white">{item.name}</p> */}
                  </button>
                </ToolTip>
              ))}
              <ToolTip key="back" name="Go Back" position="right">
                <button
                  className="items-center rounded-full bg-zinc-700/40 p-3 text-lg text-gray-100 shadow-lg hover:bg-zinc-700/60"
                  //   onClick={() => router.push(item.href)}
                  onClick={() => router.back()}
                >
                  <BackIcon />
                  {/* <p className="text-white">{item.name}</p> */}
                </button>
              </ToolTip>
              <ProfilePopover
                avatar={session?.user?.image as string}
                name={session?.user?.name as string}
              />
            </div>
          )}
          {session?.user && (
            <>
              <button
                className="absolute top-1 left-1 block rounded-full bg-zinc-800 p-2 text-xl text-zinc-100 shadow-xl lg:hidden"
                onClick={() => setVisible(!visible)}
              >
                <MenuIcon />
              </button>
              {visible && (
                <section className="fixed top-0 left-0 flex h-full w-2/3 animate-slideLeftAndFade flex-col items-start justify-start gap-4 rounded-tr-lg rounded-br-lg bg-zinc-900/95 p-4 py-10 text-xl text-zinc-100 shadow-2xl md:w-1/3">
                  <ProfilePopover
                    avatar={session?.user?.image as string}
                    name={session?.user?.name as string}
                  />
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      className="w-full items-center rounded-lg bg-zinc-800/40 p-3 text-lg text-gray-100 shadow-lg hover:bg-zinc-800/60"
                      //   onClick={() => router.push(item.href)}
                      href={item.href}
                    >
                      {item.name}
                      {/* <p className="text-white">{item.name}</p> */}
                    </a>
                  ))}
                  <button
                    className="absolute top-10 right-5 block rounded-full bg-zinc-800 p-2 text-xl text-zinc-100 shadow-xl lg:hidden"
                    onClick={() => setVisible(!visible)}
                  >
                    <CloseIcon />
                  </button>
                </section>
              )}
            </>
          )}
          {/* <button
          className="flex items-center justify-center rounded-full p-2 text-base shadow-lg"
          onClick={() => signOut()}
        >
          Sign Out
        </button> */}
          {children}
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#27272a",
            color: "#f4f4f5",
          },
        }}
      />
    </>
  );
}
