import { XIcon } from "lucide-react";

const LoginPopup = () => {
	return (
		<div className="fixed w-full h-full bg-black bg-opacity-20 z-50">
			<div className="bg-white w-2/5 p-4 rounded-lg relative top-[50%] left-[50%] c-center">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-bold">Login</h2>
					<XIcon className="" />
				</div>
				<form className="mt-8">
					<input className="w-full bg-primary border-2 border-yellow p-2" placeholder="Email" />
					<input
						className="w-full bg-primary border-2 border-yellow p-2 mt-6"
						placeholder="Password"
					/>
					<div className="flex ">
						<button className="mt-8 p-2 bg-red text-white font-bold w-5/6">Login</button>
						<button className="mt-8 p-2 bg-red text-white font-bold w-5/6">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPopup;
