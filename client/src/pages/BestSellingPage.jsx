
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const BestSellingPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  const bestSellingProducts = allProducts
    ? [...allProducts].sort((a, b) => b.total_sell - a.total_sell)
    : [];

  return (
    <div>
      <Header />

      <div className="w-[90%] 800:w-[80%] mx-auto py-8">
        <h1 className="text-4xl text-[#417fa0] font-bold mb-8">Best Selling Products</h1>

        {bestSellingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BestSellingPage;
