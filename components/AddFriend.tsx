import axios from "axios";
import React, { useState } from "react";
import useAuth from "../src/hook/auth";
import { withProtected } from "../src/hook/route";

function AddFriend() {
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
    console.log(findFriend);
    beginFriendship(findFriend);
  };

  const beginFriendship = async (findFriend: any) => {
    try {
      await axios.post(
        `https://cc26-planout.herokuapp.com/friends/${user.uid}/${findFriend.data.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container m-auto mt-20 box-content h-auto md:w-1/2 shadow-lg pb-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 mb-2 text-4xl font-header">
            What's yer pals name?
          </div>

          <form onSubmit={getFriend}>
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
