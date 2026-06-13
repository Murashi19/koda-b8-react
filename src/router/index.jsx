// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom"; // Pastikan package sesuai

import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import LandingPage from "../pages/LandingPage";
import BrowseProduct from "../pages/BrowseProduct";

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
]);
