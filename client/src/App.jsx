import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage
} from "./routes/Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser, loadSeller } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import SellerDashboardPage from "./pages/Shop/ShopDashboardPage.jsx";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage.jsx";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct.jsx";
import ShopPage from "./pages/Shop/ShopHomePage.jsx";
import ShopAllProducts from "./pages/Shop/ShopAllProducts.jsx";
import ShopCreateEvents from "./pages/Shop/ShopCreateEvents.jsx";
import ShopAllEvents from "./pages/Shop/ShopAllEvents.jsx";
import ShopAllCoupons from "./pages/Shop/ShopAllCoupons.jsx";
import { getAllEvents } from "./redux/actions/event.js";
import { getAllProducts } from "./redux/actions/product";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShopAllOrders from "./pages/Shop/ShopAllOrders.jsx";
import ShopOrderDetails from "./pages/Shop/ShopAllDetails.jsx";
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage.jsx";
import OrderDetails from "./components/Shop/OrderDetails.jsx";
import TrackOrderPage from "./pages/TrackOrderPage";
import UserInbox from "./components/Inbox/UserInbox";
import ShopAllRefunds from "./pages/Shop/ShopAllRefunds";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage"
import ShopWithDrawMoneyPage from "./pages/Shop/ShopWithDrawMoneyPage.jsx";
import ShopInboxPage from "./pages/Shop/ShopInboxPage.jsx";
import { AdminDashboardPage, AdminDashboardUsers, AdminDashboardSellers, AdminDashboardOrders, AdminDashboardProducts, AdminDashboardEvents, AdminDashboardWithdraw } from "./routes/AdminRoutes";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ShopActivationPage from "./components/Shop/ShopActivationPage.jsx";


const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  const [stripeApiKey, setStripeApiKey] = useState("");


  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);


  return (
    <>

      <Routes>
        <Route
          path="/payment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
         <Route
          path="/seller/activation/:activation_token"
          element={<ShopActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/checkout"
          element={

            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />

        {/* Shop Routes */}
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute isSeller={isSeller}>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopAllCoupons />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        } />


        <Route path="/admin-users" element={
          <ProtectedAdminRoute>
            <AdminDashboardUsers />
          </ProtectedAdminRoute>
        } />

         <Route path="/admin-sellers" element={
          <ProtectedAdminRoute>
            <AdminDashboardSellers />
          </ProtectedAdminRoute>
        } />

          <Route path="/admin-orders" element={
          <ProtectedAdminRoute>
            <AdminDashboardOrders />
          </ProtectedAdminRoute>
        } />

         <Route path="/admin-products" element={
          <ProtectedAdminRoute>
            <AdminDashboardProducts />
          </ProtectedAdminRoute>
        } />

         <Route path="/admin-events" element={
          <ProtectedAdminRoute>
            <AdminDashboardEvents />
          </ProtectedAdminRoute>
        } />


          <Route path="/admin-withdraw-request" element={
          <ProtectedAdminRoute>
            <AdminDashboardWithdraw />
          </ProtectedAdminRoute>
        } />


      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
