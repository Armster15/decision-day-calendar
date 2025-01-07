"use client";

import {
  Fragment,
  PropsWithChildren,
  useContext,
  useId,
  useState,
} from "react";
import { clsx } from "clsx";
import { useQueryState, parseAsBoolean } from "nuqs";
import { DataContext } from "$/lib/context";
import { useAtom } from "jotai";
import { selectedCollegeIdsAtom } from "$/lib/atoms";
import { Dialog, Transition } from "@headlessui/react";
import { Slot } from "@radix-ui/react-slot";

export default function SelectColleges() {
  const { data } = useContext(DataContext)!;
  const [selectedCollegeIds, setSelectedCollegeIds] = useAtom(
    selectedCollegeIdsAtom
  );

  const formId = useId();
  const [showOnlySelectedColleges, setShowOnlySelectedColleges] = useQueryState(
    "selected",
    parseAsBoolean.withDefault(false)
  );
  const [filterText, setFilterText] = useState("");

  function handleSelectCollege(collegeId: string) {
    if (selectedCollegeIds.includes(collegeId)) {
      setSelectedCollegeIds((ids) => ids.filter((id) => id !== collegeId));
    } else {
      setSelectedCollegeIds((ids) => [...ids, collegeId]);
    }
  }

  const colleges = (() => {
    let colleges: typeof data = data;

    if (showOnlySelectedColleges) {
      colleges = colleges.filter((college) =>
        selectedCollegeIds.includes(college.id)
      );
    }

    if (filterText.trim() !== "") {
      colleges = colleges.filter((college) =>
        college.name.toLowerCase().includes(filterText.trim())
      );
    }

    return colleges;
  })();

  return (
    <main>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center justify-center gap-1 pressable">
          <input
            id={formId + "show-only-selected-colleges"}
            type="checkbox"
            checked={showOnlySelectedColleges}
            onChange={(ev) => {
              setShowOnlySelectedColleges(ev.target.checked);
            }}
          />
          <label htmlFor={formId + "show-only-selected-colleges"}>
            Show only selected colleges
          </label>
        </div>

        <div>
          {/* <AddCustomCollegeModal>
            <button className="pressable bg-black text-white px-4 py-2">
              Add Custom College
            </button>
          </AddCustomCollegeModal> */}
        </div>
      </div>

      <input
        className="bg-white p-4 border-2 border-black mb-6 w-full"
        placeholder="Filter"
        value={filterText}
        onChange={(ev) => setFilterText(ev.target.value)}
      />

      {colleges.length === 0 && <p>No colleges found</p>}

      <div className="grid grid-cols-3 gap-4">
        {colleges.map((college) => (
          <button
            className={clsx(
              "pressable p-4 text-left",
              selectedCollegeIds.includes(college.id)
                ? "bg-blue-500 text-white"
                : "bg-white"
            )}
            key={college.id}
            onClick={() => handleSelectCollege(college.id)}
          >
            <p>{college.name}</p>
            <p>{college.tag}</p>
            <p>{college.decisionDate.toLocaleString()}</p>
            <p>{college.notes}</p>
          </button>
        ))}
      </div>
    </main>
  );
}

function AddCustomCollegeModal({ children }: PropsWithChildren) {
  let [isOpen, setIsOpen] = useState(false);
  const id = useId();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Slot onClick={openModal}>{children}</Slot>

      <style jsx global>{`
        html {
          padding-right: 0 !important;
        }
      `}</style>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Add Custom College
                  </Dialog.Title>

                  <form>
                    <label className="mb-1 block" htmlFor={id + "name"}>
                      Name
                    </label>
                    <input
                      id={id + "name"}
                      className="border-2 border-black p-2 w-full"
                    />
                  </form>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="pressable px-4 py-2 bg-black text-white"
                      onClick={closeModal}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
