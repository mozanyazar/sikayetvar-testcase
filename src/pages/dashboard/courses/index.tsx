import onlyAdmin from "@/HOC/onlyAdmin";
import ComingSoon from "@/components/UI/ComingSoon/ComingSoon";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";
import { CustomComponent } from "@/pages/_app";
import React, { ReactNode } from "react";

function Courses() {
  return <ComingSoon />;
}
const CoursesPage: CustomComponent = onlyAdmin(Courses);

CoursesPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default CoursesPage;
