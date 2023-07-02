import onlyAdmin from "@/HOC/onlyAdmin";
import ComingSoon from "@/components/UI/ComingSoon/ComingSoon";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";
import { CustomComponent } from "@/pages/_app";
import React, { ReactNode } from "react";

function Settings() {
  return <ComingSoon />;
}
const SettingsPage: CustomComponent = onlyAdmin(Settings);

SettingsPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default SettingsPage;
