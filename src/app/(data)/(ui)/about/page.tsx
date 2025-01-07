"use client";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="">
        <p className="mb-2">Why use this?</p>
        <ul className="list-disc ml-8 space-y-2">
          <li>
            <span className="font-medium">{"No Effort to Set Up: "}</span>
            Just select what colleges you want to track
          </li>
          <li>
            <span className="font-medium">{"Flexible: "}</span>
            {"if a college isn't already there, simply add it"}
          </li>
          <li>
            <span className="font-medium">{"Up to date: "}</span>
            {
              "college decision days are automatically updated when new information comes out, so you don't need to worry about manually maintaining anything"
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
    </div>
  );
}
