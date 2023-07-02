import React, { ReactEventHandler, ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { GetServerSideProps } from "next";
import Skeleton from "react-loading-skeleton";

// COMPONENTS & TYPES
import { ResponseMessage, UsersData } from "@/services/types/types";
import onlyAdmin from "@/HOC/onlyAdmin";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";
import SearchInput from "@/components/UI/StudentsComponents/Search/SearchInput";
import UserCard from "@/components/UI/StudentsComponents/UserCard/UserCard";
import styles from "./Students.module.css";
import { fetchUsers } from "@/services/users";
import { CustomComponent } from "@/pages/_app";
import HeadComponent from "@/Head/HeadComponent";
import { useDashboard } from "@/store/DashboardContext";

// SVGS
import leftarrow from "@/icons/leftarrow.svg";
import rightarrow from "@/icons/rightarrow.svg";
import AddNewStudentsForm from "@/components/UI/AddNewStudentsForm/AddNewStudentsForm";

function Students({ repo }: { repo: UsersData }) {
  const { students, setStudents, addNewStudentToggle, isAddNewStudentsFormOpen, cardLoading } = useDashboard();

  const router = useRouter();
  let selectBox = [6, 8, 10];

  // "repo" değiştiğinde setStudents ile repoyu context'teki state'imize atıyoruz
  useEffect(() => {
    setStudents(repo);
  }, [repo]);

  // Son sayfaya geldiğimizde eğer sayfa ilerletme işlemi yapılacak ise bir işlem yapılmaz
  const isItLastPage = () => {
    return Math.ceil(repo.total / repo.limit) !== repo.skip + 1 ? false : true;
  };

  // Sayfa değiştir
  const pageNumberChangeHandler = (value: string) => {
    // azalt
    if (value === "decrement" && repo.skip !== 0) {
      return router.push({
        pathname: "/dashboard/students",
        query: { limit: repo.limit, skip: repo.skip - 1 },
      });
    }
    // arttır
    else if (value === "increment" && !isItLastPage()) {
      return router.push({
        pathname: "/dashboard/students",
        query: { limit: repo.limit, skip: repo.skip + 1 },
      });
    }
  };

  // Sayfa başı kaç students gelecek "limiti değiştir"
  const perPageChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    router.push({
      pathname: "/dashboard/students",
      query: { limit: newLimit, skip: 0 },
    });
  };

  return (
    <>
      <HeadComponent title="dashboard students" />

      <section className={styles.container}>
        <div className={styles.studentsHead}>
          <h2>Students List</h2>
          <div className={styles.headRight}>
            <SearchInput />
            <button onClick={() => addNewStudentToggle()} className={styles.addStudent}>
              ADD NEW STUDENT
            </button>
          </div>
        </div>
        <ul className={styles.studentsTitles}>
          <li>Name</li>
          <li>Email</li>
          <li>Phone</li>
          <li>Gender</li>
          <li>Company Name</li>
        </ul>
        <div className={styles.studentsContainer}>
          {cardLoading
            ? Array(6)
                .fill("maple")
                .map((item, index) => {
                  return (
                    <div className={styles.skeletonAnimation} key={index}>
                      <Skeleton />
                    </div>
                  );
                })
            : students?.users?.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    image={user.image}
                    firstName={user.firstName}
                    email={user.email}
                    phone={user.phone}
                    gender={user.gender}
                    companyName={user.company.name}
                    id={user.id}
                  />
                );
              })}
        </div>
        <div className={styles.paginationWrapper}>
          <label className={styles.perPageContainer}>
            <span>Rows per page: </span>{" "}
            <select onChange={(event) => perPageChangeHandler(event)}>
              <option value={repo.limit}>{repo.limit}</option>
              {selectBox.map((select) => {
                return select === repo.limit ? (
                  ""
                ) : (
                  <option key={select} value={select}>
                    {select}
                  </option>
                );
              })}
            </select>
          </label>
          <div className={styles.paginationArrows}>
            {repo.skip + 1} / {Math.ceil(repo.total / repo.limit)}
            <button onClick={() => pageNumberChangeHandler("decrement")}>
              <img src={leftarrow.src} alt="change page" />
            </button>
            <button onClick={() => pageNumberChangeHandler("increment")}>
              <img src={rightarrow.src} alt="change page" />
            </button>
          </div>
        </div>
      </section>
      {isAddNewStudentsFormOpen && <AddNewStudentsForm />}
    </>
  );
}
const StudentsPage: CustomComponent = onlyAdmin(Students as React.ComponentType);

StudentsPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default StudentsPage;

// server side render
export const getServerSideProps: GetServerSideProps<{ repo: UsersData | ResponseMessage }> = async ({ query }) => {
  let limit = query?.limit ? Number(query.limit) : 6;
  let skip = query?.skip ? Number(query.skip) : 0;

  const repo = await fetchUsers(limit, skip);
  // Error var ise redirect etme işlemi
  if ("status" in repo && repo.status === 500) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return { props: { repo } };
};
