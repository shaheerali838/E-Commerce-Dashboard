import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <>
      <nav className="w-full pt-2  ">
        <div className="grid grid-cols-12 grid-rows-1 gap-0 ">
          <div className="col-span-2">
            <div className="logo mt-2 mb-2 text-xs md:text-3xl flex justify-center items-center">
              <h1>E-Commerce</h1>
            </div>
          </div>
          <div className="col-span-7 col-start-3 flex justify-start pl-10 items-center">
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
                  className="w-24 sm:w-50 outline-none px-2 rounded-xl"
                />
              </div>
            </form>
          </div>
          <div className="col-span-3 col-start-10 flex justify-center items-center">
            <div className="flex align-center">
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
