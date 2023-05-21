"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export const AppSessionProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

type GlobalState = {
  recipes: Recipe[] | ParsedRecipe[] | [];
  pantry: PantryItem[] | [];
};

const InitialState: GlobalState = {
  recipes: [],
  pantry: [],
};

export const AppContext = createContext<
  [GlobalState, (state: GlobalState) => void]
>([InitialState, () => {}]);

export const AppContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [globalState, setGlobalState] = useState<GlobalState>(InitialState);
  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      {children}
    </AppContext.Provider>
  );
};
