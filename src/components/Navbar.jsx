import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <>
      <nav className="w-full p-1 bg-white h-10 flex items-center pr-5 pt-5 pl-4">
        <div className="">
          <form action="">
            <div className="flex bg-[#F5F6FA] align-center items-center border rounded-xl">
              <label
                className="mr-2 ml-2 flex align-center justify-center"
                htmlFor="searchBar"
              >
                <CiSearch />
              </label>
              <input
                type="text"
                id="searchBar"
                name="searchBar"
                placeholder="search"
                className="w-24 sm:w-1xl outline-none px-2 rounded-xl"
              />
            </div>
          </form>
        </div>
        <div className="ml-auto flex align-center">
          <button className="mr-2">
            <IoIosNotifications className="mr-2 text-2xl" />
          </button>
          <button className="mr-2">
            <select
              name=""
              id=""
              className="outline-none border px-2 rounded-xl"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </button>
          <button className="mr-2 ml-4">
            <CgProfile className="mr-2 text-2xl" />
          </button>
          <button>
            <select
              name=""
              id=""
              className="outline-none border px-2 rounded-xl"
            >
              <option value="">admin</option>
              <option value="">User</option>
            </select>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
