import styles from "../Auth.module.css";
import Link from "next/link";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className={styles.formContainer}>
      <h1>Create your Account</h1>
      <RegisterForm formStyles={styles} />
      <p>
        Have an account? <Link href="/login">Sign in</Link>{" "}
      </p>
    </div>
  );
}
