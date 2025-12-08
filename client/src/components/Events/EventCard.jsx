import React, { useState } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { backend_url } from "../../server";

const EventCard = ({ active, data }) => {
  if (!data) return null;

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {id} = useState();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full bg-white shadow-lg hover:shadow-6xl rounded-3xl transition-shadow duration-900 p-5 mb-6 
      ${active ? "unset" : "mb-12"} lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${data?.images[0]?.url}`}
          alt={data.name}
          className="w-full h-[300px] object-contain"
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className="text-[22px] font-[700] text-[#333]">{data.name}</h2>
        <p>
          {data.description
            ? data.description.split(" ").slice(0, 50).join(" ") + "..."
            : ""}
        </p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>

        <CountDown data={data} />

        <div className="flex items-center mt-4">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
