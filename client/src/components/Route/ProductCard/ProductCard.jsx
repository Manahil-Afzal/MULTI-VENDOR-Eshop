import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { AiFillAlert, AiFillHeart } from "react-icons/ai";
import { AiFillStar, AiOutlineStar, AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import Ratings from "../../Products/Ratings";


const ProductCard = ({ data, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { Wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (Wishlist && Wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [Wishlist])


  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  }

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  }


  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!")
    }
    else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 }
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!")
      }
    }
  };
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
          }`} >
          <img
            src={`${data?.images[0].url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />

        </Link>
        <Link to={`/shop/preview/${data.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500] ">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
        </Link>

        <div className="flex">
          <Ratings ratings={data?.ratings} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.OriginalPrice === 0 ?
                data.OriginalPrice
                : data.discountPrice}
              $
            </h5>
            <h4 className={`${styles.price}`}>
              {data.OriginalPrice ? data.OriginalPrice + "" : null}$
            </h4>
          </div>
          <span className="font=[400] text-[12px] text-[#68d284]">
            {data?.sold_out} sold
          </span>
        </div>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove From wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {
            open && (
              <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
            )
          }

        </div>
      </div>
    </>
  );
};

export default ProductCard;
