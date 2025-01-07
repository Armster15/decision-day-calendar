"use client";

import { useActionState, useContext } from "react";
import { DataContext } from "$/lib/context";
import { revalidateData } from "$/lib/actions";

export default function Advanced() {
  const { revalidateDate } = useContext(DataContext)!;
  const [_, formAction, isPending] = useActionState(revalidateData, false);

  return (
    <main>
      <p>Data last revalidated: {revalidateDate.toLocaleString()}</p>

      <form action={formAction}>
        <button
          className="pressable p-4 bg-black text-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Revalidating..." : "Revalidate data"}
        </button>
      </form>
    </main>
  );
}
