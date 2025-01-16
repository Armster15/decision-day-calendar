import { format as formatDate } from "date-fns/format";
import humanizeDuration from "humanize-duration";

export function formatCollegeDecisionDate(date: Date) {
  let formatStr = "EEE MMM dd, yyyy";
  const doesDateHaveTime = dateHasTime(date);

  if (doesDateHaveTime) {
    formatStr += ", p";
  }

  let str = formatDate(date, formatStr);

  if (doesDateHaveTime) {
    let timezone = getTimeZoneAbbreviation(date);
    if (timezone) {
      str += " " + timezone;
    }
  }

  return str;
}

export function dateHasTime(date: Date) {
  return (
    date.getHours() !== 0 ||
    date.getMinutes() !== 0 ||
    date.getSeconds() !== 0 ||
    date.getMilliseconds() !== 0
  );
}

function getTimeZoneAbbreviation(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" });
  const parts = formatter.formatToParts(date);
  const timeZonePart = parts.find((part) => part.type === "timeZoneName");
  return timeZonePart ? timeZonePart.value : null;
}

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  round: true,
  units: ["mo", "d", "h", "m", "s"],
  languages: {
    shortEn: {
      mo: (count) => (count === 1 ? "month" : "months"),
      d: (count) => (count === 1 ? "day" : "days"),
      h: (count) => (count === 1 ? "hr" : "hrs"),
      m: (count) => "min",
      s: (count) => (count === 1 ? "sec" : "secs"),
    },
  },
});

export function getFormattedDifference(start: Date, end: Date) {
  return shortEnglishHumanizer(+end - +start);
}
