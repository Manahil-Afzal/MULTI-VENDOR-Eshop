import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerCompanyLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#417fa0] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-10 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <br />
          <p>The home and elements needed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiOutlineInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiOutlineYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold"> Company</h1>
          {footerProductLinks.map((item) => (
            <li key={item.name}>
              {/* Remove `to` prop and just use span or Link with `#` */}
              <span
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                onClick={(e) => e.preventDefault()} // Prevent any default action
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>


        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold"> Shop</h1>
          {footerCompanyLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold"> Shop</h1>
          {footerSupportLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2025 E-shop.com All rights reserved.</span>
        <span>Developed and design by-Manahil</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />

        </div>
      </div>
    </div>
  );
};

export default Footer;
