"use client";

import { useContext } from "react";
import { DataContext } from "$/lib/context";
import { revalidateData } from "$/lib/actions";

export default function Home() {
  const data = useContext(DataContext)!;
  return (
    <main className="p-8">
      <h1>Welcome to Countdown Calendar</h1>
      <p>Data last revalidated: {data.revalidateDate.toLocaleString()}</p>

      <button onClick={() => revalidateData()}>Revalidate data</button>
    </main>
  );
}
