import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonMessage from "../components/ButtonMessage";
import ProgressBar from "../components/ProgressBar";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutLayout() {
	const location = useLocation();

	const getCurrentStep = () => {
		switch (location.pathname) {
			case "/checkout/step1":
				return 1;

			case "/checkout/step2":
				return 2;

			case "/checkout/step3":
				return 3;

			case "/checkout/success":
				return 4;

			default:
				return 1;
		}
	};

	return (
		<>
			<Header />
			<ButtonMessage />

			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto flex flex-col items-center gap-8 px-4 py-8'>
					<ProgressBar currentStep={getCurrentStep()} />

					<div className='flex flex-row items-start gap-8 w-full'>
						<Outlet />

						<OrderSummary />
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}
