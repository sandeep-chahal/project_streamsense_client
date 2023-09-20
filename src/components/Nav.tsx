import { useStore } from "../context/main";

const Nav = () => {
	const { setLoginPopup, user } = useStore();
	return (
		<nav className="px-64 py-4">
			<div className="flex items-center justify-between">
				{/* Left */}
				<h1 className="font-bold text-2xl">StreamSense</h1>
				{/* Center */}
				<ul className="flex items-center justify-center">
					<li className="px-3">
						<a href="#faqs">Faqs</a>
					</li>
					<li className="px-3">
						<a href="#pricing">Pricing</a>
					</li>
					<li className="px-3">
						<a href="#extension">Extension</a>
					</li>
				</ul>
				{/* Right */}
				<div className="flex items-center justify-center">
					{/* credits */}
					<div className="px-3 text-black2 font-bold drop-shadow-md cursor-pointer bg-white rounded-md">
						{user?.credits || "$0.0"}
					</div>
					<div className="px-3 ml-5 text-black2 font-bold">
						<button
							className="capitalize"
							onClick={() => {
								setLoginPopup((state) => !state);
							}}
						>
							{user?.name || "Login"}
						</button>
					</div>
				</div>
			</div>
			{/* border lines */}
			<div className="mt-4">
				<div className="bg-red w-full h-[1px] mb-[1px]"></div>
				<div className="bg-green w-full h-[1px] mb-[1px]"></div>
				<div className="bg-yellow w-full h-[1px] mb-[1px]"></div>
			</div>
		</nav>
	);
};

export default Nav;
