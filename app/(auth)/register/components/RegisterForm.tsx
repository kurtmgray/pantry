"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

type FormComponentProps = {
  formStyles: { [key: string]: string };
};

export const RegisterForm = ({ formStyles }: FormComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        signIn();
      } else {
        const resp = await res.json();
        setError(resp.error);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    }
  };

  return (
    <form className={formStyles.form} onSubmit={onSubmit}>
      <div className={formStyles.group}>
        <label className={formStyles.label} htmlFor="name">
          Name
        </label>
        <input
          className={formStyles.input}
          required
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          id="name"
        />
      </div>
      <div className={formStyles.group}>
        <label className={formStyles.label} htmlFor="email">
          Email
        </label>
        <input
          className={formStyles.input}
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          id="email"
          type="email"
        />
      </div>

      <div className={formStyles.group}>
        <label className={formStyles.label} htmlFor="password">
          Password
        </label>
        <input
          className={formStyles.input}
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
        <button className={formStyles.button} type="submit">
          Register
        </button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};
