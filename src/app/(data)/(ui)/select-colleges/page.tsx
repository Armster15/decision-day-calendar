"use client";

import { useContext } from "react";
import { clsx } from "clsx";
import { DataContext } from "$/lib/context";
import { useAtom } from "jotai";
import { selectedCollegeIdsAtom } from "$/lib/atoms";

export default function Home() {
  const { data } = useContext(DataContext)!;
  const [selectedCollegeIds, setSelectedCollegeIds] = useAtom(
    selectedCollegeIdsAtom
  );

  function handleSelectCollege(collegeId: string) {
    if (selectedCollegeIds.includes(collegeId)) {
      setSelectedCollegeIds((ids) => ids.filter((id) => id !== collegeId));
    } else {
      setSelectedCollegeIds((ids) => [...ids, collegeId]);
    }
  }

  return (
    <main>
      <div className="grid grid-cols-3 gap-4">
        {data.map((college) => (
          <button
            className={clsx(
              "p-4 text-left active:scale-[0.99] active:opacity-80 duration-150",
              selectedCollegeIds.includes(college.id)
                ? "bg-blue-500 text-white"
                : "bg-white"
            )}
            key={college.id}
            onClick={() => handleSelectCollege(college.id)}
          >
            <p>{college.name}</p>
            <p>{college.tag}</p>
            <p>{college.decisionDate}</p>
            <p>{college.notes}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
