import { format as formatDate } from "date-fns";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export function formatCollegeDecisionDate(date: Date) {
  let formatStr = "EEE MMM dd, yyyy";
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

export function pluralize(singular: string, plural: string, number: number) {
  return number === 1 ? singular : plural;
}

export function getFormattedDifference(date1: Date, date2: Date) {
  const start = new Date(date1);
  const end = new Date(date2);

  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, start) % 12;
  const days = differenceInDays(end, start) % 30;
  const hours = differenceInHours(end, start) % 24;
  const minutes = differenceInMinutes(end, start) % 60;
  const seconds = differenceInSeconds(end, start) % 60;

  // Build the result string
  const parts = [];
  if (years > 0) parts.push(`${years} ${pluralize("yr", "yrs", years)}`);
  if (months > 0)
    parts.push(`${months} ${pluralize("month", "months", months)}`);
  if (days > 0) parts.push(`${days} ${pluralize("day", "days", days)}`);
  if (hours > 0) parts.push(`${hours} ${pluralize("hr", "hrs", hours)}`);
  if (minutes > 0)
    parts.push(`${minutes} ${pluralize("min", "mins", minutes)}`);
  if (seconds > 0)
    parts.push(`${seconds} ${pluralize("sec", "secs", seconds)}`);

  return parts.join(" ");
}
