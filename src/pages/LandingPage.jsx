// COMPONENT
import Header from "../components/Header";
import ButtonMessage from "../components/ButtonMessage";
import Footer from "../components/Footer";

// CONTENT MAIN
import HeroSection from "../components/Content/HeroSection";
import CategorySection from "../components/Content/CategorySection";
import FlashDeal from "../components/Content/FlashSection";
import CardPromotion from "../components/Content/PromotionSection";
import NewProduct from "../components/Content/NewProductSection";
import BestProduct from "../components/Content/BestProductSection";
import AdvantageSection from "../components/Content/AdvantageSection";

function LandingPage() {
	return (
		<>
			<Header className='fixed' />
			<ButtonMessage />
			<main className='bg-[#f3f4f6] min-h-max w-full flex flex-col gap-10'>
				<HeroSection />
				<CategorySection />
				<FlashDeal />
				<CardPromotion />
				<NewProduct />
				<BestProduct />
				<AdvantageSection />
			</main>
			<Footer />
		</>
	);
}

export default LandingPage;
