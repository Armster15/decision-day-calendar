"use client";

import {
  Fragment,
  PropsWithChildren,
  useContext,
  useId,
  useState,
} from "react";
import { clsx } from "clsx";
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
  const [showOnlySelectedColleges, setShowOnlySelectedColleges] =
    useState(false);

  function handleSelectCollege(collegeId: string) {
    if (selectedCollegeIds.includes(collegeId)) {
      setSelectedCollegeIds((ids) => ids.filter((id) => id !== collegeId));
    } else {
      setSelectedCollegeIds((ids) => [...ids, collegeId]);
    }
  }

  const colleges = showOnlySelectedColleges
    ? data.filter((college) => selectedCollegeIds.includes(college.id))
    : data;

  return (
    <main>
      <div className="mb-6 flex justify-between items-center">
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
          <AddCustomCollegeModal>
            <button className="pressable bg-black text-white px-4 py-2">
              Add Custom College
            </button>
          </AddCustomCollegeModal>
        </div>
      </div>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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