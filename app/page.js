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

  const ask = async () => {
    const updated = [...chat, { role: "user", text: question }];
    setChat(updated);

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ program, question }),
    });

    const data = await res.json();

    setChat([...updated, { role: "ai", text: data.data.suggestion }]);
    setResult(data.data);
    setQuestion("");
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar program={program} setProgram={setProgram} />

      <div className="flex-1 p-6 grid grid-cols-2 gap-4">
        <ChatBox
          chat={chat}
          question={question}
          setQuestion={setQuestion}
          ask={ask}
        />

        <ResultCard result={result} />
      </div>
    </div>
  );
}
