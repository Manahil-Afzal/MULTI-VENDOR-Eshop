import React from "react";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineCreditCard, MdOutlinePassword, MdOutlineTrackChanges } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../../server";
import { RiLockPasswordLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";



const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  
  return (
    <div className=" w-full bg-white text-[#417fa0] shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-red" : ""}`}>
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-red" : ""}`}>Orders</span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-red" : ""}`}>
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-red" : ""}`}>Inbox</span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-red" : ""}`}>
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-red" : ""}`}>
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-red" : ""}`}>
          Address
        </span>
      </div>

     {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 8 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[red]" : ""
              } 800:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <TbLogout size={20} color={active === 8 ? "#F2A533" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-red" : ""}`}>
          Log Out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
