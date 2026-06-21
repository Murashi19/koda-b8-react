import { IoChatbubbleOutline } from "react-icons/io5";

function ButtonMessage() {
	return (
		<>
			<button
				type='button'
				aria-label='Chat'
				className='fixed right-8 bottom-8 w-14 h-14 rounded-full bg-[#1a73e8] hover:bg-[#0d63e4] flex items-center justify-center cursor-pointer border-none z-20 transition-colors duration-200'>
				<IoChatbubbleOutline className='w-5 h-5 text-white' />
			</button>
		</>
	);
}

export default ButtonMessage;
