import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { useParams, Link } from "react-router-dom";
import { backend_url } from "../server";
import styles from "../styles/styles";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratings, setRatings] = useState(1);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [status, setStatus] = React.useState("");



  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const data = orders && orders.find((item) => item._id === id);


  const reviewHandler = async (e) => {
    await axios.put(`${server}/product/create-new-review`, {
      user,
      rating: ratings,
      comment,
      productId: selectedItem._id,
      orderId: id,
    }, { withCredentials: true }
    )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRatings(1);
        setOpen(false);
      }).catch((error) => {
        toast.error(error);
      });

  }

  const refundHandler = async () => {
    await axios.put(`${server}/order/order-refund/${id}`, {
      status: "Processing refund"
    }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };



  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("order updated");
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRatings(1);
        setOpen(false);

      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };




return (
    <div className={`py-2  ${styles.section}`}>
      <div className="  ml-99 flex items-center justify-start">
        <BsFillBagFill size={50} color="#417fa0" className="mr-4" />
        <h1 className="text-[45px] text-[#F2A533] font-[600]">
          O̳r̳d̳e̳r̳ ̳D̳e̳t̳a̳i̳l̳s̳
        </h1>
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
          <div key={item._id || index} className="w-full flex flex-col items-start mb-5">
            <div className="w-full flex items-start">
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091] ">
                  US${item.discountPrice} * {item.qty}{" "}
                </h5>
              </div>
              {item.isReviewed || data.status !== "Delivered" ? null: (
                <div className={`${styles.button} text-white`}
                  onClick={() => { setSelectedItem(item); setOpen(true); }}
                >
                  Write a review
                </div>
              )}

            </div>

            {/* ✅ Reviews for this product */}
          
          </div>
        ))}


      {/* review popup */}
      {
        open && (
          <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
            <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
              <div className="w-full flex justify-end p-3">
                <RxCross1 size={30} onClick={() => setOpen(false)}
                  className="cursor-pointer" />
              </div>
              <h2>
                Give a Review
              </h2>
              <br />
              <div className="w-full flex">
                <img src={`${selectedItem?.images[0]?.url}`}
                  alt="" className="w-[80px] h-[80px]" />
                <div>
                  <div className="pl-3 text-[20px]">
                    {selectedItem?.name}
                  </div>
                  <h4 className="pl-3 text-[20px]">
                    US${selectedItem?.discountPrice} * {selectedItem?.qty}
                  </h4>
                </div>
              </div>
              <br />
              <br />

              {/*ratings */}
              <h5 className="pl-3 text-[20px] font-[500">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex w-full ml-2 pt-1">
                {[1, 2, 3, 4, 5].map((i) => ratings >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    size={25}
                    onClick={() => setRatings(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    size={25}
                    onClick={() => setRatings(i)}
                  />
                ))}
              </div>
              <br />
              <div className="w-full ml-3">
                <label className="block text-[20px] font-[500]">
                  Write a comment
                  <span className="ml-1 font-[400] text-[16px] text-[#00000052]">(optional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your Product? write your expression about it!"
                  className="ml-2 w-[95%] border p-2 outline-none"
                ></textarea>
              </div>

              <div className={`${styles.button} text-white text-[20px] ml-3`}
                onClick={ratings > 1 ? reviewHandler : null}
              > Submit</div>
            </div>
          </div>
        )
      }

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800:flex items-center">
        <div className="w-full 800:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address</h4>
          <h4 className="pt-3 text-[20px] ">
            {data?.shippingAddress?.address1 +
              " " +
              data?.shippingAddress?.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w[40%]">
          <h4 className="pt-3 text-[20px] ">Payment Info:</h4>
          <h4>Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
          <br />

          {/* Refund Button (Fixed) */}
          {
            data?.status === "Delivered" && (
              <div className={`${styles.button} text-white`}
                onClick={refundHandler}
              >
                Give a Refund
              </div>
            )
          }
        </div>

      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} text-[#fff] `}>
          Send Message
        </div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;

