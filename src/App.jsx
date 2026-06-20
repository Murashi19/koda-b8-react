import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";
import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import WishlistContext from "./context/WishlistContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const [auth, setAuth] = useLocalStorage("auth", null);
	const [cart, , updateCart] = useLocalStorage("cart", []);
	const [wishlist, , updateWishlist] = useLocalStorage("wishlist", []);

	// ===== Cart logic =====
	const addToCart = (product, qty = 1) => {
		const existing = cart.find((item) => item.id === product.id);

		if (existing) {
			const updated = cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item));
			updateCart(updated);
		} else {
			updateCart([...cart, { ...product, qty }]);
		}
	};

	const removeFromCart = (productId) => {
		updateCart(cart.filter((item) => item.id !== productId));
	};

	const updateCartQty = (productId, qty) => {
		if (qty < 1) return;
		updateCart(cart.map((item) => (item.id === productId ? { ...item, qty } : item)));
	};

	const isInCart = (productId) => cart.some((item) => item.id === productId);

	const clearCart = () => updateCart([]);

	// ===== Wishlist logic =====
	const isWishlisted = (productId) => wishlist.some((item) => item.id === productId);

	const toggleWishlist = (product) => {
		if (isWishlisted(product.id)) {
			updateWishlist(wishlist.filter((item) => item.id !== product.id));
		} else {
			updateWishlist([...wishlist, product]);
		}
	};

	const removeFromWishlist = (productId) => {
		updateWishlist(wishlist.filter((item) => item.id !== productId));
	};

	const clearWishlist = () => updateWishlist([]);

	return (
		<>
			<AuthContext.Provider value={{ auth, setAuth }}>
				<CartContext.Provider
					value={{
						cart,
						addToCart,
						removeFromCart,
						updateCartQty,
						isInCart,
						clearCart,
					}}>
					<WishlistContext.Provider
						value={{
							wishlist,
							toggleWishlist,
							removeFromWishlist,
							isWishlisted,
							clearWishlist,
						}}>
						<RouterProvider router={router} />
					</WishlistContext.Provider>
				</CartContext.Provider>
			</AuthContext.Provider>
		</>
	);
}

export default App;
