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
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 justify-between items-center p-4 sm:p-8 border-b border-black w-full">
          <h1>
            <Link className="font-semibold text-lg" href="/">
              Decision Day Calendar
            </Link>
          </h1>

          <div className="flex gap-4">
            <Link className="link !no-underline text-center" href="/">
              Home
            </Link>
            <Link
              className="link !no-underline text-center"
              href="/select-colleges"
            >
              Select Colleges
            </Link>
            <Link className="link !no-underline text-center" href="/about">
              About
            </Link>
            <Link className="link !no-underline text-center" href="/advanced">
              Advanced
            </Link>
          </div>
        </div>
      </nav>

      <div className="px-8 pt-4 pb-36">
        {isReady ? children : <></>}
        <noscript>
          <p>Please enable JavaScript</p>
        </noscript>
      </div>
    </div>
  );
}
