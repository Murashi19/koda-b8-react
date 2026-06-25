import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";

import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import WishlistContext from "./context/WishlistContext";
import ModalContext from "./context/ModalContext";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const { updateUserById } = useLocalStorage("users");
	// Auth
	const [auth, setAuthState] = useState(() => {
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		return users.find((u) => u.isLogin) || null;
	});

	const setAuth = (user) => {
		if (user) {
			const normalized = { ...user, isLogin: true };
			setAuthState(normalized);
		} else {
			const normalized = { ...user, isLogin: false };
			setAuthState(normalized);
		}
	};

	const updateAuth = (partialUpdate) => {
		if (!auth) return;

		const updatedUser = {
			...auth,
			...partialUpdate,
		};

		setAuthState(updatedUser);
		updateUserById(updatedUser);
	};

	// Modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const showLoginModal = (message = "") => {
		setModalMessage(message);
		setModalVisible(true);
	};

	const hideLoginModal = () => {
		setModalVisible(false);
		setModalMessage("");
	};

	const cart = auth?.cart ?? [];
	const wishlist = auth?.wishlist ?? [];

	// Cart logic
	const addToCart = (product, qty = 1) => {
		if (!auth) {
			showLoginModal("Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.");
			return false;
		}
		const existing = cart.find((item) => item.id === product.id);
		const updatedCart = existing ? cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item)) : [...cart, { ...product, qty }];
		updateAuth({
			cart: updatedCart,
		});
		return true;
	};

	const removeFromCart = (productId) => {
		if (!auth) return;
		updateAuth({ cart: cart.filter((item) => item.id !== productId) });
	};

	const updateCartQty = (productId, qty) => {
		if (!auth || qty < 1) return;
		updateAuth({
			cart: cart.map((item) => (item.id === productId ? { ...item, qty } : item)),
		});
	};

	const isInCart = (productId) => cart.some((item) => item.id === productId);

	const clearCart = () => {
		if (!auth) return;
		updateAuth({ cart: [] });
	};

	// Wishlist logic
	const isWishlisted = (productId) => wishlist.some((item) => item.id === productId);

	const toggleWishlist = (product) => {
		if (!auth) {
			showLoginModal("Silakan login terlebih dahulu untuk menyimpan produk ke wishlist.");
			return false;
		}
		const updatedWishlist = isWishlisted(product.id) ? wishlist.filter((item) => item.id !== product.id) : [...wishlist, product];
		updateAuth({
			wishlist: updatedWishlist,
		});
		return true;
	};

	const removeFromWishlist = (productId) => {
		if (!auth) return;
		updateAuth({
			wishlist: wishlist.filter((item) => item.id !== productId),
		});
	};

	const clearWishlist = () => {
		if (!auth) return;
		updateAuth({ wishlist: [] });
	};

	// Order logic
	const placeOrder = (orderData) => {
		if (!auth) return false;

		const newOrder = {
			orderId: `ORD-${Date.now()}`,
			userId: auth.id,
			userName: auth.name,
			...orderData,
		};

		const existingOrders = JSON.parse(localStorage.getItem("orders") ?? "[]");
		localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

		updateAuth({
			orders: [...(auth.orders ?? []), newOrder.orderId],
			cart: [],
		});

		return newOrder;
	};

	return (
		<PersistGate
			loading={null}
			persistor={persistor}>
			<Provider store={store}>
				<ModalContext.Provider value={{ modalVisible, showLoginModal, hideLoginModal, modalMessage }}>
					<AuthContext.Provider value={{ auth, setAuth, updateAuth, placeOrder }}>
						<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQty, isInCart, clearCart }}>
							<WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isWishlisted, clearWishlist }}>
								<RouterProvider router={router} />
							</WishlistContext.Provider>
						</CartContext.Provider>
					</AuthContext.Provider>
				</ModalContext.Provider>
			</Provider>
		</PersistGate>
	);
}

export default App;
