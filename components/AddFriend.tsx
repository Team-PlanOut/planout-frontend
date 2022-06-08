import axios from "axios";
import React, { useState } from "react";
import useAuth from "../src/hook/auth";
import { withProtected } from "../src/hook/route";

function AddFriend() {
  const [input, setInput] = useState<string>();
  const { token, user } = useAuth() as any;
  const [friend, setFriend] = useState<string | null>("");

  const getFriend = async () => {
    const findFriend = await axios.get(
      `https://cc26-planout.herokuapp.com/users/${input}`,
      {
        headers: {
          Authorization: "Bearer" + token,
        },
      }
    );
    setFriend(findFriend.data);
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
          <div className="mt-10 text-center text-4xl font-header">
            What's yer pals name?
          </div>
          <div>
            <form>
              <input
                type="text"
                placeholder="友達の名前は何だろう？"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
            </form>
            <button
              className="bg-blue-200 ml-8 mt-4 font-medium m-auto items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-blue-400"
              onClick={getFriend}
            >
              Friendship Engage!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtected(AddFriend);
