import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

async function searchWeb(query) {
  try {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query }),
    });

    const data = await res.json();

    return data.organic
      ?.slice(0, 3)
      .map((r) => r.snippet)
      .join("\n") || "";
  } catch {
    return "";
  }
}

export async function POST(req) {
  try {
    const { program, question } = await req.json();

    const db = await getDB();

    const timeline = await db.all(
      "SELECT * FROM timeline_entries WHERE program_id = ?",
      [program]
    );

    const outcome = await db.get(
      "SELECT * FROM outcomes WHERE program_id = ?",
      [program]
    );

    let context = "";
    let found = false;
    let totalDifficulty = 0;

    timeline.forEach((row) => {
      context += `Sem ${row.semester}: ${row.title}, difficulty ${row.difficulty}. `;
      totalDifficulty += row.difficulty;

      if (question.toLowerCase().includes(row.title.toLowerCase())) {
        found = true;
      }
    });

    const avgDifficulty = totalDifficulty / timeline.length;
    const risk = avgDifficulty / 10;

    const avgSalary =
      (outcome.avg_salary_min + outcome.avg_salary_max) / 2;

    const cost = 500000;
    const roi = ((avgSalary * 5) - cost) / cost;

    let webData = "";
    if (!found) {
      webData = await searchWeb(question);
    }

    const aiRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are a career advisor. Use DB first, web if needed.",
            },
            {
              role: "user",
              content: `
Program: ${program}

Database:
${context}

Web:
${webData}

Question:
${question}

Answer shortly and honestly.
`,
            },
          ],
        }),
      }
    );

    const data = await aiRes.json();
    const text = data.choices?.[0]?.message?.content || "";

    const score = Number((roi * 0.5 + (1 - risk) * 0.5).toFixed(2));

    return NextResponse.json({
      success: true,
      data: {
        score,
        risk: Number(risk.toFixed(2)),
        roi: Number(roi.toFixed(2)),
        suggestion: text,
        source: found ? "database" : "web+ai",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
