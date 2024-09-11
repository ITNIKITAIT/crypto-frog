import { getApiAdminProfileAll } from "lib/endpoints/api/admin/profile/all/get";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth Admin must be used within a AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("authToken"),
  );
  // Эффект для слежения за изменением токена и сохранения его в localStorage
  useEffect(() => {
    if (token) {
      // Временный запрос для проверки валидности токена
      const checkToken = async () => {
        try {
          const response = await getApiAdminProfileAll({ token });
          if (response.status === 401) {
            setToken(null);
          }
        } catch (error: unknown) {
          // eslint-disable-next-line no-console
          console.error(error);
          setToken(null);
        }
      };
      checkToken();
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
