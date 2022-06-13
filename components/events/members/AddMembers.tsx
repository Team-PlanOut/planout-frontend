import React, { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

export default function AddMembers({
  data,
  handleAddMember,
  member,
  setMember,
  setShowModal,
}: {
  handleAddMember: (member: string[]) => void;
  member: string[];
  setMember: (member: any) => void;
  data: { first_name: string; last_name: string }[];
  setShowModal: (showModal: boolean) => void;
}) {
  const [selected, setSelected] = useState<any>(null);
  const handleCheck = (e: any) => {
    console.log("checking", e);
    const user = e;
    if (member.includes(user)) {
      setMember(member.filter((member: string) => member !== user));
    } else {
      setMember([...member, user]);
    }
  };

  // const handleClick = (e: any) => {
  //   handleCheck(e);
  //   console.log(e);
  // };
  const handleSubmit = () => {
    if (member.length > 0) {
      handleAddMember(member);
    }
    setShowModal(false);
  };

  const handleForm = (e) => {
    console.log(e);
    handleCheck(e);
    handleSubmit();
  };
  const options = data.map((item) => ({
    value: item.first_name,
    label: item.first_name + " " + item.last_name,
  }));
  return (
    <div className="mt-10 p-10">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center items-center">
          <ul className="text-left overflow-y-auto capitalize font-body">
            {data.map((user, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="checkbox"
                  value={user.first_name}
                  onChange={(e) => handleCheck(e)}
                />
                <span className="ml-2">{user.first_name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-login font-body mt-2 font-lg inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-eventsButton"
        >
          Add Member
        </button>
      </form>
      {/* <Select
        options={options}
        isMulti
        onChange={(e) => {
          for (let user of e) {
            setSelected(user.value);
          }

          handleCheck(selected);
        }}
        isClearable={true}
        isSearchable={true}
        closeMenuOnSelect={false}
      />
      <button
        type="submit"
        onSubmit={() => handleForm(selected)}
        className="bg-login font-body mt-2 font-lg m-auto items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-eventsButton"
      >
        Add Member
      </button>{" "} */}
    </div>
  );
}
