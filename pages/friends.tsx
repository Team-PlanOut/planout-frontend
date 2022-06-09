import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import useAuth from "./../src/hook/auth";
import { Friends } from "../types";
import AddFriend from "./../components/AddFriend";

function Friends() {
  const [friends, setFriends] = useState<Friends[]>([]);
  const { token, user } = useAuth() as any;
  const [addFriend, setAddFriend] = useState<boolean>(false);

  const getFriends = async () => {
    const id = user.uid;

    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/friends/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setFriends(response.data);
  };

  const addUserAsFriend = () => {
    setAddFriend(!addFriend);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container m-auto h-screen no-scrollbar overflow-y-auto mt-20 box-content bg-container bg-opacity-10 md:w-1/2 shadow md:shadow-lg pb-10">
        <div className="text-center text-4xl mt-4 font-body font-bold">
          Friends List
        </div>
        <button
          onClick={addUserAsFriend}
          className="bg-blue-400 ml-8 mt-4 font-medium m-auto items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-blue-300"
        >
          Add Friend
        </button>
        {addFriend ? (
          <AddFriend setAddFriend={setAddFriend} />
        ) : (
          <div>
            <div>
              {friends.map((friend) => (
                <div
                  key={friend.friendId}
                  className="p-2 font-body bg-mintGreen text-2xl border-2 border-green-800 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-green-500  transition-all duration-500 ease-in"
                >
                  <div>
                    {friend.friendFirstName}{" "}
                    <span>{friend.friendLastName} </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withProtected(Friends);
