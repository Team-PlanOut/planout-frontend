import axios from "axios";
import React from "react";
import useAuth from "../../src/hook/auth";
import { withProtected } from "../../src/hook/route";
import { HiOutlineX } from "react-icons/hi";
import SearchFriend from "./SearchFriend";
function AddFriend({
  setAddFriend,
  getFriends,
  friends,
}: {
  setAddFriend: (addFriend: boolean) => void;
  getFriends: () => Promise<void>;
  friends: any[];
}) {
  const { token, user } = useAuth() as any;

  const beginFriendship = async (findFriend: any) => {
    try {
      const friendIds = friends.map((friend) => friend.friendId);

      if (!friendIds.includes(findFriend)) {
        const userToFriend = await axios.post(
          `https://cc26-planout.herokuapp.com/friends/${user.uid}/${findFriend}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const friendToUser = await axios.post(
          `https://cc26-planout.herokuapp.com/friends/${findFriend}/${user.uid}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        axios.all([userToFriend, friendToUser]);

        if (friendToUser.status === 200) {
          getFriends();
          setAddFriend(false);
        }
      } else {
        alert("You are already friends with this user");
      }
    } catch (error) {
      console.error(error);
    }
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
        </div>
        <SearchFriend beginFriendship={beginFriendship} />
      </div>
    </>
  );
}

export default withProtected(AddFriend);
