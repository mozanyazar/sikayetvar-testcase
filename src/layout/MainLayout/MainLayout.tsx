import React from "react";
import { LayoutProps } from "../DashboardLayout/DashboardLayout";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./MainLayout.module.css";
import { AuthContextProvider } from "@/store/AuthContext";

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <div className={styles.container}>
        <Header />
        <main className={styles.centerElement}>{children}</main>
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default MainLayout;
