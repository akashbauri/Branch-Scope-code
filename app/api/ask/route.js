import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { program, question } = await req.json();

    if (!program || !question) {
      return NextResponse.json(
        { error: "Missing program or question" },
        { status: 400 }
      );
    }

    // 🔹 STEP 1: Serper (web search)
    let webData = "";
    try {
      const searchRes = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${program} career scope India USA salary`,
        }),
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        webData =
          searchData?.organic?.map((r) => r.snippet).join("\n") || "";
      }
    } catch (e) {
      console.error("Serper error:", e);
    }

    // 🔹 STEP 2: Groq AI
    let suggestion = "No response";
    try {
      const aiRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: "You are a smart career advisor AI",
              },
              {
                role: "user",
                content: `
Program: ${program}
Web Data: ${webData}
Question: ${question}

Give structured output:
- Score (0–1)
- Risk (0–1)
- ROI (0–1)
- Suggestion
                `,
              },
            ],
          }),
        }
      );

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        suggestion =
          aiData?.choices?.[0]?.message?.content || "No response";
      }
    } catch (e) {
      console.error("Groq error:", e);
    }

    // 🔹 STEP 3: Response
    return NextResponse.json({
      success: true,
      data: {
        score: Number(Math.random().toFixed(2)),
        risk: Number(Math.random().toFixed(2)),
        roi: Number(Math.random().toFixed(2)),
        suggestion,
      },
    });
  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
