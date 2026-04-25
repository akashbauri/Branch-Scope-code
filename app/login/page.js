"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider(); // ✅ FIXED
      await signInWithPopup(auth, provider);

      router.push("/");
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center w-[320px]">
        
        <h1 className="text-2xl font-bold mb-2">
          🚀 BranchScope
        </h1>

        <p className="text-gray-400 mb-6">
          AI Career Advisor
        </p>

        <button
          onClick={login}
          disabled={loading}
          className="bg-blue-600 w-full py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

      </div>
    </div>
  );
}
