

import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import '../../index.css';



const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = Number(String(item.discountPrice).replace(/\$/g, '')) || 0;
    return acc + price * item.qty;
  }, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  }



  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed  top-0 right-0 h-screen w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {
          cart && cart.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <h5>Cart Items is empty!</h5>
            </div>
          ) : (
            <>
              <div className="overflow-y-auto h-full">
                <div className="flex  w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenCart(false)}
                  />
                </div>

                {/* items length */}
                <div className={`${styles.normalFlex} p-4`}>
                  <IoBagHandleOutline size={25} />
                  <h5 className="pl-2 text-[20px] font-[500] ">{cart && cart.length} items</h5>
                </div>
                {/* cart single items */}
                <br />
                <div className="w-full border-t">
                  {cart &&
                    cart.map((i, index) =>
                      <CartSingle
                        key={index}
                        data={i}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />)}
                </div>
              </div>
              <div className="px-5 mb-3">
                {/* checkout buttons */}
                <Link to="/checkout">
                  <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#F2A533] rounded-[5px] `}>
                    <h1 className="text-#fff text-[18px] font-[600]"
                    >Checkout Now (USD${totalPrice}) </h1>
                  </div>
                </Link>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const price = Number(String(data.discountPrice).replace(/\$/g, '')) || 0;
  const totalPrice = price * value;

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error("Product stock limited!");
    } else {
      const newQty = value + 1;
      setValue(newQty);
      const updateCartData = { ...data, qty: newQty };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    if (value > 1) {
      const newQty = value - 1;
      setValue(newQty);
      const updateCartData = { ...data, qty: newQty };
      quantityChangeHandler(updateCartData);
    } else {
      toast.info("Minimum quantity is 1!");
    }
  };

  return (
    <div className=" border p-4 ">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#F2A533] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex}`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[80px] h-min ml-2 mr-2 rounded-[5px]" />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">{data.discountPrice} * {value}</h4>
          <h4 className="font-[600] text-[17px] pt-[3px] bg-[#F2A533] font-Roboto">
            USD${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />

      </div>
    </div>
  );
};
export default Cart;
