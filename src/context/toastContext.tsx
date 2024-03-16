import { ReactNode, useState, useContext, createContext } from "react";
import { Toast } from "../components/Toast";

interface ToastContextInterface {
  toast: (message: string) => void;
}

interface ProvidersInterface {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextInterface>({
  toast: () => {},
});

export const useToastContext = () => useContext(ToastContext);

export const Providers = ({ children }: ProvidersInterface) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const toast = (message: string) => {
    setToastOpen(true);
    setToastMessage(message);
    setTimeout(() => {
      setToastOpen(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast message={toastMessage} open={toastOpen} />
      {children}
    </ToastContext.Provider>
  );
};
