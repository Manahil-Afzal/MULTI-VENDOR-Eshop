import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState(null); 
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { id} = useParams();


  // Fetch all products if not already fetched
  useEffect(() => {
      dispatch(getAllProducts());
  }, [dispatch]);

  // Filter/sort products
  useEffect(() => {
       if(categoryData === null) {
           const data = allProducts && [...allProducts].sort((a,b) => a.sold_out - b.sold_out )
           setData(data);
       }  else{
          const data = allProducts && allProducts.filter((i) => i.category === categoryData )
           setData(data);
       }
  }, [allProducts]);

  return (
      <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section} lg:py-0 py-10`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full font-extrabold text-[#F2A533] text-4xl pb-[100px]">
            No Products Found
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;



