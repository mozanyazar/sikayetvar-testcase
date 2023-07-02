import { UpdateUserData } from "@/components/UI/StudentsComponents/ChangeUserInfoCard/ChangeUserInfoCard";
import { ResponseMessage, User, UsersData } from "./types/types";

export const fetchUsers = async (limit: number, skip: number): Promise<UsersData | ResponseMessage> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data as UsersData;
  } catch (error) {
    return { status: 500 };
  }
};

export const deleteUser = async (id: number): Promise<ResponseMessage> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error();
    }

    return { status: 200, message: "başarı ile silindi!" };
  } catch (error) {
    return { status: 500, message: "Öğrenci silinemedi!" };
  }
};

export const createUser = async (userInfo: User): Promise<ResponseMessage | User> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data as User;
  } catch (error) {
    return { status: 500, message: "Beklenmedik hata kullanıcı eklenemedi" };
  }
};

export const updateUser = async (userInfo: UpdateUserData): Promise<ResponseMessage | User> => {
  // değişmeyen değerleri çıkar
  const filteredRequestBody = Object.fromEntries(Object.entries(userInfo).filter(([_, value]) => value !== ""));

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${userInfo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredRequestBody),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 500, message: "Güncellenemedi" };
  }
};

export const searchUser = async (params: string): Promise<UsersData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/search?q=${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      users: [],
      limit: 0,
      skip: 0,
      total: 0,
    };
  }
};
