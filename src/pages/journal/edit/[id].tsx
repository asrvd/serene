/* eslint-disable @typescript-eslint/no-floating-promises */
import { z } from "zod";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const inputSchema = z.object({
  title: z.string().min(1).max(50),
  text: z.string().min(1),
});

const JournalCreatePage: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { id } = router.query;

  // if (!router.isReady) {
  //   return <div className="bg-zinc-900 text-zinc-200">Loading...</div>;
  // }

  const ctx = api.useContext();
  const entry = api.journal.getJournalEntry.useQuery({
    id: id as string,
  });

  useEffect(() => {
    if (entry.data) {
      setTitle(entry.data.title);
      setText(entry.data.text);
    }
  }, [entry.data]);

  const editEntry = api.journal.editJournalEntry.useMutation({
    onMutate: () => {
      ctx.journal.getJournalEntries.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      router.push(`/journal/${id as string}`);
    },
  });

  const handleEditEntry = () => {
    const input = inputSchema.safeParse({
      title,
      text,
    });

    if (!input.success) {
      console.error(input.error);
      return;
    }

    const toastId = toast.loading("Editing entry...");

    try {
      editEntry.mutate({
        id: id as string,
        title: input.data.title,
        text: input.data.text,
      });
      toast.success("Entry edited!", { id: toastId });
      // router.push("/journal");
    } catch (error) {
      console.error(error);
      toast.error("Error editing entry!", { id: toastId });
    }
  };

  return (
    <Layout>
      <div className="my-14 flex w-full flex-col items-center justify-start gap-4 lg:w-[95%] lg:px-14">
        <section className="flex min-h-[20%] w-full items-center justify-between rounded-lg bg-zinc-800/40 p-4">
          <h2 className="text-2xl font-black text-zinc-100">
            Edit Journal Entry
          </h2>
          <button
            className="h-[10%] self-start rounded-lg bg-zinc-700/40 px-3 py-2 text-zinc-100 hover:bg-zinc-700/60"
            onClick={handleEditEntry}
          >
            Edit Entry
          </button>
        </section>
        {entry.data && (
          <section className="flex min-h-[80%] w-full flex-col items-center justify-center divide-y-2 divide-zinc-500 rounded-lg bg-zinc-800/40">
            <input
              className="my-4 min-h-[10%] w-full bg-transparent px-4 text-2xl font-black text-zinc-100 focus:outline-none"
              type="text"
              placeholder="Title"
              defaultValue={entry.data.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="max-h-[520px] min-h-[400px] w-full bg-transparent p-4 text-base text-zinc-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-lg  focus:outline-none"
              placeholder="Text"
              defaultValue={entry.data.text}
              onChange={(e) => setText(e.target.value)}
            />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default JournalCreatePage;
