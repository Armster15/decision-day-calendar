import { atomWithStorage } from "jotai/utils";

export const selectedCollegeIdsAtom = atomWithStorage<string[]>(
  "selected-college-ids",
  []
);
