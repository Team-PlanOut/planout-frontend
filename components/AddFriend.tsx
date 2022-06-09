import axios from "axios";
import React, { useState } from "react";
import useAuth from "../src/hook/auth";
import { withProtected } from "../src/hook/route";
import { HiOutlineX } from "react-icons/hi";
function AddFriend({ setAddFriend }) {
  const [input, setInput] = useState<string | null>(null);
  const { token, user } = useAuth() as any;

  const getFriend = async () => {
    const findFriend = await axios.get(
      `https://cc26-planout.herokuapp.com/users/${input}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    beginFriendship(findFriend);
  };

  const beginFriendship = (findFriend: any) => {
    axios
      .post(
        `https://cc26-planout.herokuapp.com/friends/${user.uid}/${findFriend.data.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="container rounded-lg m-auto mt-20 bg-nav box-content h-auto md:w-1/2 shadow-lg pb-2">
        <div className="p-4">
          <HiOutlineX
            className="float-right hover:bg-gray-100 hover:cursor-pointer"
            onClick={() => {
              setAddFriend(false);
            }}
          />
          <div className="mt-10 mb-2 text-3xl font-body font-semibold">
            What's yer pals name?
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getFriend();
            }}
          >
            <input
              className="border-4 p-2"
              type="text"
              placeholder="友達の名前は何だろう？"
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <button
              type="submit"
              className="bg-blue-400 ml-8 mt-4 font-medium flex flex-col items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-blue-300"
            >
              Friendship Engage!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default withProtected(AddFriend);
