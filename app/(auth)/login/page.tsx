import styles from "../Auth.module.css";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>
      <LoginForm formStyles={styles} />
      <p>
        Need to create an account? <Link href="/register">Register</Link>{" "}
      </p>
    </div>
  );
}
