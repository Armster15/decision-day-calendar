"use client";

import { createContext } from "react";

export type Data = {
  Name: string;
  Tag: string;
  Confirmed: string;
  "Decision Date": string;
  Notes: string;
}[];

export const DataContext = createContext<{
  data: Data;
  revalidateDate: Date;
} | null>(null);

export const DataContextProvider = (
  props: React.ComponentProps<typeof DataContext.Provider>
) => {
  return <DataContext.Provider {...props} />;
};
