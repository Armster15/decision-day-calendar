import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addYears,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format as formatDate,
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
  const dateAfterYears = addYears(start, years);

  const months = differenceInMonths(end, dateAfterYears);
  const dateAfterMonths = addMonths(dateAfterYears, months);

  const days = differenceInDays(end, dateAfterMonths);
  const dateAfterDays = addDays(dateAfterMonths, days);

  const hours = differenceInHours(end, dateAfterDays);
  const dateAfterHours = addHours(dateAfterDays, hours);

  const minutes = differenceInMinutes(end, dateAfterHours);
  const dateAfterMinutes = addMinutes(dateAfterHours, minutes);

  const seconds = differenceInSeconds(end, dateAfterMinutes);

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
