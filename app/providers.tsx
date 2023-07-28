"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState, useContext, FC } from "react";

type Props = {
  children?: React.ReactNode;
};

export const AppSessionProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const InitialState: GlobalState = {
  recipes: [],
  pantry: [],
  searchKeyword: "",
};

const InitialContext: GlobalContextType = {
  state: InitialState,
  setState: () => {},
};

export const AppContext = createContext<GlobalContextType>(InitialContext);

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<GlobalState>(InitialState);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(AppContext);
  return context;
};
