import Loading from "@/components/UI/Loading/Loading";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// sadece adminin girmesine izin gerektiren yerlerde bu HIGH ORDER COMPONENT ile page'i çağırıyoruz. Örneğin Dashboard "bu case'de tüm kullanıcılar admindir. yani tek bakmamız gereken local storage'ta bir token var mı?"
const onlyAdmin = (WrappedComponent: React.ComponentType) => {
  const AuthHOC: React.FC = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
      const timer = setTimeout(() => {
        !isLoggedIn ? router.push("/") : setLoading(true);
      }, 1500);

      return () => clearTimeout(timer);
    }, [isLoggedIn]);

    return loading ? <WrappedComponent {...props} /> : <Loading />;
  };

  return AuthHOC;
};

export default onlyAdmin;
