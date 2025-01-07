import Link from "next/link";
import { PropsWithChildren } from "react";

export default function UILayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="flex justify-between items-center p-8 border-b border-black">
        <h1>
          <Link href="/">Countdown Calendar</Link>
        </h1>
        <div className="">
          <Link href="/advanced">Advanced</Link>
        </div>
      </nav>

      {children}
    </div>
  );
}
