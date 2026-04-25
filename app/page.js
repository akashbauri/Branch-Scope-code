"use client";

import { useState } from "react";
import ProgramSelector from "./components/ProgramSelector";
import AIChatPanel from "./components/AIChatPanel";
import CareerAnalysisCard from "./components/CareerAnalysisCard";

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
    } catch (err) {
      setChat([
        ...updated,
        { role: "ai", text: "⚠️ Error. Try again." },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* Sidebar */}
      <ProgramSelector program={program} setProgram={setProgram} />

      {/* Main */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          BranchScope AI 🚀
        </h1>

        <div className="grid md:grid-cols-2 gap-6 h-[80vh]">

          {/* Chat */}
          <AIChatPanel
            chat={chat}
            question={question}
            setQuestion={setQuestion}
            ask={ask}
            loading={loading}
          />

          {/* Result */}
          <CareerAnalysisCard result={result} />

        </div>
      </div>
    </div>
  );
}
