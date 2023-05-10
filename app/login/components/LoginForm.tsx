"use client";

import { useState, ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login");
    signIn("credentials", {
      email,
      password,
      callbackUrl,
    });
    // try {
    //   const res = await fetch("/api/register", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (res.ok) {
    //     console.log("okay");
    //     //   signIn();
    //   } else {
    //     const resp = await res.json();
    //     console.log(resp);
    //     setError(resp.error);
    //   }
    // } catch (error: any) {
    //   console.log(error);
    //   setError(error?.message);
    // }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          id="email"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          required
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          id="password"
          type="password"
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}
