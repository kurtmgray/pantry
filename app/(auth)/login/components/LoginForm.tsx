"use client";

import { useState, ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Alert from "../../components/Alert";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        //res.error is "CredentialsSignin", not helpful
        setError("Invalid email or password.");
      }
    } catch (err) {}

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
      {error && <Alert error={error} />}
    </form>
  );
}
