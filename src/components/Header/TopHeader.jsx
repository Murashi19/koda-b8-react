import { MapPin, Phone, Van } from "lucide-react";

function TopHeader() {
	return (
		<>
			<div className='w-full bg-[#1a73e8] py-3'>
				<div className='max-w-7xl mx-auto flex'>
					<div className='w-1/2 flex'>
						<div className='w-full flex gap-3 text-white'>
							<span>
								<MapPin />
							</span>
							<span>Kirim ke: Jakarta Selatan</span>
						</div>
					</div>
					<div className='w-1/2 flex items-center text-white'>
						<div className='w-full flex justify-center gap-3'>
							<span>
								<Phone />
							</span>
							<span>0800-1234-5678 (Gratis)</span>
						</div>
						<div className='w-full flex justify-start gap-3'>
							<span>
								<Van />
							</span>
							<span>Gratis Ongkir di atas Rp 100.000</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TopHeader;
