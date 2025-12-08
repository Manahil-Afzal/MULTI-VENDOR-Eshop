import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user";  

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login/user`,
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("login Success!");
         navigate("/");  
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#417fa0]">

          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#417fa0]"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#417fa0]"
              >
                Password
              </label>
              <div className="mt-1 relative ">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className=" absolute right-2 top-2 cursor-pointer "
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className=" absolute right-2 top-2 cursor-pointer "
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between w-full`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-[#417fa0]"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-[#417fa0] hover:text-[#417fa0]"
                >
                  Forget Your Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px]
                 flex justify-center py-2 px-4 border border-transparent
                  text-sm font-med rounded-md text-white bg-[#417fa0]
                   hover:bg-[#417fa0] "
              >
                {" "}
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full `}>
              <h4 className="text-[#417fa0]">Not have any account?</h4>
              <Link to="/sign-up" className="text-[#417fa0] pl-2 ">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
