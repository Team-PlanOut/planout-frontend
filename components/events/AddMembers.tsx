import React, { useState } from "react";

export default function AddMembers({
  data,
  setShowMembersModal,
}: {
  data: any;
  setShowMembersModal: (showMembersModal: boolean) => void;
}) {
  console.log(data);

  return (
    <div className="mt-10 p-10">
      <form className="flex flex-col justify-center items-center">
        <select className="block appearance-nonebg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option>select</option>
          {data.map((user: any, index: number) => (
            <option key={index} className="capitalize">
              {user.first_name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={() => setShowMembersModal(true)}
          className="border mt-2 p-2"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}
