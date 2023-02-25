/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from "zod";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useState } from "react";
import Layout from "@/components/layout";

const inputSchema = z.object({
  text: z.string(),
});

const Vent: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const openai = api.openai.reply.useMutation({
    onMutate: (text) => {
      setInput(text.prompt);
    },
    onError: (err, text, context) => {
      console.error(err);
    },
    onSuccess: (data, text, context) => {
      setOutput(data?.choices[0]?.text || "");
    },
  });

  const handleSubmit = () => {
    const result = inputSchema.safeParse({
      text: input,
    });
    if (!result.success) {
      console.error(result.error);
      return;
    }
    openai.mutate({
      prompt: result.data.text,
    });

    console.log(output);
  };

  return (
    <Layout>
      <div className="my-14 w-[95%] flex flex-col items-center justify-start gap-6 lg:flex-row lg:px-14">
        <div className="w-full self-start lg:w-1/2">
          <textarea
            className="h-96 w-full rounded-lg bg-zinc-800/60 p-4 text-white focus:outline-none"
            placeholder="Just let it all out..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="h-12 w-full rounded-lg text-center flex justify-center items-center bg-zinc-800/60 hover:bg-zinc-800/80 p-4 text-white"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
        {output !== "" && (
          <div className="h-[27rem] w-full rounded-lg bg-zinc-800/60 p-4 text-white lg:w-1/2">
            {output}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Vent;
