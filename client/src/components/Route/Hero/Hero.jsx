
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className="relative min-h-[80vh] sm:min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-start"
      style={{
        backgroundImage:
          // "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
         "url(https://t4.ftcdn.net/jpg/06/47/06/09/360_F_647060987_C5UYfJtT6G6i84x9RCbMb49DkKWiLGcf.jpg)",
       
        }}
    >
      <div
        className={`${styles.section} text-left ml-6 px-6 sm:px-10 md:px-20 max-w-[700px]`}
      >
        {/* Heading */}
        <h1 className="text-[26px] sm:text-[40px] md:text-[55px] font-bold leading-tight text-[#000] capitalize">
          𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐃é𝐜𝐨𝐫 𝐭𝐨 𝐄𝐥𝐞𝐯𝐚𝐭𝐞  𝐂𝐨𝐫𝐧𝐞𝐫  </h1>

        {/* Paragraph */}
        <p className="pt-4 sm:pt-5 text-[14px] sm:text-[16px] font-Poppins font-[400] text-[#000000ba]">
          Discover a wide range of stylish décor pieces from trusted sellers. From modern accents to traditional
           favorites, everything you need to make your home feel warm and beautiful is right here.
        </p>

        {/* Button */}
        <Link to="/products" className="inline-block mt-6">
          <div
            className={`${styles.button} bg-[#333] hover:bg-[#222] transition-all px-6 py-3 rounded-md`}
          >
            <span className="text-[#fff] font-Poppins text-[16px] sm:text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
