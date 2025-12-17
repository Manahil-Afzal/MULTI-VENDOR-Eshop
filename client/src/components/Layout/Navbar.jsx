
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = () => {
  const location = useLocation(); 

  return (
    <div className="flex flex-col sm:flex-row mr-25  sm:flex-nowrap items-start sm:gap-x-1 ">
      {navItems &&
        navItems.map((i, index) => {
          const isActive = location.pathname === i.url; 
          return (
            <div key={index} className="sm:mr-5 lg:pb-1 pb-3  ">
              <Link
                to={i.url}
                className={` font-[700] cursor-pointer ${
                  isActive
                    ? "text-[#F2A533]  border-b-2 after:border-[#F2A533] relative after:mt-2  after:border-b-2 sm:underline"
                    : "text-black sm:text-white"
                }`}
              >
                {i.title}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Navbar;
