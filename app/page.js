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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program, question }),
      });

      const data = await res.json();

      setChat([
        ...updated,
        { role: "ai", text: data?.data?.suggestion || "No response" },
      ]);

      setResult(data.data);
    } catch {
      setChat([...updated, { role: "ai", text: "Error..." }]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar program={program} setProgram={setProgram} />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">BranchScope 🚀</h1>

        <div className="grid md:grid-cols-2 gap-4 h-[80vh]">
          <ChatBox
            chat={chat}
            question={question}
            setQuestion={setQuestion}
            ask={ask}
            loading={loading}
          />
          <ResultCard result={result} />
        </div>
      </div>
    </div>
  );
}
