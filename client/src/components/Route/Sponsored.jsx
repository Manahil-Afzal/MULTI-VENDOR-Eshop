
// import React from "react";

// const sponsors = [
//     "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png",
//   "https://logos-world.net/wp-content/uploads/2022/11/Acer-Logo.png",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyiHR51obalVq8EbqnD_-fjlOVl41vmAHdUA&s",
//   "https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png",
//     "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
//     "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
//  "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
//   "https://logos-world.net/wp-content/uploads/2023/12/CrossFit-Logo-120x67.png",
//   "https://logos-world.net/wp-content/uploads/2020/12/Nivea-Logo.png",
// ];

// const SponsoredLogos = () => {
//   return (
//     <div className="w-full flex  overflow-hidden bg-accent py-6 justify-center mt-3">
//       <div className="relative w-[100%] bg-[#ffffff]   rounded-xl shadow-8xl overflow-hidden py-4">
//         {/* CSS inside the same file */}
//         <style>{`
//           @keyframes scroll {
//             0% { transform: translateX(0%); }
//             100% { transform: translateX(-50%); }
//           }
//           .animate-scroll {
//             display: flex;
//             gap: 3.5rem;
//             animation: scroll 25s linear infinite;
//           }
//           .animate-scroll img:hover {
//             transform: scale(1.1);
//             transition: transform 0.3s ease-in-out;
//           }
//         `}</style>

//         <div className="animate-scroll whitespace-nowrap flex items-center">
//           {[...sponsors, ...sponsors].map((logo, index) => (
//             <img
//               key={index}
//               src={logo}
//               alt={`Sponsor ${index}`}
//               className="h-20 w-auto object-contain inline-block"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SponsoredLogos;


import React from "react";

const sponsors = [
  "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png",
  "https://logos-world.net/wp-content/uploads/2022/11/Acer-Logo.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyiHR51obalVq8EbqnD_-fjlOVl41vmAHdUA&s",
  "https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png",
  "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
  "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
  "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
  "https://logos-world.net/wp-content/uploads/2023/12/CrossFit-Logo-120x67.png",
  "https://logos-world.net/wp-content/uploads/2020/12/Nivea-Logo.png",
];

const SponsoredLogos = () => {
  return (
    <div className="w-full overflow-hidden bg-accent py-3 flex justify-center">
      {/* White card with shadow */}
      <div className="relative w-[100%] bg-white rounded-  hover:shadow-6xl  shadow-lg transition-shadow duration-900  overflow-hidden py-6">
        {/* CSS animation */}
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            gap: 3.5rem;
            animation: scroll 25s linear infinite;
          }
          .animate-scroll img:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
          }
        `}</style>

        <div className="animate-scroll whitespace-nowrap flex items-center">
          {[...sponsors, ...sponsors].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Sponsor ${index}`}
              className="h-20 w-auto object-contain inline-block"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsoredLogos;
