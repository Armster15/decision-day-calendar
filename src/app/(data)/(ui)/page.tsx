"use client";

import { useContext, useEffect, useState } from "react";
import { DataContext } from "$/lib/context";
import { useAtom } from "jotai";
import { customCollegesAtom, selectedCollegeIdsAtom } from "$/lib/atoms";
import Link from "next/link";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import AboutPage from "./about/page";
import { dateHasTime, formatCollegeDecisionDate } from "$/lib/utils";

function getFormattedDifference(date1: Date, date2: Date) {
  const start = new Date(date1);
  const end = new Date(date2);

  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, start) % 12;
  const days = differenceInDays(end, start) % 30;
  const hours = differenceInHours(end, start) % 24;
  const minutes = differenceInMinutes(end, start) % 60;
  const seconds = differenceInSeconds(end, start) % 60;

  // Build the result string
  const parts = [];
  if (years > 0) parts.push(`${years} yrs`);
  if (months > 0) parts.push(`${months} months`);
  if (days > 0) parts.push(`${days} days`);
  if (hours > 0) parts.push(`${hours} hrs`);
  if (minutes > 0) parts.push(`${minutes} mins`);
  if (seconds > 0) parts.push(`${seconds} secs`);

  return parts.join(" ");
}

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
        <div className="bg-white p-4" key={college.id}>
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

          <p className="text-lg mb-4">
            <Countdown date={new Date(college.decisionDate)} />
          </p>

          {"confirmed" in college && (
            <p className="mb-4 text-sm text-gray-500">{college.confirmed}</p>
          )}
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

  if (distance === "") {
    if (dateHasTime(date)) {
      return "Decision is out!";
    }
    return "Decision set to come out today!";
  }

  return distance;
}
