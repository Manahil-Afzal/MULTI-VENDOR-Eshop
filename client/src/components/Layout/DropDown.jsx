import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  
  const submithandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload(true);
  };
  
  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm ">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submithandle(i)}
          >
            <img
              src={i.image_Url}
              alt=""
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                userSelect: "none",
              }}
            />
            <h3 className="ml-3 cursor-pointer select-none ">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default Dropdown;