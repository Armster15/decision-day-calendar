"use client";

import { useContext, useEffect, useState } from "react";
import { DataContext } from "$/lib/context";
import { useAtom } from "jotai";
import { customCollegesAtom, selectedCollegeIdsAtom } from "$/lib/atoms";
import Link from "next/link";
import AboutPage from "./about/page";
import {
  dateHasTime,
  formatCollegeDecisionDate,
  getFormattedDifference,
} from "$/lib/utils";

export default function Home() {
  const { data } = useContext(DataContext)!;
  const [selectedCollegeIds, setSelectedCollegeIds] = useAtom(
    selectedCollegeIdsAtom
  );
  const [customColleges] = useAtom(customCollegesAtom);

  const selectedColleges: ((typeof data)[0] | (typeof customColleges)[0])[] = [
    ...data,
    ...customColleges,
  ]
    .filter((college) => selectedCollegeIds.includes(college.id))
    .sort((a, b) => +new Date(a.decisionDate) - +new Date(b.decisionDate));

  if (selectedColleges.length === 0) {
    return (
      <div className="mt-2">
        <div className="text-lg">
          <p className="mb-4">
            You {"don't"} have any colleges selected! Select some to build your
            tracker.
          </p>
          <Link className="link" href="/select-colleges">
            Select Colleges to Follow
          </Link>
        </div>

        <hr className="border my-8 border-black" />
        <AboutPage />
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 tabular-nums">
      {selectedColleges.map((college) => (
        <div
          className="flex flex-col justify-between bg-white p-4"
          key={college.id}
        >
          <div>
            <img
              src={`/get-favicon/${encodeURIComponent(
                college.name + " Website"
              )}`}
              alt=""
              width={64}
              height={64}
              className="mb-4 shadow h-[64px] w-[64px]"
            />

            <p className="font-semibold mb-1">{college.name}</p>
            <p className="mb-4">
              {formatCollegeDecisionDate(new Date(college.decisionDate))}
            </p>

            <p className="text-lg mb-4 min-h-[60px]">
              <Countdown date={new Date(college.decisionDate)} />
            </p>
          </div>

          <div>
            {"notes" in college && (
              <p className="mb-4 text-base text-gray-500">{college.notes}</p>
            )}

            <p className="mb-4 text-sm text-gray-500">
              {"confirmed" in college ? college.confirmed : "Custom"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Countdown({ date }: { date: Date }) {
  const [state, setState] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const distance = getFormattedDifference(new Date(), date);

  // AKA if new Date() > date
  if (distance === "") {
    // If __not__ same day that means we know for sure the decision is out
    if (date.toDateString() !== new Date().toDateString()) {
      return "Decision is out!";
    }

    // If we know the specific time of the decision date, then we know for sure decision is out
    if (dateHasTime(date)) {
      return "Decision is out!";
    }

    // Unknown whether decision is actually out or not
    return "Decision set to come out today!";
  }

  return distance;
}
