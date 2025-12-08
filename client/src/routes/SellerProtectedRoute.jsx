// import React from "react";
// import { Navigate } from "react-router-dom";

// const SellerProtectedRoute = ({ isSeller, children }) => {
//     console.log(isSeller);
//     if (!isSeller) {
//         // return <Navigate to= {`/`} replace />
//         return null;
//     }
//     return children;
// }
// export default SellerProtectedRoute;





// / components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader.jsx";


export default function SellerProtected({ children }) {
  const { seller, isSeller, loading } = useSelector((state) => state.seller);

  if (loading === true) {
    return (
        <Loader/>
    );
  } else {
  if (!isSeller) {
    return <Navigate to="/login" replace />;
    // return Null;
  }

  return children;
}
};