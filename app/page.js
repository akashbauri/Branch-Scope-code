"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import ProgramSelector from "./components/ProgramSelector";
import AIChatPanel from "./components/AIChatPanel";
import CareerAnalysisCard from "./components/CareerAnalysisCard";

export default function Home() {
  const [program, setProgram] = useState("cse");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [result, setResult] = useState(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
  }, []);

  const ask = async () => {
    if (!question) return;

    const updated = [...chat, { role: "user", text: question }];
    setChat(updated);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ program, question }),
    });

    const data = await res.json();

    setChat([...updated, { role: "ai", text: data.data.suggestion }]);
    setResult(data.data);
    setQuestion("");
  };

  return (
    <div className="flex bg-black text-white min-h-screen">

      <ProgramSelector program={program} setProgram={setProgram} />

      <div className="flex-1 p-6 grid grid-cols-2 gap-4">
        <AIChatPanel
          chat={chat}
          question={question}
          setQuestion={setQuestion}
          ask={ask}
        />

        <CareerAnalysisCard result={result} />
      </div>
    </div>
  );
}
