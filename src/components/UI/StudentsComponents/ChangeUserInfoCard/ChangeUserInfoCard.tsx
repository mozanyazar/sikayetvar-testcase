import React, { useEffect, useState } from "react";
import styles from "./ChangeUserInfoCard.module.css";
import Image from "next/image";
import { UserCardProps } from "../UserCard/UserCard";
import { useDashboard } from "@/store/DashboardContext";

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  gender?: string;
  phone?: string;
  id: number;
}

interface ChangeUserInfoCardProps {
  user: UserCardProps;
  setIsUserUpdateFormOpen: (isOpen: boolean) => void;
}

export default function ChangeUserInfoCard({ user, setIsUserUpdateFormOpen }: ChangeUserInfoCardProps) {
  const { updateUserInformation } = useDashboard();

  const [changeName, setChangeName] = useState<string>("");
  const [changeEmail, setChangeEmail] = useState<string>("");
  const [changePhone, setChangePhone] = useState<string>("");
  const [changeGender, setChangeGender] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 1100);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    // bütün inputlar var ise request atma
    if (!changeName && !changeEmail && !changeGender && !changePhone) {
      return setMessage("En az bir değer girmelisiniz");
    }

    const response = await updateUserInformation({
      email: changeEmail,
      firstName: changeName,
      gender: changeGender,
      phone: changePhone,
      id: user.id,
    });

    if (response.status !== 200) return setMessage(response.message!);
    setIsUserUpdateFormOpen(false);
  };

  return (
    <div className={styles.updateContainer}>
      <div className={styles.userImg}>
        <Image width={65} height={55} src={user.image} alt={user.firstName} />
      </div>
      {!message ? (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder={user.firstName}
            name="name"
            value={changeName}
            onChange={(e) => setChangeName(e.target.value)}
          />
          <input
            value={changeEmail}
            onChange={(e) => setChangeEmail(e.target.value)}
            type="email"
            placeholder={user.email}
            name="email"
          />
          <input
            value={changePhone}
            onChange={(e) => setChangePhone(e.target.value)}
            type="number"
            name="phone"
            placeholder={user.phone}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <select onChange={(e) => setChangeGender(e.target.value)}>
            <option value="">Gender</option>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
          <button type="submit">change</button>
          <button onClick={() => setIsUserUpdateFormOpen && setIsUserUpdateFormOpen(false)}>cancel</button>
        </form>
      ) : (
        <div className={styles.message}>{message}</div>
      )}
    </div>
  );
}
