import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import { addToCart } from "../../redux/actions/cart";
import { server } from "../../server";
import "../../index.css";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search); 
  const isEvent = searchParams.get("isEvent");
  const {sellers}  = useSelector((state) => state.seller);


  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  useEffect(() => {
      if(data?.shop?._id ){
          dispatch(getAllProductsShop(data?.shop?._id));
      }
  }, [dispatch, data])

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  }

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  }

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist && wishlist.find((i) => i._id === product._id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };



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
  }


  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalReviewsLength = allProducts?.reduce(
    (acc, product) => acc + (product.reviews?.length || 0),
    0
  );

  const totalRatings = allProducts?.reduce(
    (acc, product) => acc + (product.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0),
    0
  );

  const averageRating = totalReviewsLength > 0 ? totalRatings / totalReviewsLength : 0;


  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };



  return (
    <div className="bg-white ">
      {data ? (
        <div className={`${styles.section} w-[90%]  800:w-[80%] `}>
          <div className="w-full py-5 ">
            <div className="block w-full 800:flex">
              <div className="w-[50%] 800:w-[50%]">
                <img
                  src={`${data?.images[select].url}`}
                  alt=""
                  className="w-[80%]"
                />

                <div className="flex items-center gap-2 mt-4">
                  <div
                    className={`${select === 0 ? "border" : "null"
                      } cursor-pointer `}
                  >
                    <img
                      src={`${data?.images[select].url}`}
                      alt=""
                      className="h-[150px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  >
                    <img
                      src={`${data?.images[select].url}`}
                      alt=""
                      className="h-[150px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice + "$"}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover-opacity-75 transition duration-300 ease-in-out "
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover-opacity-75 transition duration-300 ease-in-out "
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>

                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleWishlistToggle(data)}
                        color="red"
                        title="Remove From wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleWishlistToggle(data)}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}


                  </div>
                </div>

                <div
                  className={`${styles.button} !mt-6 !rounded  cursor-pointer !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data)}
                >
                  <span className="text-white flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className=" flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${sellers?.avatar?.url}`}
                      alt={data?.shop?.name || "Shop Avatar"}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px] ">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} products={allProducts} totalReviewsLength={totalReviewsLength} averageRating={averageRating} />
        </div>
      ) : null}
    </div>
  );
};


const ProductDetailsInfo = ({ data, products, totalReviewsLength, totalRatings, averageRating }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>


      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full  min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {(
            data?.reviews || []).map((item, index) => (
              <div className="w-full flex my-2" key={index}>
                <img 
                src={`${item?.user?.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className=" font-[500] mr-1">{item.user.name}</h1>
                    <Ratings ratings={data?.ratings} />
                  </div>
                  <p>
                    {item.comment}
                  </p>
                </div>
              </div>
            ))
          }

          <div className="w-full flex justify-center">
            {data?.reviews?.length === 0 && (
              <h5>
                No reviews have for this product
              </h5>
            )
            }
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800:flex p-5">
          <div className="w-full 800:w-[50%]">
            <Link to={`/shop/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt={data?.shop?.name || "Seller Avatar"}
                />


                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    {averageRating}/5 Ratings{" "}
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">
              {data.shop.description}
            </p>
          </div>
          <div className="w-full 800:w-[50%] mt-5 800:mt-0 800:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on : <span className="font-[500]">
                  {data?.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600]">
                Total Products : <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews : <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white "> Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
















