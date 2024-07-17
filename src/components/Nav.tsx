import { useStore } from "../context/main";
import { useState } from "react";
import PaymentPopup from "./PaymentPopup";
import { logout, deleteAccount } from "../services/authentication";

const Nav = () => {
	const { setLoginPopup, user } = useStore();

	const [showPaymentPopup, setShowPaymentPopup] = useState(0);

	const handleLogout = async () => {
		const data = await logout();
		if (data.success) {
			window.location.reload();
		} else {
			alert(data.error);
		}
	};
	const handleDeleteAccount = async () => {
		// ask for confirmation
		if (!confirm("Are you sure you want to delete your account?")) return;
		const data = await deleteAccount();
		if (data.success) {
			window.location.reload();
		} else {
			alert(data.error);
		}
	};

	return (
		<nav className="px-64 py-4">
			{!!showPaymentPopup && (
				<PaymentPopup amount={showPaymentPopup} close={() => setShowPaymentPopup(0)} />
			)}
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
					<div
						className="px-3 text-black2 font-bold drop-shadow-md cursor-pointer bg-white rounded-md"
						onClick={() => {
							const amount = parseFloat(prompt("Enter amount in USD!"));
							if (amount) setShowPaymentPopup((open) => amount);
						}}
					>
						{user?.credit ? "$" + user?.credit?.toFixed(2) : "$0.0"}
					</div>
					<div className="px-3 ml-5 text-black2 font-bold relative group">
						<button
							className="capitalize flex items-center"
							onClick={() => {
								if (!user?.name) setLoginPopup((state) => !state);
							}}
						>
							{user?.name || "Login"}
							{user?.name ? (
								<svg
									className="w-2.5 h-2.5 ms-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 4 4 4-4"
									/>
								</svg>
							) : null}
						</button>

						<div
							id="dropdown"
							className={`z-10 hidden ${
								user?.name ? "group-hover:block" : null
							} bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute left-0 top-[100%]`}
						>
							<ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
								<li>
									<button
										onClick={handleDeleteAccount}
										className="block w-full px-4 py-2 hover:bg-gray-100"
									>
										Delete Account
									</button>
								</li>
								<li>
									<button
										onClick={handleLogout}
										className="block w-full px-4 py-2 hover:bg-gray-100"
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
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
