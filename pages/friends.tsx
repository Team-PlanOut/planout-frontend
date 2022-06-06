import React, { useState, useEffect } from "react";
import { FaPersonBooth } from "react-icons/fa";
import axios from "axios";

import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import useAuth from "./../src/hook/auth";
import { Users } from "../types";


function Friends() {
  const [friends, setFriends] = useState<Users[]>([]);
  const { token } = useAuth() as any;
  const { user } = useAuth() as any;

  const getFriends = async() => {
    const id = user.uid;
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/friends/${id}`,
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
        <div>Friend List</div>
        <div>
          <div>
            {friends.map((friend) => (
              <div key={friend.id}>
                {friend.first_name + ' ' + friend.last_name}
                {friend.username}
                </div>
            ))}
          </div>
          {/* <FaPersonBooth /> */}
        </div>
      </div>
    </div>
  );
}

export default withProtected(Friends);
