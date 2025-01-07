"use client";

import { useActionState, useContext } from "react";
import { DataContext } from "$/lib/context";
// import { revalidateData } from "$/lib/actions";

export default function Advanced() {
  const { revalidateDate } = useContext(DataContext)!;
  // const [_, formAction, isPending] = useActionState(revalidateData, false);

  return (
    <main>
      <p className="mb-2">
        Data is provided by{" "}
        <a className="link" href="https://applyingto.college/" target="_blank">
          ApplyingToCollege
        </a>{" "}
        and is automatically synced every 4 hours.
      </p>

      <p className="mb-4">Last synced: {revalidateDate.toLocaleString()}</p>

      {/* <form action={formAction}>
        <button
          className="pressable p-4 bg-black text-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Syncing..." : "Resync data"}
        </button>
      </form> */}
    </main>
  );
}
