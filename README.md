# 🚀 BranchScope

## 📌 Overview

**BranchScope** is an AI-powered career simulation platform that helps students make **data-driven career decisions** before choosing a stream.

Instead of generic advice, it shows:

* 📚 What you will study (semester-wise subjects)
* ⚠️ Real difficulty and challenges
* 💰 Career outcomes (salary, roles)
* 🧠 AI-powered recommendations

---

## 💡 Core Idea

> “Students don’t regret hard work — they regret choosing the wrong path.”

BranchScope reduces this risk by combining **data + AI + real-world insights**.

---

## 🧠 Key Features

### 🤖 AI Career Advisor

* Ask questions like:

  * *“Is CSE hard?”*
  * *“Should I choose Mechanical?”*
* Powered by **Groq (LLaMA 3)**

---

### 📊 Simulation Engine

Returns:

* **Score** 📊
* **Risk** ⚠️
* **ROI** 💰
* **Suggestion** 🧠

---

### 🔄 Hybrid AI System (ODS-lite)

```
Database → Web Search → AI → Decision Output
```

* Uses database first
* Falls back to web search (Serper API)
* AI generates final recommendation

---

### 📚 Subject-Based Learning Model

* Semester-wise structure
* Subject difficulty tracking
* Real academic flow

---

### 🔐 Authentication

* Firebase Google Login

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS

### Backend

* Next.js API Routes (Serverless)

### Database

* SQLite

### AI

* Groq API (LLaMA 3)

### Web Search

* Serper API

### Auth

* Firebase Authentication

---

## 📁 Project Structure

```
branchscope/
│
├── app/
│   ├── page.js
│   ├── login/page.js
│   ├── api/
│   │     └── ask/route.js
│   └── components/
│         ├── Sidebar.js
│         ├── ChatBox.js
│         └── ResultCard.js
│
├── lib/
│   ├── db.js
│   └── firebase.js
│
├── database.db
├── .env.local
├── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/branchscope.git
cd branchscope
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Environment Variables

Create `.env.local`

```
GROQ_API_KEY=your_groq_key
SERPER_API_KEY=your_serper_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

---

### 4️⃣ Run Project

```
npm run dev
```

---

### 5️⃣ Deploy

* Deploy on **Vercel**

---

## 🔄 System Workflow

```
User Login (Firebase)
       ↓
Select Program (CSE / ME / Civil)
       ↓
Ask Question
       ↓
Backend:
   → Fetch DB data
   → If missing → Web search
   → Send to Groq AI
       ↓
Return:
   Score + Risk + ROI + Suggestion
```

---

## 🧠 API Example

### POST `/api/ask`

#### Request

```
{
  "program": "cse",
  "question": "Is Data Structures hard?"
}
```

#### Response

```
{
  "score": 0.72,
  "risk": 0.4,
  "roi": 1.2,
  "suggestion": "CSE is rewarding but competitive...",
  "source": "database"
}
```

---

## 📊 Logic Used

### ROI

```
ROI = (avg_salary * 5 - cost) / cost
```

### Risk

```
Risk = avg_difficulty / 10
```

### Score

```
Score = (ROI * 0.5) + ((1 - Risk) * 0.5)
```

---

## 🔐 Security Notes

* `.env.local` is ignored in Git
* API keys are server-side
* Firebase handles authentication securely

---

## ❗ Limitations (MVP)

* No charts/visual analytics
* No user history
* Basic ROI model (no loans/debt)
* No citation links
* Limited subject-level intelligence

---

## 🔮 Future Improvements

* 📊 Analytics dashboard
* 🤖 Advanced AI agent
* 💳 Payment system (B2B SaaS)
* 🌍 India vs USA comparison
* 📈 Salary prediction
* 🧠 Personalized recommendations

---

## 🏢 Business Model

BranchScope is designed as a **B2B SaaS** for:

* Schools
* Coaching Institutes
* Universities
* EdTech platforms

---

## 🔥 Differentiation

| Feature     | Others | BranchScope |
| ----------- | ------ | ----------- |
| Information | ✅      | ✅           |
| Simulation  | ❌      | ✅           |
| ROI         | ❌      | ✅           |
| AI Decision | ❌      | ✅           |

---

## 👨‍💻 Author

**Akash Bauri**
Founder – Appna Bank
Co-founder – Entrex

---

## ⭐ Final Note

This is not just a project —
it’s a **career decision intelligence system**.

---
