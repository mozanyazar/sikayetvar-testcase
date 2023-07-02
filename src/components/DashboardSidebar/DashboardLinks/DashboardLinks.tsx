import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./DashboardLinks.module.css";
// images
import home from "@/icons/home.png";
import course from "@/icons/bookmark 1.png";
import student from "@/icons/students.png";
import payment from "@/icons/payments.png";
import report from "@/icons/Vector.png";
import settings from "@/icons/settings.png";
import { useRouter } from "next/router";

interface Sidelinks {
  title: string;
  active: boolean;
  href: string;
  img: any;
}

export default function DashboardLinks() {
  const router = useRouter();

  const [sidelinks, setSideLinks] = useState<Sidelinks[]>([
    { title: "home", active: false, href: "/dashboard", img: home },
    {
      title: "course",
      active: false,
      href: "/dashboard/courses",
      img: course,
    },
    {
      title: "students",
      active: false,
      href: "/dashboard/students",
      img: student,
    },
    {
      title: "payment",
      active: false,
      href: "/dashboard/payment",
      img: payment,
    },
    {
      title: "report",
      active: false,
      href: "/dashboard/report",
      img: report,
    },
    {
      title: "settings",
      active: false,
      href: "/dashboard/settings",
      img: settings,
    },
  ]);

  useEffect(() => {
    const copySideLinks = [...sidelinks];
    copySideLinks.map((item) => {
      if (item.href !== router.pathname) {
        return (item.active = false);
      }
      return (item.active = true);
    });
    setSideLinks(copySideLinks);
  }, [router.pathname]);

  return (
    <ul className={styles.linksContainer}>
      {sidelinks.map((item) => {
        return (
          <li key={item.title}>
            <a className={`${item.active && `${styles.active}`}`} href={item.href}>
              <div>
                <Image width={19} height={17} alt={item.title} src={item.img} />
              </div>
              <span>{item.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
