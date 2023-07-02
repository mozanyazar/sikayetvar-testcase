import { UserLogin } from "@/services/types/types";
import { useRouter } from "next/router";
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isLoggedIn: boolean;
  user: UserLogin | null;
  logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  user: null,
  logoutHandler: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    var currentUser = localStorage.getItem("user");
    if (!currentUser) {
      return setIsLoggedIn(false);
    }
    const userParse = JSON.parse(currentUser);
    setUser(userParse);
    setIsLoggedIn(true);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const authContextValue: AuthContextData = {
    user,
    isLoggedIn,
    logoutHandler,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
