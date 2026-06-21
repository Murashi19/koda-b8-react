// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom"; // Pastikan package sesuai

// Auth
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import LandingPage from "../pages/LandingPage";
import BrowseProduct from "../pages/BrowseProduct";
import DetailPage from "../pages/DetailPage";
import Cart from "../pages/Cart";

// Checkout
import CheckoutStep1 from "../pages/Checkout/Step1";
import CheckoutStep2 from "../pages/Checkout/Step2";
import CheckoutStep3 from "../pages/Checkout/Step3";
import CheckoutSuccess from "../pages/Checkout/Success";

// Profile
import MyOrder from "../pages/Profile/MyOrder";
import Wishlist from "../pages/Profile/Wishlist";
import AddressList from "../pages/Profile/AddressList";
import EditProfile from "../pages/Profile/EditProfile";
import AdminDashboard from "../pages/Admin/Dashboard";
import ProductList from "../pages/Admin/ProductList";
import OrderList from "../pages/Admin/OrderList";
import CustomerList from "../pages/Admin/Customers";
import CheckOutLayout from "../pages/CheckOutLayout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/browse-product",
		element: <BrowseProduct />,
	},
	{
		path: "/browse-product/:slug",
		element: <BrowseProduct />,
	},
	{
		path: "/auth/register",
		element: <Register />,
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/forgot-password",
		element: <ForgotPassword />,
	},
	{
		path: "/detail-page",
		element: <DetailPage />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/checkout",
		element: <CheckOutLayout />,
		children: [
			{
				path: "/checkout/step1",
				element: <CheckoutStep1 />,
			},
			{
				path: "/checkout/step2",
				element: <CheckoutStep2 />,
			},
			{
				path: "/checkout/step3",
				element: <CheckoutStep3 />,
			},
		],
	},
	{
		path: "/success",
		element: <CheckoutSuccess />,
	},
	{
		path: "/profile/my-orders",
		element: <MyOrder />,
	},
	{
		path: "/profile/wishlist",
		element: <Wishlist />,
	},
	{
		path: "/profile/address-list",
		element: <AddressList />,
	},
	{
		path: "/profile/edit-profile",
		element: <EditProfile />,
	},
	{
		path: "/admin/dashboard",
		element: <AdminDashboard />,
	},
	{
		path: "/admin/produk-list",
		element: <ProductList />,
	},
	{
		path: "/admin/order-list",
		element: <OrderList />,
	},
	{
		path: "/admin/customers",
		element: <CustomerList />,
	},
]);
