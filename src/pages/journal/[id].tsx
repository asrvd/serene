import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

const JournalEntryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return <div className="bg-zinc-900 text-zinc-200">Loading...</div>;

  const entry = api.journal.getJournalEntry.useQuery({
    id: id as string,
  });

  return (
    <Layout>
      <div className="my-14 flex h-full w-[95%] flex-col items-center justify-start lg:px-16">
        <div className="flex h-full w-full flex-col justify-start gap-6">
          <h2 className="text-[4rem] font-black text-zinc-100 lg:text-[5rem] leading-none">
            {entry.data?.title}
          </h2>
          <p className="whitespace-pre-line text-sm text-zinc-300">
            {entry.data?.text}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default JournalEntryPage;


