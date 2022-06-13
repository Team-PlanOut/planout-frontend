import React from "react";

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
  data: { first_name: string }[];
  setShowModal: (showModal: boolean) => void;
}) {
  const handleCheck = (e: any) => {
    const user = e.target.value;
    if (member.includes(user)) {
      setMember(member.filter((member: string) => member !== user));
    } else {
      setMember([...member, user]);
    }
  };

  const handleSubmit = () => {
    if (member.length > 0) {
      handleAddMember(member);
    }
    setShowModal(false);
  };

  return (
    <div className="mt-10 p-10">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center items-center">
          <ul className="text-leftoverflow-y-auto capitalize font-body">
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
    </div>
  );
}
