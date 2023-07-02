import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";
import DashboardHomeCard from "@/components/UI/HomeCardComponent/DashboardHomeCard";
import onlyAdmin from "@/HOC/onlyAdmin";

import styles from "./DashboardHome.module.css";
import React, { ReactNode, useState } from "react";
import { CustomComponent } from "../_app";

import home1 from "@/icons/home1.svg";
import home2 from "@/icons/home2.svg";
import home3 from "@/icons/home3.svg";
import home4 from "@/icons/home4.svg";

export interface CardObject {
  background: string;
  icon: SvgType;
  text: string;
  title: string;
  textColor?: string;
  width?: string;
}

interface SvgType {
  blurHeight: number;
  blurWidth: number;
  width: number;
  height: number;
  src: string;
}

function Dashboard() {
  const [cards, setCards] = useState<CardObject[]>([
    {
      background: "#F0F9FF",
      icon: home1,
      text: "243",
      title: "students",
    },
    {
      background: "#FEF6FB",
      icon: home2,
      text: "13",
      title: "course",
    },
    {
      background: "#FEFBEC",
      icon: home3,
      text: "556,000₺",
      title: "payment",
    },
    {
      background: "linear-gradient(131deg, rgba(254, 175, 0, 1) 62%, rgba(248, 212, 66, 1) 100%)",
      icon: home4,
      text: "3",
      title: "users",
      textColor: "#FFFFFF",
    },
  ]);

  return (
    <section className={styles.container}>
      <div className={`${styles.cards} ${cards.length > 4 && `${styles.layout2}`}`}>
        {cards.map((card) => {
          return (
            <DashboardHomeCard
              key={card.title}
              title={card.title}
              text={card.text}
              background={card.background}
              icon={card.icon}
              textColor={card.textColor}
            />
          );
        })}
      </div>
    </section>
  );
}

const DashboardPage: CustomComponent = onlyAdmin(Dashboard);

DashboardPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
