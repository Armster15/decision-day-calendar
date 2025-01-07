"use client";

import { useContext } from "react";
import { clsx } from "clsx";
import { DataContext } from "$/lib/context";
import { useAtom } from "jotai";
import { selectedCollegeIdsAtom } from "$/lib/atoms";
import Link from "next/link";

export default function Home() {
  const { data } = useContext(DataContext)!;
  const [selectedCollegeIds, setSelectedCollegeIds] = useAtom(
    selectedCollegeIdsAtom
  );

  const selectedColleges = data.filter((college) =>
    selectedCollegeIds.includes(college.id)
  );

  if (selectedColleges.length === 0) {
    return (
      <div>
        <p>You don't have any colleges selected!</p>
        <Link href="/select-colleges">Select Colleges to Follow</Link>
      </div>
    );
  }

  return (
    <div>
      {selectedColleges.map((college) => (
        <div key={college.id}>{college.name}</div>
      ))}
    </div>
  );
}
