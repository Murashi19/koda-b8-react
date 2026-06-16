import { CircleCheckBig, Truck } from "lucide-react";

export default function StatusBadge({ status }) {
	if (status === "sent") {
		return (
			<span className='flex items-center gap-1.5 bg-gray-200 rounded-full px-3 py-1 text-xs text-green-600'>
				<CircleCheckBig
					className='w-3 h-3 text-green-600'
					strokeWidth={2}
				/>
				Terkirim
			</span>
		);
	}
	return (
		<span className='flex items-center gap-1.5 bg-gray-200 rounded-full px-3 py-1 text-xs text-[#1a73e8]'>
			<Truck
				className='w-3 h-3 text-[#1a73e8]'
				strokeWidth={2}
			/>
			Dikirim
		</span>
	);
}
