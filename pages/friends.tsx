import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import useAuth from "./../src/hook/auth";
import { Friends } from "../types";
import AddFriend from "../components/friends/AddFriend";

function Friends() {
  const [friends, setFriends] = useState<Friends[]>([]);
  const [addFriend, setAddFriend] = useState<boolean>(false);

  const { token, user } = useAuth() as any;

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
      <div className="h-screen">
        <div className="text-center text-4xl font-body font-bold mt-24">
          Friends List
        </div>
        <div className="shadow-2xl container m-auto h-4/8 md:w-1/2 scrollbar overflow-y-auto mt-10 rounded-lg box-content bg-dashboard pb-10">
          <button
            onClick={addUserAsFriend}
            className="bg-buttonColor scale-100 hover:scale-110 ml-8 mt-4 font-body  text-xl font-medium m-auto items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-blue-300"
          >
            Add Friend
          </button>
          {addFriend ? (
            <AddFriend
              setAddFriend={setAddFriend}
              getFriends={getFriends}
              friends={friends}
            />
          ) : (
            <div className=" flex flex-col justify-center items-center">
              {friends.map((friend) => (
                <div
                  key={friend.friendId}
                  className="flex flex-row w-2/3 rounded-lg font-body text-xl border-2 p-4 bg-yellow-100 scale-100 hover:scale-110  md:w-80 mt-10 text-center hover:cursor-pointer hover:border-white  transition-all duration-500 ease-in"
                >
                  <div>
                    <img
                      src={friend.photoUrl}
                      className="rounded-full w-16 h-16"
                    />
                  </div>
                  <div className="ml-4 flex flex-col justify-center">
                    <div key={friend.friendId} className="font-semibold">
                      {friend.friendFirstName} {friend.friendLastName}
                    </div>
                    <div className="text-sm"> {friend.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withProtected(Friends);
