import React from "react";
import HeadComponent from "@/Head/HeadComponent";
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import styles from "./DashboardLayout.module.css";
import { AuthContextProvider } from "@/store/AuthContext";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { DashboardContextProvider } from "@/store/DashboardContext";

export type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeadComponent title="Dashboard" description="Şikayet var test case" />
      <AuthContextProvider>
        <DashboardContextProvider>
          <div className={styles.container}>
            <DashboardSidebar />
            <div className={styles.rightElement}>
              <DashboardHeader />
              <main className={styles.rightBottom}>{children}</main>
            </div>
          </div>
        </DashboardContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default DashboardLayout;
