



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "../../../redux/actions/product";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
       dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
             <h1 className="text-[#417fa0] font-bold text-3xl">
                Featured Products
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[10px] mb-12 border-0">
          {
            allProducts && allProducts.length !== 0 && (
              <>
                {allProducts && allProducts.map((product) => <ProductCard data={product} key={product._id} />)}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;