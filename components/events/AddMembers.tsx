import React from "react";

export default function AddMembers({
  data,
  handleAddMember,
  setMember,
  setShowMembersModal,
}: {
  handleAddMember: any;
  setMember: (member: string) => void;
  data: { first_name: string }[];
  setShowMembersModal: (showMembersModal: boolean) => void;
}) {
  const handleSubmit = () => {
    handleAddMember();
    setShowMembersModal(false);
  };
  return (
    <div className="mt-10 p-10">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <select
          onChange={(e) => setMember(e.target.value)}
          className="block appearance-nonebg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select</option>
          {data.map((user: any, index: number) => (
            <option key={index} className="capitalize font-body">
              {user.first_name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-orange-200 mt-2 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-orange-400"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}
