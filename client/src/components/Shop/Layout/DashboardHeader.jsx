import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiMessageSquare, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server.js";

const DashboardHeader = () => {
  const { sellers } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[80px]  bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 ">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/coupons" className="md:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>

          <Link to="/dashboard-messages" className="md:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to={`/shop/${sellers?._id || ""}`}>
            <img
              src={
                sellers?.avatar
                  ? `${sellers?.avatar?.url}`
               : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGhh6EJ3GsKjem9tPvDkiLHQrR1z-HFFUHA&s"
                }
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
