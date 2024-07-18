import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { IUser, useStore } from "../context/main";
import { handleUserData, validateLoginForum } from "../services/utils";
import { handleAuth } from "../services/authentication";

interface IError {
	error: boolean;
	message: string;
}

const LoginPopup = () => {
	const { setLoginPopup, setUser } = useStore();
	const [mode, setMode] = useState(1); //1 for login, 2 for signup
	const [name, setName] = useState("");
	const [email, setEmail] = useState(import.meta.env.DEV ? "test@gmail.com" : "");
	const [password, setPassword] = useState(import.meta.env.DEV ? "Password@12" : "");
	const [error, setError] = useState<IError | null>(null);

	const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setError(null);
		const error = validateLoginForum(email, password, null);
		setError(error);
		if (error.error) return;
		const response = await handleAuth("login", email, password);
		await afterMath(response);
	};
	const handleRegisterClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setError(null);
		const error = validateLoginForum(email, password, name);
		setError(error);
		if (error.error) return;
		const response = await handleAuth("signup", email, password, name);
		await afterMath(response);
	};

	const afterMath = async (response: APIResponse) => {
		setLoginPopup(false);
		setError({
			error: !response.success,
			message: response?.error || "",
		});
		const user = response?.data?.user;
		handleUserData(user, setUser);
		console.log(response);
	};

	return (
		<div className="fixed top-0 w-full h-full bg-black bg-opacity-20 z-50">
			<div className="bg-white w-4/5 md:w-96 p-4 rounded-lg relative  c-center">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-bold">{mode === 1 ? "Login" : "Register"}</h2>
					<XIcon className="cursor-pointer" onClick={() => setLoginPopup(false)} />
				</div>
				<p className="mt-2">
					{mode === 1
						? "Login to your account"
						: "Register to create an account and start using our services"}
				</p>
				<form className="mt-8">
					{mode === 2 && (
						<input
							type="text"
							required
							className="w-full border-2 border-yellow p-2 mb-6"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					)}
					<input
						type="email"
						required
						className="w-full border-2 p-2"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						className="w-full border-2  p-2 mt-6"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error?.error ? <div className="text-red mt-4 text-sm">{error?.message}</div> : null}
					<div className="flex flex-col">
						<button
							onClick={(e) => (mode === 1 ? handleLoginClick(e) : handleRegisterClick(e))}
							className="mt-8 p-2 bg-red text-white font-bold transition-all rounded-md hover:shadow-md "
						>
							{mode === 1 ? "Login" : "Register"}
						</button>
						<div
							onClick={() => {
								setMode((s) => (s === 1 ? 2 : 1));
								setError(null);
							}}
							className="block text-center cursor-pointer mt-2 p-2 text-red font-medium hover:underline"
						>
							{mode === 1 ? "Register" : "Login"}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPopup;
