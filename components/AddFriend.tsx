import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Users } from "../types";

import Navbar from "./Navbar";
import useAuth from "../src/hook/auth";
import { withProtected } from "../src/hook/route";

function addFriend({ setAddFriend }) {
  const [input, setInput] = useState<string>();
  const { token } = useAuth() as any;
  const { user } = useAuth() as any;
  const [friend, setFriend] = useState<string>();

  const getFriend = async() => {
    const findFriend = await axios.get(`https://cc26-planout.herokuapp.com/users/${input}`, {
      headers: {
        Authorization: "Bearer" + token
      }
    });
    setFriend(findFriend.data);
    console.log(findFriend);
    beginFriendship(findFriend);
  }

  const beginFriendship = async(findFriend) => {
    console.log(findFriend);
      try {
        console.log(friend);
        await axios.post(`https://cc26-planout.herokuapp.com/friends/${user.uid}/${findFriend.data.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <>
      <div className="container m-auto mt-20 box-content h-auto md:w-1/2 shadow-lg pb-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header">What's yer pals name?</div>
          <div>
            <form>
              <input type='text' placeholder="友達の名前は何だろう？" onChange={(e) => {
                setInput(e.target.value) 
                console.log(e.target.value)}}></input>
            </form>
            <button onClick={getFriend}>Friendship Engage!</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtected(addFriend);
