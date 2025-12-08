
import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

const handleSubmit = () => {
  navigate(`/products?category=${i.title}`);
};



  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className="branding my-12 flex justify-between w-full shadow-xl bg-white p-5 rounded-md"
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>


    <div
  className={`${styles.section} bg-white p-6 rounded-lg mb-6`}
  id="categories"
>
  <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[15px] 
                  lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[20px]">
    {categoriesData &&
      categoriesData.map((i) => {
        // Correct place for this function
        const handleSubmit = () => {
          // navigate(`/products?category=${i.categorySlug}`);
          navigate(`/products?category=${i.title}`);

        };

        return (
          <div
            key={i.id}
            onClick={handleSubmit}
            className="bg-white rounded-xl shadow-xl hover:shadow-lg transition-all cursor-pointer 
                       p-3 flex flex-col items-center justify-center text-center h-[120px] w-full
                       transform hover:rotate-3 transition-transform duration-300"
          >
            <img
              src={i.image_Url}
              alt={i.title}
              className="w-[60px] h-[60px] object-contain mb-2"
            />

            <h5 className="text-[15px] font-semibold leading-tight">{i.title}</h5>

            <p className="text-[12px] text-gray-500 mt-1">
              Explore the best {i.title}.
            </p>
          </div>
        );
      })}
  </div>
</div>


    </>
  );
};

export default Categories;


// import React from "react";
// import styles from "../../../styles/styles";
// import { brandingData, categoriesData } from "../../../static/data";
// import { useNavigate } from "react-router-dom";

// const Categories = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Branding Section */}
//       <div className={`${styles.section} hidden sm:block`}>
//         <div className="branding my-12 flex justify-between w-full shadow-xl bg-white p-5 rounded-md">
//           {brandingData &&
//             brandingData.map((item, index) => (
//               <div className="flex items-start" key={index}>
//                 {item.icon}
//                 <div className="px-3">
//                   <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
//                   <p className="text-xs">{item.Description}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Categories Section */}
//       <div className={`${styles.section} bg-white p-6 rounded-lg mb-6`} id="categories">
//         <div
//           className="grid grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[15px]
//                      lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[20px]"
//         >
//           {categoriesData &&
//             categoriesData.map((item, index) => {
//               const handleSubmit = () => {
//                 navigate(`/products?category=${item.title}`);
//               };

//               return (
//                 <div
//                   key={index}
//                   onClick={handleSubmit}
//                   className="bg-white rounded-xl shadow-xl hover:shadow-lg 
//                              transition-all cursor-pointer p-3 flex flex-col 
//                              items-center justify-center text-center h-[120px] w-full
//                              transform hover:rotate-3 transition-transform duration-300"
//                 >
//                   <img
//                     src={item.image_Url}
//                     alt={item.title}
//                     className="w-[60px] h-[60px] object-contain mb-2"
//                   />

//                   <h5 className="text-[15px] font-semibold leading-tight">
//                     {item.title}
//                   </h5>

//                   <p className="text-[12px] text-gray-500 mt-1">
//                     Explore the best {item.title}.
//                   </p>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;
