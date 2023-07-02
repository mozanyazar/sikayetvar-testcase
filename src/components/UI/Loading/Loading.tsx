import React from "react";
import styles from "./Loading.module.css";
import Lottie from "lottie-react";
import animation from "./animation.json";

export default function Loading() {
  return (
    <div className={styles.container}>
      <Lottie animationData={animation} loop={true} />
    </div>
  );
}
