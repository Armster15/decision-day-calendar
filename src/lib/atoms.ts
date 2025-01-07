import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type CustomCollege = {
  name: string;
  decisionDate: string;
  id: string;
};

export const selectedCollegeIdsAtom = atomWithStorage<string[]>(
  "selected-college-ids",
  []
);

export const customCollegesAtom = atomWithStorage<CustomCollege[]>(
  "custom-colleges",
  []
);
