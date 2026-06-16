import { ShoppingBag, Heart, MapPin, CreditCard, Settings } from "lucide-react"

export const navItems = [
    { id: "orders", icon: ShoppingBag, label: "Pesanan saya", color: "text-[#1a73e8]", route: "/profile/my-orders" },
    { id: "wishlist", icon: Heart, label: "Wishlist", color: "text-gray-500", route: "/profile/wishlist" },
    { id: "address", icon: MapPin, label: "Alamat Saya", color: "text-gray-500", route: "/profile/address-list" },
    { id: "payment", icon: CreditCard, label: "Metode Pembayaran", color: "text-gray-500", route: "/profile/payment" },
    { id: "settings", icon: Settings, label: "Pengaturan Profile", color: "text-gray-500", route: "/profile/edit-profile" },
];