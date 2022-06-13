import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../src/hook/auth";
import { MdPersonAdd } from "react-icons/md";
export default function SearchFriend({
  beginFriendship,
}: {
  beginFriendship: (friendId: string) => void;
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
    <div className="flex flex-col justify-center items-center">
      <input
        type="search"
        name="search_friend"
        id="search_friend"
        className="bg-gray-50 border h-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="What's yer pal's name?"
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-400 ml-8 mt-4 font-medium flex flex-col items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-blue-300"
        onClick={(e) => handleSearch(e)}
      >
        Search
      </button>
      <div className="text-center mt-4 font-body text-lg pb-10 pl-8 pr-8 pt-2">
        <div>Result/s:</div>
        {filteredFriends.map((friend: any) => (
          <div key={friend.id} className="flex flex-row p-2">
            <p className="mr-8">
              {friend.first_name} {friend.last_name}
            </p>
            <button
              className="text-sm inline-flex padding-1 font-body bg-blue-200 rounded-lg p-1 hover:bg-blue-400"
              type="submit"
              onClick={() => {
                beginFriendship(friend.id);
              }}
            >
              <MdPersonAdd className="relative top-1 mr-1" /> Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
