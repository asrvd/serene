/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from "zod";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useState } from "react";

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
    <main className="min-w-screen min-h-sc flex min-h-screen flex-col items-center justify-center bg-zinc-900">
      <div className="flex w-1/3 flex-col items-center justify-center gap-4">
        <textarea
          className="h-96 w-full rounded-lg bg-zinc-800 p-4 text-white"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="h-12 w-full rounded-lg bg-zinc-800 p-4 text-white"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
        {output !== "" && (
          <div className="h-96 w-full rounded-lg bg-zinc-800 p-4 text-white">
            {output}
          </div>
        )}
      </div>
    </main>
  );
};

export default Vent;
