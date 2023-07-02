import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SearchInput.module.css";

import searchIcon from "@/icons/search.svg";
import { useDashboard } from "@/store/DashboardContext";

export default function SearchInput() {
  const { searchStudentsHandler } = useDashboard();
  const [search, setSearch] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (search.trim().length < 2) return;
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await searchStudentsHandler(event);
    if (response.status === 500) {
      setMessage("Kullanıcı bulunamadı");
    }
  };
  return (
    <>
      <div className={styles.inputContainer}>
        <input
          onChange={(event) => onChangeHandler(event)}
          placeholder="Search..."
          value={search}
          type="text"
          className={styles.input}
        />
        <img src={searchIcon.src} alt="search students" />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
}
