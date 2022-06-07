import React from "react";
import AddMembers from "./events/AddMembers";

export default function MembersModal({
  eventMembers,
  setMember,
  data,
  handleAddMember,
  setShowMembersModal,
}: {
  eventMembers: { firstName: string }[];
  setMember: (member: string) => void;
  data: { first_name: string }[];
  handleAddMember: unknown;
  setShowMembersModal: (showMembersModal: boolean) => void;
}) {
  return (
    <div
      className="fixed z-10 overflow-y-auto top-0 md: w-full left-0"
      id="modal"
    >
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-20" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className=" inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 float-right mr-2 hover:cursor-pointer mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setShowMembersModal(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="flex flex-col justify-center items-center p-4">
            <div className="font-header text-xl"> Current Members</div>
            <ul className="text-leftoverflow-y-auto capitalize font-body">
              {eventMembers.map((user, index) => (
                <li key={index}>{user.firstName}</li>
              ))}
            </ul>
          </div>
          <div>
            <AddMembers
              setShowMembersModal={setShowMembersModal}
              data={data}
              setMember={setMember}
              handleAddMember={handleAddMember}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
