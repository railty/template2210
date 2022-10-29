import { createContext, useContext } from 'react'
import { useContact } from "./useContact"

const AppDataContext = createContext(null);

export const useAppData = () => {
  return useContext(AppDataContext);
};

export default function AppDataProvider({ children }) {
  const { contacts, create, remove, update, getContact } = useContact();
  const appData = { contacts, create, remove, update, getContact };
  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
}

