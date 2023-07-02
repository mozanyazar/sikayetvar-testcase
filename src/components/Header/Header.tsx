import React from "react";
import styles from "./Header.module.css";
import { useAuth } from "@/store/AuthContext";

export default function Header() {
  const { isLoggedIn, logoutHandler } = useAuth();
  return (
    <header className={styles.container}>
      <div className={styles.headerInner}>
        <a className={styles.logo} href="/">
          <h1>Manage Courses</h1>
        </a>

        <nav className={styles.nav}>
          <li>
            {!isLoggedIn ? (
              <a href="/login">login</a>
            ) : (
              <div>
                <a href="/dashboard">Dashboard</a> <button onClick={() => logoutHandler()}>logout</button>
              </div>
            )}
          </li>
        </nav>
      </div>
    </header>
  );
}
