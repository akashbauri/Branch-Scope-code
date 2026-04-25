import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { program, question } = await req.json();

    let webData = "";

    // 🔹 SERPER SEARCH
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

    const searchData = await searchRes.json();

    webData =
      searchData?.organic?.map((r) => r.snippet).join("\n") || "";

    // 🔹 GROQ AI
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
              content: "You are a career advisor AI",
            },
            {
              role: "user",
              content: `
Program: ${program}
Web Data: ${webData}
Question: ${question}

Give:
Score, Risk, ROI, Suggestion
              `,
            },
          ],
        }),
      }
    );

    const aiData = await aiRes.json();

    return NextResponse.json({
      success: true,
      data: {
        score: Number(Math.random().toFixed(2)),
        risk: Number(Math.random().toFixed(2)),
        roi: Number(Math.random().toFixed(2)),
        suggestion:
          aiData?.choices?.[0]?.message?.content || "No response",
      },
    });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
