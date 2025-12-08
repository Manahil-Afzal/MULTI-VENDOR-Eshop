import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.products);
   const [data, setData] = useState([]);


  useEffect(() => {
    if (allProducts.length > 0) {
      const firstFive = allProducts.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);


  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="text-[#417fa0] font-bold text-3xl">
            Best Deals
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[10px] mb-12 border-0 ">
          {
            data && data.length !== 0 && (
              <>
                {data && data.map((product) => <ProductCard data={product} key={product._id} />)}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;


