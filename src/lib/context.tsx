"use client";

import { createContext } from "react";

export type RawData = {
  Name: string;
  Tag: string;
  Confirmed: string;
  "Decision Date": string;
  Notes: string;
}[];

export type Data = {
  name: string;
  tag: string;
  confirmed: string;
  decisionDate: string;
  notes: string;
  /** Name + tag */
  id: string;
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
