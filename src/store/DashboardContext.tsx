import { NewUserDataTypes } from "@/components/UI/AddNewStudentsForm/AddNewStudentsForm";
import { UpdateUserData } from "@/components/UI/StudentsComponents/ChangeUserInfoCard/ChangeUserInfoCard";
import { ResponseMessage, User, UsersData } from "@/services/types/types";
import { createUser, deleteUser, searchUser, updateUser } from "@/services/users";
import { useRouter } from "next/router";
import React, { ChangeEvent, ReactNode, createContext, useContext, useEffect, useState } from "react";

interface DashboardContextProviderProps {
  children: ReactNode;
}

interface DashboardContextData {
  isDashboardSidebarOpened: boolean;
  cardLoading: boolean;
  students: UsersData | null;
  isAddNewStudentsFormOpen: boolean;
  addNewStudentToggle: () => void;
  dashboardSideBarToggle: () => void;
  setStudents: React.Dispatch<React.SetStateAction<UsersData | null>>;
  deleteUserById: (id: number) => Promise<ResponseMessage>;
  addNewStudent: ({ firstName, email, phone, gender }: NewUserDataTypes) => Promise<ResponseMessage>;
  updateUserInformation: (data: UpdateUserData) => Promise<ResponseMessage>;
  searchStudentsHandler: (event: ChangeEvent<HTMLInputElement>) => Promise<ResponseMessage>;
}

const DashboardContext = createContext<DashboardContextData>({
  students: null,
  cardLoading: true,
  isDashboardSidebarOpened: false,
  isAddNewStudentsFormOpen: false,
  dashboardSideBarToggle: () => {},
  setStudents: () => {},
  addNewStudentToggle: () => {},
  searchStudentsHandler: () => {
    throw new Error("Function not implemented.");
  },
  deleteUserById: (id: number) => {
    throw new Error("Function not implemented.");
  },
  addNewStudent: () => {
    throw new Error("Function not implemented.");
  },
  updateUserInformation: () => {
    throw new Error("Function not implemented.");
  },
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isDashboardSidebarOpened, setIsDashboardSidebarOpened] = useState(false);
  const [isAddNewStudentsFormOpen, setIsAddNewStudentsFormOpen] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);
  const [students, setStudents] = useState<UsersData | null>(null);

  // Card skeleton animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardLoading(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [cardLoading]);

  // Yeni kullanıcı ekle
  const addNewStudent = async ({ firstName, email, phone, gender }: NewUserDataTypes) => {
    // fieldlar boş olmasın diye herhangi bir kullanıcıyı kopyalayıp değişecek datayı yazıyoruz "firstName,email vs."
    const copyOneUser = students && students.users[0];

    var myNewUserData = { ...copyOneUser, firstName, email, phone, gender };

    const response = await createUser(myNewUserData as User);

    // 201 değil ise yani ekleyemediysek hatayı gönderiyoruz
    if ("status" in response && response.status === 500) return response as ResponseMessage;

    let updateUsers = students && [...students.users];
    updateUsers?.push(response as User);
    let newStudents = { ...students, users: updateUsers, limit: students?.limit! + 1 };
    setStudents(newStudents as UsersData);

    return { status: 201, message: "Öğrenci eklendi!" };
  };

  // kullanıcıyı silme işlemi
  const deleteUserById = async (id: number) => {
    const response = await deleteUser(id);

    if (response.status === 500) response;

    // başarı ile silindi ise students state'imizden ilgili öğrenciyi çıkarıyoruz.
    const updatedUsers = students?.users.filter((user) => user.id !== id);
    const withoutTargetUser = { ...students, users: updatedUsers };

    setStudents(withoutTargetUser as UsersData);
    return response;
  };

  // kullanıcı update etme işlemi
  const updateUserInformation = async (data: UpdateUserData) => {
    const response = await updateUser(data);
    if ("status" in response && response.status === 500) {
      return { message: response.message, status: response.status };
    }

    // başarılı ise state'i update et
    const copyStudentsData = students && [...students?.users];

    const changeTargetUser = copyStudentsData?.map((student) => {
      if (student.id !== data.id) {
        return student;
      }
      return response;
    });
    const withoutTargetUser = { ...students, users: changeTargetUser };

    setStudents(withoutTargetUser as UsersData);
    return { status: 200 };
  };

  // öğrenci arama
  const searchStudentsHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setCardLoading(true);
    const searchTerm = event.target.value;
    const response = await searchUser(searchTerm);

    if (response.users.length !== 0) {
      setStudents(response);
      setCardLoading(false);
      return { status: 200 };
    }
    setStudents(response);
    setCardLoading(false);
    return { status: 500 };
  };

  // Dashboardu kapayıp açar
  const dashboardSideBarToggle = () => {
    setIsDashboardSidebarOpened(!isDashboardSidebarOpened);
  };
  // Yeni kullanıcı ekleme formu açıp kapar
  const addNewStudentToggle = () => {
    setIsAddNewStudentsFormOpen(!isAddNewStudentsFormOpen);
  };

  const DashboardContextValue: DashboardContextData = {
    dashboardSideBarToggle,
    deleteUserById,
    setStudents,
    addNewStudentToggle,
    addNewStudent,
    updateUserInformation,
    searchStudentsHandler,
    isDashboardSidebarOpened,
    cardLoading,
    students,
    isAddNewStudentsFormOpen,
  };

  return <DashboardContext.Provider value={DashboardContextValue}>{children}</DashboardContext.Provider>;
};
