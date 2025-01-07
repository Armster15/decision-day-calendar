"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import Link from "next/link";

export default function UILayout({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  // Don't render content with SSR
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="sticky top-0 z-10 w-full backdrop-blur-[12px]">
        <div className="flex justify-between items-center p-8 border-b border-black w-full">
          <h1>
            <Link href="/">Countdown Calendar</Link>
          </h1>

          <div className="flex gap-4">
            <Link className="pressable" href="/">
              Home
            </Link>
            <Link className="pressable" href="/select-colleges">
              Select Colleges
            </Link>
            <Link className="pressable" href="/advanced">
              Advanced
            </Link>
          </div>
        </div>
      </nav>

      <div className="px-8 py-4">{isReady ? children : <></>}</div>
    </div>
  );
}