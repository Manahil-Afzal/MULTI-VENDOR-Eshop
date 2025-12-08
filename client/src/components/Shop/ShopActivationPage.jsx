// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { server } from "../../server";


// const ShopActivationPage = () => {
//   const { activation_token } = useParams();
//   const [err, setError] = useState(false);


//  useEffect(() => {
//     if (activation_token) {
//       const sendRequest = async () => {
//          try {
//            const token = decodeURIComponent(activation_token);
//            const res = await axios.post(`${server}/shop/shop-activation`, {
//               activation_token: token,
//            })
//            console.log(res.data);
//          } catch (error) {
//             console.error(error.response.data);
//             setError(true);
//          }
//       };
//       sendRequest();
//     }
//   }, [activation_token]);


//   return (
//     <div className="w-[100%] h-screen flex justify-center items-center">
//       {err ? (
//         <p className="text-red-500 text-4xl">Your token is expired</p>
//       ) : (
//         <p className="text-green-500 text-4xl">
//           Your Shop has been created successfully
//         </p>
//       )}
//     </div>
//   );
// };

// export default ShopActivationPage;












import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const ShopActivationPage = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const activateEmail = async () => {
    setStatus("loading");
    try {
      const res = await axios.post(
        `${server}/shop/shop-activation`,
        { activation_token },
        { headers: { "Content-Type": "application/json" } }
      );
      setStatus("success");
    } catch (e) {
      console.log(e.message);
      setStatus("error");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      {status === "success" && (
        <p className="text-green-600 text-lg font-semibold">
          🎉 Your account has been successfully created!
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-lg font-semibold">
          ❌ Your activation token is expired or invalid.
        </p>
      )}

      <button
        onClick={activateEmail}
        disabled={status === "loading" || status === "success"}
        className={`${
          status === "success" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
        } text-white py-2 px-6 rounded font-semibold transition-all duration-200`}
      >
        {status === "loading" ? "Verifying..." : "Verify your account"}
      </button>
    </div>
  );
};

export default ShopActivationPage;