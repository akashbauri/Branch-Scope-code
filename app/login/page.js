"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const login = async () => {
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <button
        onClick={login}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
