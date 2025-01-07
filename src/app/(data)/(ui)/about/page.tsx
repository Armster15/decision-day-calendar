"use client";

import { useActionState, useContext } from "react";

export default function Advanced() {
  return (
    <main>
      <p>Why use this?</p>
      <ul className="list-disc ml-8">
        <li>
          Most data for colleges is already here so minimal work is required:
          just select what colleges you want to follow
        </li>
        <li>Flexible: if a college isn't here, simply add it</li>
        <li>
          Up to date: college decision days are automatically updated when new
          information comes out
        </li>
      </ul>
    </main>
  );
}
