


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
    return <Navigate to="/" replace />;
    // return Null;
  }

  return children;
}
};