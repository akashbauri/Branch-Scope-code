import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// 🔹 Firebase Init
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 MAIN API
export async function POST(req) {
  try {
    const { program, question } = await req.json();

    // =========================
    // STEP 1: FETCH TIMELINE
    // =========================
    const timelineQuery = query(
      collection(db, "timeline_entries"),
      where("program_id", "==", program)
    );

    const timelineSnap = await getDocs(timelineQuery);

    let totalDifficulty = 0;
    let subjects = [];

    timelineSnap.forEach((doc) => {
      const d = doc.data();
      totalDifficulty += Number(d.difficulty) || 5;
      subjects.push(d.title || "Unknown");
    });

    const avgDifficulty = totalDifficulty / (subjects.length || 1);
    const risk = avgDifficulty / 10;

    // =========================
    // STEP 2: OUTCOMES
    // =========================
    const outcomeQuery = query(
      collection(db, "outcomes"),
      where("program_id", "==", program)
    );

    const outcomeSnap = await getDocs(outcomeQuery);

    let avgSalary = 500000;

    outcomeSnap.forEach((doc) => {
      const d = doc.data();
      avgSalary =
        (Number(d.min_salary || 0) + Number(d.max_salary || 0)) / 2 || avgSalary;
    });

    const cost = 500000;
    const roi = ((avgSalary * 5) - cost) / cost;

    // =========================
    // STEP 3: GROQ AI
    // =========================
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
              content: "You are a smart career advisor AI.",
            },
            {
              role: "user",
              content: `
Program: ${program}
Subjects: ${subjects.join(", ")}
Difficulty: ${avgDifficulty.toFixed(2)}
Question: ${question}

Give practical, honest, and short advice.
              `,
            },
          ],
        }),
      }
    );

    const aiData = await aiRes.json();

    const suggestion =
      aiData?.choices?.[0]?.message?.content ||
      "No AI response available.";

    // =========================
    // FINAL RESPONSE
    // =========================
    return NextResponse.json({
      success: true,
      data: {
        score: Number((roi * 0.5 + (1 - risk) * 0.5).toFixed(2)),
        risk: Number(risk.toFixed(2)),
        roi: Number(roi.toFixed(2)),
        suggestion,
      },
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
