"use client";

import { Fragment, useContext, useEffect, useId, useState } from "react";
import { clsx } from "clsx";
import { useQueryState, parseAsBoolean } from "nuqs";
import { DataContext } from "$/lib/context";
import { useAtom } from "jotai";
import {
  customCollegesAtom,
  selectedCollegeIdsAtom,
  type CustomCollege,
} from "$/lib/atoms";
import { Dialog, Transition } from "@headlessui/react";

export default function SelectColleges() {
  const { data } = useContext(DataContext)!;
  const [selectedCollegeIds, setSelectedCollegeIds] = useAtom(
    selectedCollegeIdsAtom
  );
  const [customColleges] = useAtom(customCollegesAtom);

  const formId = useId();
  const [showOnlySelectedColleges, setShowOnlySelectedColleges] = useQueryState(
    "selected",
    parseAsBoolean.withDefault(false)
  );
  const [filterText, setFilterText] = useState("");
  const [addCustomCollegeModalOpen, setAddCustomCollegeModalOpen] =
    useState(false);

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
        college.name.toLowerCase().includes(filterText.toLowerCase().trim())
      );
    }

    return colleges;
  })();

  return (
    <main>
      <div className="mb-4 flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
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
          <button
            className="pressable bg-black text-white px-4 py-2"
            onClick={() => setAddCustomCollegeModalOpen(true)}
          >
            Add Custom College
          </button>
        </div>
      </div>

      <input
        className="bg-white p-4 border-2 border-black mb-6 w-full"
        placeholder="Filter"
        value={filterText}
        onChange={(ev) => setFilterText(ev.target.value)}
      />

      {customColleges.length > 0 ? (
        <div className="mb-16">
          <h2 className="mb-2 font-semibold">Custom Colleges</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {customColleges.map((college) => (
              <CustomCollege
                key={college.id}
                customCollege={college}
                handleSelectCollege={handleSelectCollege}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {colleges.length === 0 && <p>No colleges found</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <p className="font-medium mb-1">{college.name}</p>
            <p
              className={clsx(
                "w-fit px-2 py-1 text-black mb-2",
                college.tag.includes("ED")
                  ? "bg-yellow-100"
                  : college.tag.includes("RD")
                  ? "bg-green-100"
                  : college.tag.includes("REA")
                  ? "bg-red-100"
                  : "bg-gray-100"
              )}
            >
              {college.tag}
            </p>
            <p>{new Date(college.decisionDate).toLocaleString()}</p>
            <p>{college.notes}</p>
          </button>
        ))}
      </div>

      <CustomCollegeModal
        isOpen={addCustomCollegeModalOpen}
        setIsOpen={setAddCustomCollegeModalOpen}
      />
    </main>
  );
}

function CustomCollege({
  customCollege: college,
  handleSelectCollege,
}: {
  customCollege: CustomCollege;
  handleSelectCollege: (collegeId: string) => void;
}) {
  const [selectedCollegeIds] = useAtom(selectedCollegeIdsAtom);
  const [customColleges, setCustomColleges] = useAtom(customCollegesAtom);
  const [editCustomCollegeModalOpen, setEditCustomCollegeModalOpen] =
    useState(false);

  function handleDeleteCustomCollege(collegeId: string) {
    setCustomColleges(customColleges.filter((c) => c.id !== collegeId));
  }

  return (
    <>
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
        <p className="font-medium mb-1">{college.name}</p>
        <p>{new Date(college.decisionDate).toLocaleString()}</p>

        <div className="mt-4 flex items-center justify-start gap-2">
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              setEditCustomCollegeModalOpen(true);
            }}
            className="bg-blue-200 p-2 text-black"
          >
            Edit
          </button>

          <button
            className="bg-red-200 p-2 text-black"
            onClick={(ev) => {
              ev.stopPropagation();
              if (
                confirm("Are you sure you want to delete this custom college?")
              ) {
                handleDeleteCustomCollege(college.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </button>

      <CustomCollegeModal
        isOpen={editCustomCollegeModalOpen}
        setIsOpen={setEditCustomCollegeModalOpen}
        customCollege={college}
      />
    </>
  );
}

function CustomCollegeModal({
  isOpen,
  setIsOpen,
  customCollege,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  customCollege?: CustomCollege;
}) {
  const [customColleges, setCustomColleges] = useAtom(customCollegesAtom);
  const [selectedCollegeIds, setSelectedCollegeIds] = useAtom(
    selectedCollegeIdsAtom
  );

  const id = useId();

  const [dateEl, setDateEl] = useState<HTMLInputElement | null>(null);
  const [timeEl, setTimeEl] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && customCollege && dateEl && timeEl) {
      const decisionDate = new Date(customCollege.decisionDate);

      dateEl.valueAsDate = decisionDate;
      timeEl.value = `${decisionDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${decisionDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
  }, [isOpen, dateEl, timeEl]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const name = formData.get("name")?.toString();
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();

    if (!name || !date) {
      alert("Please provide a name and/or date");
      return;
    }

    const decisionDate = new Date(`${date} ${time}`.trim()).toISOString();

    if (customCollege) {
      setCustomColleges(
        customColleges.map((college) => {
          if (college.id === customCollege.id) {
            return {
              ...college,
              decisionDate,
              name,
            };
          }

          return college;
        })
      );
    } else {
      const id = crypto.randomUUID();

      setCustomColleges([
        ...customColleges,
        {
          name,
          decisionDate,
          id,
        },
      ]);

      setSelectedCollegeIds((ids) => [...ids, id]);
    }

    closeModal();
  };

  return (
    <>
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
                    {customCollege
                      ? "Edit Custom College"
                      : "Add Custom College"}
                  </Dialog.Title>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="">
                      <label className="mb-1 block" htmlFor={id + "name"}>
                        Name
                      </label>
                      <input
                        name="name"
                        placeholder="Hogwarts School of Witchcraft and Wizardry"
                        defaultValue={customCollege?.name}
                        id={id + "name"}
                        className="border-2 border-black p-2 w-full"
                        required
                        min={3}
                        autoComplete="off"
                      />
                    </div>

                    <div className="">
                      <label className="mb-1 block" htmlFor={id + "date"}>
                        Date
                      </label>
                      <input
                        name="date"
                        id={id + "date"}
                        className="border-2 border-black p-2 w-full"
                        type="date"
                        required
                        ref={setDateEl}
                      />
                    </div>

                    <div className="">
                      <label className="mb-1 block" htmlFor={id + "time"}>
                        Time (optional)
                      </label>
                      <input
                        name="time"
                        type="time"
                        id={id + "time"}
                        className="border-2 border-black p-2 w-full"
                        ref={setTimeEl}
                      />
                    </div>

                    <div className="!mt-8">
                      <button className="pressable px-4 py-2 bg-black text-white">
                        {customCollege ? "Save" : "Add"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
