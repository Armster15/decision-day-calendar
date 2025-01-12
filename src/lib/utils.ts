import { format as formatDate } from "date-fns";

export function formatCollegeDecisionDate(date: Date) {
  let formatStr = "EEE MMM MM, R";
  if (dateHasTime(date)) {
    formatStr += ", p";
  }

  return formatDate(date, formatStr);
}

export function dateHasTime(date: Date) {
  return (
    date.getHours() !== 0 ||
    date.getMinutes() !== 0 ||
    date.getSeconds() !== 0 ||
    date.getMilliseconds() !== 0
  );
}
