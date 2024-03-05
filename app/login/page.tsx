"use client";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <button
        onClick={() => {
          window.location.href = `https://www.figma.com/oauth?client_id=${process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SERVER_URL}/auth&scope=files:read&state=abc&response_type=code`;
        }}
      >
        Sign in
      </button>
    </div>
  );
}
