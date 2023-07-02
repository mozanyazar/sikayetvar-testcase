import React, { ReactNode } from "react";
import styles from "./Login.module.css";
import WithoutHeaderAndFooter from "@/layout/WithoutHeaderAndFooter/WithoutHeaderAndFooter";
import LoginForm from "@/components/UI/LoginComponent/LoginForm/LoginForm";

function Login() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formInner}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>MANAGE COURSES</h1>
          <div className={styles.subtitle}>
            <h2>SIGN IN</h2>
            <p>Enter your credentials to access your account</p>
          </div>
        </div>
        <LoginForm />
        <div className={styles.forgotText}>
          <span>
            {" "}
            Forgot your password? <a href="#">Reset Password</a>
          </span>
        </div>
      </div>
    </div>
  );
}

Login.getLayout = (page: ReactNode) => <WithoutHeaderAndFooter>{page}</WithoutHeaderAndFooter>;
export default Login;
