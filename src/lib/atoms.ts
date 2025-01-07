import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type CustomCollege = {
  name: string;
  decisionDate: Date;
  id: string;
};

export const selectedCollegeIdsAtom = atomWithStorage<string[]>(
  "selected-college-ids",
  []
);

export const __customCollegesAtom = atomWithStorage<CustomCollege[]>(
  "custom-colleges",
  []
);

export const customCollegesAtom = atom(
  (get) =>
    get(__customCollegesAtom).map((college) => ({
      ...college,
      decisionDate: new Date(college.decisionDate),
    })),
  (_get, set, data: CustomCollege[]) => set(__customCollegesAtom, data)
);
