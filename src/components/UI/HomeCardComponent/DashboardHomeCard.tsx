import { CardObject } from "@/pages/dashboard";
import React from "react";
import styles from "./DashboardHomeCard.module.css";

export default function DashboardHomeCard({ background, width, icon, text, title, textColor }: CardObject) {
  return (
    <div className={styles.cardContainer} style={{ background: background, width: width }}>
      <div className={styles.cardTop}>
        <div className={styles.imgContainer}>
          <img src={icon.src} alt={title} />
        </div>
        <span className={styles.cardTitle} style={{ color: textColor }}>
          {title}
        </span>
      </div>
      <div className={styles.cardBottom}>{text}</div>
    </div>
  );
}
