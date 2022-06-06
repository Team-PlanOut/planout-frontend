import React, { useState, useEffect } from "react";
import { FaPersonBooth } from "react-icons/fa";
import axios from "axios";

import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import useAuth from "./../src/hook/auth";
import { Friends } from "../types";


function Friends() {
  const [friends, setFriends] = useState<Friends[]>([]);
  const { token } = useAuth() as any;
  const { user } = useAuth() as any;

  const getFriends = async() => {
    // const id = user.uid;
    const id = "1a9d53c2";
    const response = await axios.get(
      /*`https://cc26-planout.herokuapp.com/friends/${id}`*/
      `http://localhost:8080/friends/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
       },
      }
  );
      setFriends(response.data)
  }


useEffect(() => {
  getFriends()
},[]);


  return (
    <div>
      <Navbar />
      <div className="container m-auto h-auto mt-20 box-content md:w-1/2 shadow md:shadow-lg pb-10">
        <div className="mt-40 text-center text-4xl font-header">friends List</div>
        <div>
          <div>
            {friends.map((friend) => (
              <div 
              key={friend.friendId}
              className="p-4 font-body bg-mintGreen text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
              >
              <div key={friend.friendId}>
                {friend.friendFirstName + ' ' + friend.friendLastName}
                </div>
                <div >{"AKA: " + friend.username}</div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(Friends);
