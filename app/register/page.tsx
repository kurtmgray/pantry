import Link from "next/link";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <div>
        <h1>Create your Account</h1>
        <RegisterForm />
        <p>
          Have an account? <Link href="/login">Sign in</Link>{" "}
        </p>
      </div>
    </div>
  );
}
