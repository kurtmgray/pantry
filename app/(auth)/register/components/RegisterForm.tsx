"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hello");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("okay");
        signIn();
      } else {
        const resp = await res.json();
        console.log(resp);
        setError(resp.error);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            id="name"
          />
        </div>
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
        <button type="submit">Register</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};
