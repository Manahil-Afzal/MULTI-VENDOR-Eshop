import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { toast } from "react-toastify";


const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const totalPrice = wishlist.reduce((acc, item) => {
  const price = Number(String(item.discountPrice).replace(/\$/g, '')) || 0;
  return acc + price * item.qty;
}, 0);


  const addToCartHandler = (data) =>{
     const newData = {...data, qty:5};
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  }
  

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 overflow-y-auto h-screen w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {
          wishlist && wishlist.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <h5>Wishlist Items is empty!</h5>
            </div>
          ) : (
            <>
              <div>
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenWishlist(false)}
                  />
                </div>

                {/* items length */}
                <div className={`${styles.normalFlex} p-4`}>
                  <AiOutlineHeart size={25} />
                  <h5 className="pl-2 text-[20px] font-[500] ">{wishlist && wishlist.length} items</h5>
                </div>
                {/* cart single items */}
                <br />
                <div className="w-full border-t">
                  {wishlist &&
                    wishlist.map((i, index) => <CartSingle key={index} data={i} 
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                    />)}
                </div>
              </div>
            </>

          )
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler}) => {
  const [value, setValue] = useState(1);
  // const totalPrice = data.discountPrice * value;

  const price = Number(String(data.discountPrice).replace(/\$/g, '')) || 0;
  const totalPrice = price * value;
  
    const increment = (data) => {
      if (data.stock < value) {
        toast.error("Product stock limited!");
      } else {
        setValue(value + 1);
        const updateCartData = { ...data, qty: value + 1 };
        quantityChangeHandler(updateCartData);
      }
  
    };
  
    const decrement = (data) => {
      setValue(value === 1 ? 1 : value - 1);
      const updateCartData = {
        ...data, qty:
          value === 1 ? 1 : value - 1
      };
      removeFromCartHandler(updateCartData);
    }


  return (
    <div className=" border p-4 ">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" 
           onClick={() => removeFromWishlistHandler(data)}
        />
        <img 
         src={`${data?.images[0]?.url}`}
         className="w-[80px] h-min ml-2 mr-2 rounded-[5px]" />


        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] bg-[#F2A533] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to Cart" 
             onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;


