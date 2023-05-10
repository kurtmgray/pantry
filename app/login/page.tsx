import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Need to create an account? <Link href="/register">Sign in</Link>{" "}
      </p>
    </div>
  );
}
