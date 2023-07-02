import React, { useEffect } from "react";
import styles from "./DashboardSidebar.module.css";
import Image from "next/image";
import DashboardLinks from "./DashboardLinks/DashboardLinks";
import logoutImg from "@/icons/logout.png";
import { useAuth } from "@/store/AuthContext";
import { useDashboard } from "@/store/DashboardContext";

export default function DashboardSidebar() {
  const { logoutHandler, user } = useAuth();
  const { isDashboardSidebarOpened } = useDashboard();

  return (
    <aside className={`${styles.sidebarContainer} ${isDashboardSidebarOpened ? `${styles.active} ` : ""}`}>
      <div className={styles.sidebarTitle}>
        <a href="/">
          <h1>MANAGE COURSES</h1>
        </a>
      </div>
      <div className={styles.photoGroup}>
        <div className={styles.image}>
          {user && <Image width={128} height={128} loading="lazy" alt="user photo" src={user.image} />}
        </div>
        <div className={styles.nameGroup}>
          <h4>{user?.firstName}</h4>
          <p>Admin</p>
        </div>
      </div>
      <div className={styles.sidebarBottom}>
        <DashboardLinks />

        <button onClick={(e) => logoutHandler()} className={styles.logout}>
          <span>Logout</span>{" "}
          <Image src={logoutImg} width={17} height={17} alt="logout" style={{ objectFit: "contain" }} />
        </button>
      </div>
    </aside>
  );
}
