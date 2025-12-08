import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import { getAllOrderOfShop } from "../../redux/actions/order";
import { useParams, Link } from "react-router-dom";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

 



const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
 
const data =  orders &&  orders.find((item) => item._id === id);
useEffect(() => {
    dispatch(getAllOrderOfShop(sellers._id));
}, [dispatch]);



  const orderUpdateHandler = async (e) => {
    await axios
      .post(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order Updated!");
        navigate("/dashboard-orders")
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .post(
        `${server}/order/update-order-status/${IDBCursor}`,
        {status},
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order Updated!");
        navigate("/dashboard-orders")
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }


  return (
    <div className={`py-1 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex ml-100 justify-end">
          <h3 className="text-[45px] text-[#F2A533] font-[600]">
            O̳r̳d̳e̳r̳ ̳D̳e̳t̳a̳i̳l̳s̳
          </h3>
        </div>
                <Link to="/dashboard-orders">
          <div className="flex items-center gap-3">
            <BsFillBagFill size={40} color="#F2A533" />

            <div
              className={`${styles.button} !bg-[#417fa0] !rounded-[4px] text-[#F2A533] font-[600] !h-[45px] text-[18px]`}
            >
              Order List
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5>
          {" "}
          order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      <br />
      <br />

      {data &&
        data.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${item?.images[0]?.url}`}
              alt=""
              className="w-[80px] h-[80px] "
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091] ">
                US${item.discountPrice} * {item.qty}{" "}
              </h5>
            </div>
          </div>
        ))}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800:flex items-start gap-6">
        <div className="w-full 800:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">𝐒𝐡𝐢𝐩𝐩𝐢𝐧𝐠 𝐀𝐝𝐝𝐫𝐞𝐬𝐬</h4>
          <h4 className="pt-3 text-[20px] ">
            {data?.shippingAddress?.address1 +
              " " +
              data?.shippingAddress?.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800:w[40%]">
          <h4 className="pt-3 text-[20px] ">𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐈𝐧𝐟𝐨:</h4>
          <h4>Status:{data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">𝐎𝐫𝐝𝐞𝐫 𝐒𝐭𝐚𝐭𝐮𝐬:</h4>
      {
        data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px] "
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Delivered",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Delivered",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )
      }

      <select value={status} onChange={(e) => setStatus(e.target.value)}
        className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
        {[
          "Processing refund",
          "Refund Success",
        ]
          .slice(
            [
              "Processing refund",
              "Refund Success",
            ].indexOf(data?.status)
          )
          .map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
      </select>
      <div
        className={`${styles.button} mt-5 !bg-[#417fa0] !rounded-[4px] text-[#F2A533] font-[600] !h-[45px] text-[18px]`}
        onClick={data?.status !== "Processing Refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
