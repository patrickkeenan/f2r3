"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [personalToken, setPersonalToken] = useState("");
  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <button
              style={{
                backgroundColor: "#4a90e2",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                const authUrl = `https://www.figma.com/oauth?client_id=${process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SERVER_URL}/auth&scope=files:read&state=abc&response_type=code`;
                router.push(authUrl);
              }}
            >
              Sign in with Figma
            </button>
          </div>

          <p>OR</p>

          <div>
            <input
              type="text"
              placeholder="personal token"
              value={personalToken}
              onChange={(event: any) => setPersonalToken(event.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                width: "300px",
                outline: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                router.push("/auth?personalToken=" + personalToken);
              }}
              style={{
                backgroundColor: "#4a90e2",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login with token
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
