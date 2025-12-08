import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "../styles/styles";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product.js";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../redux/actions/event.js";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allevents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (eventData) {
      if (allevents && allevents.length > 0) {
        const event = allevents.find((i) => i._id === id);
        setData(event);
      }
    } else {
      if (allProducts && allProducts.length > 0) {
        const product = allProducts.find((i) => i._id === id);
        setData(product);
      }
    }
  }, [allProducts, eventData, id, allevents]);



  console.log(data, "data");
  console.log(allevents, "allevents");
  console.log(allProducts, "allProducts");


  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {
        !eventData && (
          <>
            {data && <SuggestedProduct data={data} />}
          </>
        )
      }
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
