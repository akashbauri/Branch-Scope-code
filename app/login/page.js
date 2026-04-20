"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h1 className="mb-4">Login</h1>
        <button onClick={login} className="bg-blue-600 px-4 py-2 rounded">
          Login with Google
        </button>
      </div>
    </div>
  );
}
