import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import { useRouter } from "next/router";

function Event() {
    const router = useRouter()
    const {
      query: { id },
    } = router

    interface Event {
        id: number;
        host: string;
        name: string;
        event_name: string;
        date: Date;
        budget: number;
        created_at: number;
        modified: number;
      }
      const [event, setEvent] = useState<Event[]>([]);
    
      const showEvents = () => {
        fetch(`https://cc26-planout.herokuapp.com/events/${router.query.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "x-auth-token": localStorage.getItem("token")
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setEvent(data);
          });
      };
    
      useEffect(() => {
        showEvents();
      }, [event]);
    return (
        <div>
            <Navbar/>
            <div>{event.length > 0 ? event[0].name : "Weeeeee"}</div>
        </div>
    )
}

export default withProtected(Event);