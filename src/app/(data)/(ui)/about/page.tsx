"use client";

export default function Advanced() {
  return (
    <main className="space-y-4">
      <div className="">
        <p>Why use this?</p>
        <ul className="list-disc ml-8">
          <li>
            {
              "Most data for colleges is already here so minimal work is required: just select what colleges you want to follow"
            }
          </li>
          <li>{"Flexible: if a college isn't here, simply add it"}</li>
          <li>
            {
              "Up to date: college decision days are automatically updated when new information comes out"
            }
          </li>
        </ul>
      </div>

      <p>
        {"We're open source! Visit "}
        <a
          className="link"
          href="https://github.com/Armster15/decision-day-calendar"
          target="_blank"
        >
          https://github.com/Armster15/decision-day-calendar
        </a>
      </p>

      <p>
        {"Created by "}
        <a className="link" href="https://armaan.cc" target="_blank">
          armaan
        </a>
      </p>
    </main>
  );
}
