/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { api } from "@/utils/api";
import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const JournalPage: NextPage = () => {
  const allEntries = api.journal.getJournalEntries.useQuery();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Layout>
      {session?.user && (
        <div className="max-h-auto my-14 flex min-h-screen w-[100%] animate-fade-in flex-col items-center justify-center gap-14 leading-none lg:my-0 lg:w-[95%]">
          <div className="w-full flex justify-between items-center lg:px-16">
            <h2 className="font-serif leading-none text-[4rem] font-bold tracking-tight text-zinc-50 lg:text-[6rem]">
              Your Journal
            </h2>
            <button
              className="rounded-lg max-w-max self-end text-zinc-800 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 shadow-xl"
              onClick={() => router.push("/journal/create")}
            >
              Create New
            </button>
          </div>
          <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-16 gap-6">
            {allEntries.data?.map((entry) => (
              <a
                key={entry.id}
                className="flex h-full w-full flex-col justify-between gap-6 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/60 duration-200 p-4 text-left shadow-xl"
                href={`/journal/${entry.id}`}
              >
                <h2 className="text-2xl font-black text-zinc-100">
                  {entry.title}
                </h2>
                <p className="text-sm text-zinc-300">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default JournalPage;
