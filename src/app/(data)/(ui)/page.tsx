"use client";

import { useContext } from "react";
import { DataContext } from "$/lib/context";
import { revalidateData } from "$/lib/actions";
import Link from "next/link";

export default function Home() {
  const data = useContext(DataContext)!;
  return (
    <main>
      <p>Hello World</p>
    </main>
  );
}
