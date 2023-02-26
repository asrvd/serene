/* eslint-disable react/no-unescaped-entities */
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
          <div className="flex w-full items-center justify-between lg:px-16">
            <h2 className="font-serif text-[4rem] font-bold leading-none tracking-tight text-zinc-50 lg:text-[6rem]">
              Your Journal
            </h2>
            <button
              className="max-w-max self-end rounded-lg bg-zinc-100 px-4 py-2 text-zinc-800 shadow-xl hover:bg-zinc-200"
              onClick={() => router.push("/journal/create")}
            >
              Create New
            </button>
          </div>
          <div className="grid h-full w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:px-16">
            {allEntries.data?.map((entry) => (
              <a
                key={entry.id}
                className="flex h-full w-full flex-col justify-between gap-6 rounded-lg bg-zinc-800/40 p-4 text-left shadow-xl duration-200 hover:bg-zinc-800/60"
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
            {allEntries.data?.length === 0 && (
              <p className="text-zinc-300">
                You haven't created any entries yet!
              </p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default JournalPage;
