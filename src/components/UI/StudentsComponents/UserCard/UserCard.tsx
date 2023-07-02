import React, { useEffect, useState } from "react";
import { useDashboard } from "@/store/DashboardContext";
import styles from "./UserCard.module.css";
import Image from "next/image";

import pen from "@/icons/pen.svg";
import del from "@/icons/delete.svg";
import ChangeUserInfoCard from "../ChangeUserInfoCard/ChangeUserInfoCard";

export interface UserCardProps {
  id: number;
  image: string;
  firstName: string;
  email: string;
  phone: string;
  gender: string;
  companyName: string;
}

export default function UserCard({ image, id, firstName, email, phone, gender, companyName }: UserCardProps) {
  const { deleteUserById } = useDashboard();

  const [isUserUpdateFormOpen, setIsUserUpdateFormOpen] = useState<boolean>(false);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);

  const deleteStudent = async () => {
    setDeleteAnimation(true);

    await deleteUserById(id);
    return setTimeout(() => {
      setDeleteAnimation(false);
    }, 400);
  };

  return (
    <>
      {!isUserUpdateFormOpen ? (
        <div className={`${styles.container} ${deleteAnimation ? `${styles.active}` : ""}`}>
          <div className={styles.userImg}>
            <Image width={65} height={55} src={image} alt={firstName} />
          </div>
          <ul className={styles.midContent}>
            <li>
              <span>Name: </span> <p>{firstName}</p>
            </li>
            <li>
              <span>Email: </span>
              <p> {email}</p>
            </li>
            <li>
              <span>Phone: </span> <p>{phone}</p>
            </li>
            <li>
              <span>Gender: </span> <p>{gender}</p>
            </li>
            <li>
              <span>Company: </span>
              <p>{companyName ? companyName : "Facebook"}</p>
            </li>
          </ul>
          <div className={styles.buttons}>
            <button onClick={() => setIsUserUpdateFormOpen(true)}>
              <img src={pen.src} alt={"düzenle"} />
            </button>
            <button onClick={deleteStudent}>
              <img src={del.src} alt={"kullanıcıyı sil"} />
            </button>
          </div>
        </div>
      ) : (
        <ChangeUserInfoCard
          setIsUserUpdateFormOpen={setIsUserUpdateFormOpen}
          user={{
            id,
            email,
            gender,
            phone,
            image,
            firstName,
            companyName,
          }}
        />
      )}
    </>
  );
}
