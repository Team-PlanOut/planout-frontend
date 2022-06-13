import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../src/hook/auth";

export default function SearchFriend({
  beginFriendship,
  beginReverseFriendship,
}: {
  beginFriendship: (friendId: string) => void;
  beginReverseFriendship: (friendId: string) => void;
}) {
  const [input, setInput] = useState<string | null>(null);
  const [filteredFriends, setFilteredFriends] = useState([]);

  const { token } = useAuth() as any;

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/users/${input}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data.length <= 0) {
      alert("No user found");
    }

    setFilteredFriends(response.data);
  };

  return (
    <div>
      <input
        type="search"
        name="event_name"
        id="event_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="Enter event name"
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(e) => handleSearch(e)}
      >
        Search
      </button>
      <div>
        {filteredFriends.map((friend: any) => (
          <div key={friend.id}>
            <p>{friend.first_name}</p>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                beginFriendship(friend.id);
                beginReverseFriendship(friend.id);
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
