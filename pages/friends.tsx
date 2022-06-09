import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import useAuth from "./../src/hook/auth";
import { Friends } from "../types";
import AddFriend from "./../components/AddFriend";

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
      <div className="container m-auto h-1/2 mt-20 box-content md:w-1/2 shadow md:shadow-lg pb-10">
        <div className="mt-40 text-center text-4xl font-header">
          Friends List
        </div>
        <button
          onClick={addUserAsFriend}
          className="bg-blue-400 ml-8 mt-4 font-medium m-auto items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-blue-300"
        >
          Add Friend
        </button>
        {addFriend ? (
          <AddFriend friends={friends} />
        ) : (
          <div>
            <div>
              {friends.map((friend) => (
                <div
                  key={friend.friendId}
                  className="p-2 font-body bg-mintGreen text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
                >
                  <div>
                    {friend.friendFirstName} {friend.friendLastName}
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
