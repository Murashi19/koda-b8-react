import Item1 from "../assets/product1.png";
import Item2 from "../assets/product2.png";
import Item3 from "../assets/product3.png";
import Item4 from "../assets/product4.png";
import NewProduct1 from "../assets/new-product1.png";
import NewProduct2 from "../assets/new-product2.png";
import NewProduct3 from "../assets/new-product3.png";
import NewProduct4 from "../assets/new-product4.png";
import NewProduct5 from "../assets/new-product5.png";
import BestProduct1 from "../assets/best-product1.png";

export const products = [
    {
        id: 1,
        brand: "SoundWave",
        name: "Headphone Wireless Premium",
        image: Item1,
        category: "Elektronik",
        badge: "-31%",
        badgeType: "discount",
        rating: 4.8,
        review: 512,
        discountPrice: "Rp 450.000",
        regularPrice: "Rp 650.000",
        tags: ["flash", "best"],
        stock: 45,
        badges: ["new", "featured", "promo"],
    },
    {
        id: 2,
        brand: "PhoneX",
        name: "Smartphone 5G Ultra",
        image: Item2,
        category: "Elektronik",
        badge: "-16%",
        badgeType: "discount",
        rating: 4.6,
        review: 890,
        discountPrice: "Rp 4.200.000",
        regularPrice: "Rp 5.000.000",
        tags: ["flash", "best"],
        stock: 8,
        badges: ["featured", "promo"],
    },
    {
        id: 3,
        brand: "UrbanBag",
        name: "Tas Ransel Laptop Waterproof",
        image: NewProduct1,
        category: "Fashion",
        badge: "Baru",
        badgeType: "new",
        rating: 4.5,
        review: 234,
        discountPrice: "Rp 350.000",
        regularPrice: null,
        tags: ["new"],
        stock: 28,
        badges: ["new"],
    },
    {
        id: 4,
        brand: "BlendPro",
        name: "Blender Portable Mini",
        image: NewProduct2,
        category: "Peralatan Rumah",
        badge: "Baru",
        badgeType: "new",
        rating: 4.2,
        review: 567,
        discountPrice: "Rp 189.000",
        regularPrice: null,
        tags: ["new"],
        stock: 50,
        badges: ["new"],
    },
    {
        id: 5,
        brand: "TabTech",
        name: 'Tablet 10.5" WiFi + 4G',
        image: NewProduct3,
        category: "Elektronik",
        badge: "-20%",
        badgeType: "discount",
        rating: 4.5,
        review: 345,
        discountPrice: "Rp 3.200.000",
        regularPrice: "Rp 4.000.000",
        tags: ["new"],
        stock: 9,
        badges: ["new", "promo"],
    },
    {
        id: 6,
        brand: "FashionID",
        name: "Dress Floral Midi",
        image: NewProduct4,
        category: "Fashion",
        badge: "-25%",
        badgeType: "discount",
        rating: 4.5,
        review: 312,
        discountPrice: "Rp 295.000",
        regularPrice: "Rp 395.000",
        tags: ["best"],
        stock: 40,
        badges: ["featured", "promo"],
    },
    {
        id: 7,
        brand: "AromaWell",
        name: "Minyak Esensial Lavender Set",
        image: NewProduct5,
        category: "Kesehatan & Kecantikan",
        badge: "Baru",
        badgeType: "new",
        rating: 4.8,
        review: 456,
        discountPrice: "Rp 145.000",
        regularPrice: null,
        tags: ["new"],
        stock: 65,
        badges: ["new"],
    },
    {
        id: 8,
        brand: "WristTech",
        name: "Smartwatch Series 5",
        image: Item3,
        category: "Elektronik",
        badge: "-20%",
        badgeType: "discount",
        rating: 4.4,
        review: 324,
        discountPrice: "Rp 2.800.000",
        regularPrice: "Rp 3.500.000",
        tags: ["flash", "best"],
        stock: 22,
        badges: ["featured", "promo"],
    },
    {
        id: 9,
        brand: "SportPro",
        name: "Sneakers Sport Runfast",
        image: Item4,
        category: "Olahraga",
        badge: "-27%",
        badgeType: "discount",
        rating: 4.6,
        review: 445,
        discountPrice: "Rp 550.000",
        regularPrice: "Rp 750.000",
        tags: ["flash", "best"],
        stock: 35,
        badges: ["featured", "promo"],
    },
    {
        id: 10,
        brand: "BrewMaster",
        name: "Coffee Maker Otomatis",
        image: BestProduct1,
        category: "Peralatan Rumah",
        badge: "-27%",
        badgeType: "discount",
        rating: 4.4,
        review: 189,
        discountPrice: "Rp 875.000",
        regularPrice: "Rp 1.200.000",
        tags: ["best"],
        stock: 15,
        badges: ["featured", "promo"],
    },
];

const totalProduk = products.length;

const produkBaru = products.filter((p) =>
    p.badges.includes("new")
).length;

const stokRendah = products.filter((p) =>
    p.stock <= 10
).length;

const produkPromo = products.filter((p) =>
    p.badges.includes("promo")
).length;

export const summaryCards = [
    { value: totalProduk, label: "Total Produk" },
    { value: produkBaru, label: "Produk Baru" },
    { value: stokRendah, label: "Stok Rendah" },
    { value: produkPromo, label: "Produk Promo" },
];

export default products