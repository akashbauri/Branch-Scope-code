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
          "Content-Type": "application/json", // ✅ FIXED
        },
        body: JSON.stringify({ program, question }),
      });

      const data = await res.json();

      if (!data?.data) {
        throw new Error("Invalid response from server");
      }

      setChat([
        ...updated,
        { role: "ai", text: data.data.suggestion || "No response" },
      ]);

      setResult(data.data);
    } catch (error) {
      console.error(error);

      setChat([
        ...updated,
        { role: "ai", text: "⚠️ Something went wrong. Try again." },
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

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-4">
          AI Career Simulation 🚀
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh]">

          {/* Chat Section */}
          <div className="flex flex-col">
            <ChatBox
              chat={chat}
              question={question}
              setQuestion={setQuestion}
              ask={ask}
              loading={loading}
            />
          </div>

          {/* Result Section */}
          <div>
            <ResultCard result={result} />
          </div>

        </div>
      </div>
    </div>
  );
}
