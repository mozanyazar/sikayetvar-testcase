import React from "react";
import styles from "./DashboardHeader.module.css";
import { RiMenu4Line } from "react-icons/ri";

import back from "@/icons/back.svg";
import not from "@/icons/notification.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDashboard } from "@/store/DashboardContext";

export default function DashboardHeader() {
  const { dashboardSideBarToggle } = useDashboard();
  const router = useRouter();

  return (
    <header className={styles.dashboardHeader}>
      <button onClick={() => dashboardSideBarToggle()} className={styles.menu}>
        <RiMenu4Line />
      </button>
      <button onClick={() => router.back()}>
        <Image width={18} height={18} src={back} alt="back button" />
      </button>
      <button>
        <Image width={17} height={20} src={not} alt="Notification" />
      </button>
    </header>
  );
}
