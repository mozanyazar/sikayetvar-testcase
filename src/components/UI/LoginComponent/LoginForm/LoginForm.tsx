import React, { useEffect, useState } from "react";
import styles from "@/pages/login/Login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/store/AuthContext";
import { login } from "@/services/auth";
import Loading from "../../Loading/Loading";
import HeadComponent from "@/Head/HeadComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

export default function LoginForm() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLoggedIn ? router.push("/") : setLoading(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      return setError("ilgili alanları doldurunuz");
    }

    const userLogin = await login({
      username,
      password,
    });

    // error var ise
    if ("error" in userLogin) {
      setUsername("");
      setPassword("");
      return setError(userLogin.error);
    }

    // yok ise user bilgilerini local storage'a atma işlemi.
    localStorage.setItem("user", JSON.stringify(userLogin));
    router.push("/");
  };

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <HeadComponent title="Login" description="Login and discover our world" />
      <form onSubmit={formHandler} className={styles.form}>
        <ErrorComponent error={error} password={password} setError={setError} username={username} />
        <label htmlFor="username">
          <span>Username</span>
          <input
            placeholder="Enter your username"
            type="text"
            required
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            placeholder="Enter your password"
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={styles.formButton}>
          SIGN IN
        </button>
      </form>
    </>
  );
}
