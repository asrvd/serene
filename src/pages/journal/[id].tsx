/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";

const JournalEntryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // if (!router.isReady)
  //   return <div className="bg-zinc-900 text-zinc-200">Loading...</div>;

  const ctx = api.useContext();

  const entry = api.journal.getJournalEntry.useQuery({
    id: id as string,
  });

  const deleteEntry = api.journal.deleteJournalEntry.useMutation({
    onMutate: () => {
      ctx.journal.getJournalEntries.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      router.push("/journal");
    },
  });

  const handleEntryDelete = () => {
    const toastId = toast.loading("Deleting entry...");
    try {
      deleteEntry.mutate({
        id: id as string,
      });
      toast.success("Entry deleted!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete entry.", { id: toastId });
    }
  };

  return (
    <Layout>
      <div className="my-14 flex h-full w-[95%] flex-col items-center justify-start lg:px-16">
        <div className="flex h-full w-full flex-col justify-start gap-6">
          <h2 className="text-[4rem] font-black leading-none text-zinc-100 lg:text-[5rem]">
            {entry.data?.title}
          </h2>
          <p className="whitespace-pre-line text-sm text-zinc-300">
            {entry.data?.text}
          </p>
        </div>
        <div className="mt-10 flex w-full justify-start gap-4">
          <DeleteModal handleDelete={handleEntryDelete} type="Entry">
            <button className="mt-4 rounded-lg bg-zinc-800/60 px-4 py-2 text-zinc-300 hover:bg-zinc-800/80">
              Delete Entry
            </button>
          </DeleteModal>
          <button
            className="mt-4 rounded-lg bg-zinc-800/60 px-4 py-2 text-zinc-300 hover:bg-zinc-800/80"
            onClick={() => router.push(`/journal/edit/${id as string}`)}
          >
            Edit Entry
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default JournalEntryPage;
