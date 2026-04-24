"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import ResultCard from "./components/ResultCard";

export default function Home() {
  const [program, setProgram] = useState("cse");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    const updated = [...chat, { role: "user", text: question }];
    setChat(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ program, question }),
      });

      const data = await res.json();

      setChat([
        ...updated,
        {
          role: "ai",
          text: data?.data?.suggestion || "No response",
        },
      ]);

      setResult(data.data);
    } catch (error) {
      setChat([
        ...updated,
        { role: "ai", text: "⚠️ Error. Try again." },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="flex bg-black text-white min-h-screen">

      {/* Sidebar */}
      <Sidebar program={program} setProgram={setProgram} />

      {/* Main */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-4">
          BranchScope AI 🚀
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh]">

          {/* Chat */}
          <ChatBox
            chat={chat}
            question={question}
            setQuestion={setQuestion}
            ask={ask}
            loading={loading}
          />

          {/* Result */}
          <ResultCard result={result} />

        </div>
      </div>
    </div>
  );
}
