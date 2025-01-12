import { format as formatDate } from "date-fns";

export function formatCollegeDecisionDate(date: Date) {
  return formatDate(date, "EEE MMM MM, R, p");
}
