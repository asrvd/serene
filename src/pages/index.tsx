/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Layout from "@/components/layout";
import { JournalIcon } from "@/components/icons/JournalIcon";
import { VentIcon } from "@/components/icons/VentIcon";
import { TrackerIcon } from "@/components/icons/TrackerIcon";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Layout>
      {!session?.user && (
        <div className="animate-fade-in text-center leading-none max-h-screen">
          <h2 className="font-serif text-[4rem] font-bold tracking-tight text-zinc-50 lg:text-[6rem]">
            Serene
          </h2>
          <p className="mt-1 text-xl text-zinc-100">
            Reflect, Track, and Let It Out: Your Mental Health Companion
          </p>
          <button
            className="mt-4 rounded-lg border border-transparent bg-zinc-100 px-4 py-3 text-zinc-900 duration-200 hover:border-zinc-100 hover:bg-transparent hover:text-zinc-100"
            onClick={() => signIn("google")}
          >
            Get Started
          </button>
        </div>
      )}
      {session?.user && (
        <div className="max-h-auto my-14 flex h-full w-[100%] animate-fade-in flex-col items-center justify-center gap-14 text-center leading-none lg:my-0 lg:w-[95%]">
          <section className="">
            <h2 className="font-serif text-[4rem] font-bold tracking-tight text-zinc-50 lg:text-[6rem]">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                {session.user.name?.split(" ")[0]}
              </span>
            </h2>
            <p className="mt-1 text-xl text-zinc-100">
              What would you like to do today?
            </p>
          </section>
          <section className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-1 lg:w-4/5 lg:grid-cols-3">
            <div
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg bg-zinc-800/40 p-4 shadow-xl duration-200 hover:bg-zinc-800/60 hover:shadow-2xl"
              onClick={() => router.push("/habits")}
            >
              <h2 className="text-2xl font-bold text-zinc-100">
                Track your habits
              </h2>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/95 p-4 text-[4rem] text-zinc-200 shadow-xl ">
                <TrackerIcon />
              </div>
              <p className="text-zinc-300">
                Track your planned habbits & create new habits to track!
              </p>
            </div>
            <div
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg bg-zinc-800/40 p-4 shadow-xl duration-200 hover:bg-zinc-800/60 hover:shadow-2xl"
              onClick={() => router.push("/journal")}
            >
              <h2 className="text-2xl font-bold text-zinc-100">
                Write a journal entry
              </h2>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/95 p-4 text-[4rem] text-zinc-200 shadow-xl">
                <JournalIcon />
              </div>
              <p className="text-zinc-300">
                Write down a new journal entry in your very own personal
                journal!
              </p>
            </div>
            <div
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg bg-zinc-800/40 p-4 shadow-xl duration-200 hover:bg-zinc-800/60 hover:shadow-2xl"
              onClick={() => router.push("/vent")}
            >
              <h2 className="text-2xl font-bold text-zinc-100">
                Vent out your feelings
              </h2>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/95 p-4 text-[4rem] text-zinc-200 shadow-xl">
                <VentIcon />
              </div>
              <p className="text-zinc-300">
                Vent out your feelings privately to AI and get emotional support
                and counselling!
              </p>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default Home;
