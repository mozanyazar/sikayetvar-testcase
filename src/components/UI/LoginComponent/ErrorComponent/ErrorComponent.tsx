import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "@/pages/login/Login.module.css";
interface ErrorProps {
  setError: Dispatch<SetStateAction<string>>;
  error: string;
  password: string;
  username: string;
}

export default function ErrorComponent({ error, setError, password, username }: ErrorProps) {
  // boşalan inputlar tekrardan doldurulur ise error'u boş string'e atama işlemi
  useEffect(() => {
    if (error && password && username) {
      setError("");
    }
  }, [password, username]);

  return (
    <div className={`${styles.error} ${error && !username && !password ? `${styles.active} ` : null} `}>
      {" "}
      <p>{error}</p>
      <button
        onClick={() => {
          setError("");
        }}
      >
        x
      </button>
    </div>
  );
}
