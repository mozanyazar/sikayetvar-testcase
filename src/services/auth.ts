import { LoginError, UserLogin } from "./types/types";

export const login = async (requestData: { username: string; password: string }): Promise<LoginError | UserLogin> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      return { error: "Kullanıcı adı veya şifre hatalı" };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "beklenmeyen hata lütfen bir daha deneyiniz" };
  }
};
