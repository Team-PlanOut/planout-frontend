import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import { useRouter } from "next/router";
import Link from "next/link";


function singleEvent() {
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


      const [events, setEvents] = useState<Event[]>([]);
      const [tasks, setTasks] = useState([])
    
      const showEvents = async() => {
       await fetch(`https://cc26-planout.herokuapp.com/events/${router.query.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "x-auth-token": localStorage.getItem("token")
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setEvents(data);
          });
      };

      const showTasks = async() => {
        await fetch(`https://cc26-planout.herokuapp.com/tasks/event/${router.query.id}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             // "x-auth-token": localStorage.getItem("token")
           },
         })
           .then((res) => res.json())
           .then((data) => {
             setTasks(data);
           });
       };
 

    
      useEffect(() => {
        showEvents();
      }, [events]);

      useEffect(()=>{
        showTasks();
      },[tasks]);

    return (
        <div>
            <Navbar/>
            <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header">{events.name}</div>
          <div>TASKS</div>
        <div className="overflow-hidden m-10">
          <div>
            {tasks.map((task) => (
              <div className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in">
                <div
                  key={task.id}
                >
                  {task.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
        </div>
    )
}

export default withProtected(singleEvent);