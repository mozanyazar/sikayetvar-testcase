import React from "react";
import { LayoutProps } from "../DashboardLayout/DashboardLayout";
import { AuthContextProvider } from "@/store/AuthContext";

const WithoutHeaderAndFooter: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <main>{children}</main>
    </AuthContextProvider>
  );
};

export default WithoutHeaderAndFooter;
