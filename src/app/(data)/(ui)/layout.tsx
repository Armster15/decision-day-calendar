import Link from "next/link";
import { PropsWithChildren } from "react";

export default function UILayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="sticky top-0 z-10 w-full backdrop-blur-[12px]">
        <div className="flex justify-between items-center p-8 border-b border-black w-full">
          <h1>
            <Link href="/">Countdown Calendar</Link>
          </h1>

          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/select-colleges">Select Colleges</Link>
            <Link href="/advanced">Advanced</Link>
          </div>
        </div>
      </nav>

      <div className="px-8 py-4">{children}</div>
    </div>
  );
}
