import { ReactElement, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiLogout,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";

export default function Navbar() {
  let [open, setOpen] = useState(false);

  const links: { name: string; link: string; icon: ReactElement }[] = [
    {
      name: "My Account",
      link: "/profile",
      icon: <HiOutlineHome className="h-8 w-8" />,
    },
    {
      name: "Events",
      link: "/events",
      icon: <HiOutlineCalendar className="h-8 w-8" />,
    },
    {
      name: "Friends",
      link: "/friends",
      icon: <HiOutlineUsers className="h-8 w-8" />,
    },
    {
      name: "Logout",
      link: "/logout",
      icon: <HiLogout className="h-8 w-8" />,
    },
  ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-around bg-white py-4 md:px-10 px-7">
        <div className="text-4xl  cursor-pointer flex items-center align-bottom  text-gray-800 font-logo">
          PlanOut
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {!open ? (
            <HiOutlineMenu className="h-8 w-8" />
          ) : (
            <HiOutlineX className="h-6 w-6" />
          )}
        </div>

        <ul
          className={`md:flex  md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          } `}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                <div className="flex flex-row mr-2">
                  {link.icon}
                  <span className="md:hidden ml-2 relative top-1">
                    {link.name}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
