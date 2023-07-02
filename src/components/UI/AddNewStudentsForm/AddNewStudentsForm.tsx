import React, { useReducer, FormEvent, useState, useEffect } from "react";
import styles from "./AddNewStudentsForm.module.css";
import { useDashboard } from "@/store/DashboardContext";
import { ResponseMessage, User, UsersData } from "@/services/types/types";

// State tipi

export interface NewUserDataTypes {
  firstName: string;
  gender: string;
  phone: string;
  email: string;
}

// Eylem tipleri
type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_GENDER"; payload: string }
  | { type: "RESET_FORM" };

// Reducer fonksiyonu
const reducer = (state: NewUserDataTypes, action: Action): NewUserDataTypes => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, firstName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "SET_GENDER":
      return { ...state, gender: action.payload };
    case "RESET_FORM":
      return { firstName: "", email: "", phone: "", gender: "" };
    default:
      return state;
  }
};

export default function AddNewStudentsForm() {
  const { addNewStudentToggle, addNewStudent } = useDashboard();
  const [error, setError] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    email: "",
    phone: "",
    gender: "male",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!state.firstName || !state.email || !state.phone || !state.gender) {
      return setError("Lütfen tüm alanları doldurun");
    }
    const response = await addNewStudent(state);

    if (response.status === 201) dispatch({ type: "RESET_FORM" });
    return setError(response.message!);
  };

  return (
    <div className={styles.container}>
      <div onClick={() => addNewStudentToggle()} className={styles.overlay}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4>Add New Student</h4>
        <button className={styles.close} onClick={() => addNewStudentToggle()}>
          x
        </button>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            value={state.firstName}
            placeholder="Name"
            onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={state.email}
            placeholder="Email"
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
          />
        </label>
        <label htmlFor="phone">
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            pattern="[0-9]*"
            inputMode="numeric"
            value={state.phone}
            onChange={(e) => dispatch({ type: "SET_PHONE", payload: e.target.value })}
          />
        </label>
        <label htmlFor="gender">
          <select
            name="gender"
            value={state.gender}
            onChange={(e) => dispatch({ type: "SET_GENDER", payload: e.target.value })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
