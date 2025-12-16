import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user";
import { RxAvatar } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeOff } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";


// const ShopCreate = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [address, setAddress] = useState("");
//   const [avatar, setAvatar] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);
//   const dispatch = useDispatch();

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     axios
//       .post(`${server}/shop/create-shop`, {
//         name,
//         email,
//         password,
//         avatar,
//         zipCode,
//         address,
//         phoneNumber,
//       })
//       .then((res) => {
//         toast.success(res.data.message);
//         setName("");
//         setEmail("");
//         setPassword("");
//         setAvatar();
//         setZipCode();
//         setAddress("");
//         setPhoneNumber();
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };


//   const handleFileInputChange = (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatar(reader.result);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Register as a Seller
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem] ">
//         <div className="bg-white py-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Shop Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="name"
//                   name="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Shop Phone Number
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="number"
//                   name="phone-number"
//                   required
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="address"
//                   name="address"
//                   autoComplete="email"
//                   required
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Zip Code
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="number"
//                   name="number"
//                   required
//                   value={zipCode}
//                   onChange={(e) => setZipCode(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//             placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative ">
//                 <input
//                   type={visible ? "text" : "password"}
//                   name="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {visible ? (
//                   <AiOutlineEye
//                     className=" absolute right-2 top-2 cursor-pointer "
//                     size={25}
//                     onClick={() => setVisible(false)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className=" absolute right-2 top-2 cursor-pointer "
//                     size={25}
//                     onClick={() => setVisible(true)}
//                   />
//                 )}
//               </div>
//             </div>

//             <div>
//               {" "}
//               <label
//                 htmlFor="avatar"
//                 className="block text-sm font-medium text-gray-700"
//               ></label>
//               <div className="mt-2 flex items-center">
//                 <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
//                   {avatar ? (
//                     <img
//                       src={avatar}
//                       alt="avatar"
//                       className="h-full w-full object-cover rounded-full  "
//                     />
//                   ) : (
//                     <RxAvatar className="h-8 w-8" />
//                   )}
//                 </span>
//                 <label
//                   htmlFor="file-input"
//                   className="ml-5 flex items-center justify-center px-4 
//                       border border-gray-300 rounded-md shadow-sm text-sm font-medium
//                       text-gray-700 bg-white hover:bg-gray-50 "
//                 >
//                   <span>Upload a File </span>
//                   <input
//                     type="file"
//                     name="file"
//                     id="file-input"
//                     accept=".jpg,.jpeg,.png"
//                     onChange={handleFileInputChange}
//                     className="sr-only"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full h-[40px]
//                  flex justify-center py-2 px-4 border border-transparent
//                   text-sm font-med rounded-md text-white bg-blue-600
//                    hover:bg-blue-700 "
//               >
//                 {" "}
//                 Submit
//               </button>
//             </div>

//             <div className={`${styles.normalFlex} w-full `}>
//               <h4>Already have any account?</h4>
//               <Link to="/shop-login" className="text-blue-600 pl-2 ">
//                 Sign in
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopCreate;



const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();

  const handlefile = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        console.log(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode("");
        setAddress("");
        setPhone();
        navigate("/shop-login");
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-4 lg:px-8">
      <div className="sm:mx-auto sm:full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[30rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 "
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearence-none block w-full px-3 py-2 border border-gray-300 rounded-md
                        placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 "
              >
                Shop Phone
              </label>
              <div className="mt-1">
                <input
                  type="phone-number"
                  name="phonenumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearence-none block w-full px-3 py-2 border border-gray-300 rounded-md
                        placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 "
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearence-none block w-full px-3 py-2 border border-gray-300 rounded-md
                        placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 "
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearence-none block w-full px-3 py-2 border border-gray-300 rounded-md
                        placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block text-sm font-medium text-gray-700 "
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="number"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearence-none block w-full px-3 py-2 border border-gray-300 rounded-md
                        placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 "
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearence-none block w-full px-3 py-2 border border-gray-300 rounded-md
                        placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        sm:text-sm"
                />
                {visible ? (
                  <IoEyeOutline
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <LuEyeOff
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <CgProfile className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="file"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handlefile}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                        cursor-pointer rounded-lg"
              >
                Sign Up
              </button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link
                to="/shop-login"
                className="text-blue-600 pl-2 hover:text-blue-500"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;