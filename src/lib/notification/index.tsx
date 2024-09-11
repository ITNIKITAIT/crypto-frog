import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { NotificationProps } from "./types";
import Notification from "./Notification";

const NotificationContext = createContext<
  | {
      notification: NotificationProps | null;
      setNotification: React.Dispatch<
        React.SetStateAction<NotificationProps | null>
      >;
    }
  | undefined
>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null,
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (notification) {
      timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  const contextValue = useMemo(
    () => ({
      notification,
      setNotification,
    }),
    [notification, setNotification],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};
