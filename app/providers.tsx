"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  children?: React.ReactNode;
};

export const AppSessionProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

//create context
export const AppContext = createContext<[string, (state: string) => void]>([
  "default state",
  () => {},
]);

//add state, wrapping children
export const AppContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [globalState, setGlobalState] = useState("Hi, I am global state.");

  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      {children}
    </AppContext.Provider>
  );
};

// use at root level
