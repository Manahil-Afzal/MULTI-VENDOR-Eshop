// import React from "react";
// import { Link } from "react-router-dom";

// const DropDown = ({
//   categoriesData,
//   handleCategoryClick,
//   dropDownProducts,
// }) => {
//   return (
//     <div className="absolute top-full left-0 w-[300px] bg-white shadow-lg z-20 mt-1 rounded overflow-hidden">
//       {categoriesData.map((category) => (
//         <div
//           key={category.id}
//           className="p-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
//           onClick={() => handleCategoryClick(category.title)}
//         >
//           <img
//             src={category.image_Url}
//             alt={category.title}
//             className="w-8 h-8 rounded"
//           />
//           <span>{category.title}</span>
//         </div>
//       ))}

//     {dropDownProducts.map((product) => (
//   <Link
//     key={product.id}
//     to={`/product/${product.name.replace(/\s+/g, "-")}`}
//   >
//     <div className="flex items-center gap-2 p-2 hover:bg-gray-50">
//       <img
//         src={product.image_Url?.[0]?.url || "/placeholder.png"}
//         alt={product.name}
//         className="w-10 h-10 rounded"
//       />
//       <span>{product.name}</span>
//     </div>
//   </Link>
// ))}
//     </div>
//   );
// };
// export default DropDown;






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