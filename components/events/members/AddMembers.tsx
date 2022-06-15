import React from "react";

export default function AddMembers({
  data,
  handleAddMember,
  checkedMembers,
  setCheckedMembers,
  setShowModal,
}: {
  handleAddMember: (member: string[]) => void;
  checkedMembers: string[];
  setCheckedMembers: (member: any) => void;
  data: { friendFirstName: string; friendLastName: string }[];
  setShowModal: (showModal: boolean) => void;
}) {
  const handleCheck = (e: any) => {
    const user = e.target.value;
    if (checkedMembers.includes(user)) {
      setCheckedMembers(
        checkedMembers.filter(
          (checkedMembers: string) => checkedMembers !== user
        )
      );
    } else {
      setCheckedMembers([...checkedMembers, user]);
    }
  };

  const handleSubmit = () => {
    if (checkedMembers.length > 0) {
      handleAddMember(checkedMembers);
      setCheckedMembers([]);
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
          <ul className="text-left auto capitalize font-body">
            {data.map((user, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="checkbox"
                  value={user.friendFirstName}
                  onChange={(e) => handleCheck(e)}
                  className="relative bottom-1"
                />
                <span className="ml-2 text-3xl">{user.friendFirstName}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-login text-3xl font-body mt-4 font-lg inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-eventsButton"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}
