import { IUser } from "../context/main";

function validateEmail(email: string): boolean {
	// Email regex pattern
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	return emailPattern.test(email);
}

function saveToLocalStorage(key: string, data: any) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (err) {
		console.log("Failed Save On LocalStorage");
		console.log(err);
	}
}
function getFromLocalStorage(key: string): any {
	try {
		const data = localStorage.getItem(key);
		return JSON.parse(data);
	} catch (err) {
		console.log("Failed Save On LocalStorage");
		console.log(err);
	}
}

function validatePassword(password: string): boolean {
	// Password validation rules
	const minLength = 8;
	const maxLength = 20;
	const hasUppercase = /[A-Z]/.test(password);
	const hasLowercase = /[a-z]/.test(password);
	const hasNumeric = /[0-9]/.test(password);
	const hasSpecialChar = /[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]+/.test(password);

	return (
		password.length >= minLength &&
		password.length <= maxLength &&
		hasUppercase &&
		hasLowercase &&
		hasNumeric &&
		hasSpecialChar
	);
}

export const validateLoginForum = (email: string, password: string, name: string | null) => {
	if (typeof name === "string" && name.length < 3)
		return {
			error: true,
			message: "Enter a valid name!",
		};
	if (!email.endsWith("@gmail.com"))
		return {
			error: true,
			message: "Only gmail account is allowed!",
		};
	if (!validateEmail(email))
		return {
			error: true,
			message: "Invalid email!",
		};

	if (!validatePassword(password))
		return {
			error: true,
			message: "Invalid password!",
		};

	return {
		error: false,
		message: "",
	};
};

export const handleUserData = (user: any, setUser: React.Dispatch<React.SetStateAction<IUser>>) => {
	setUser(user);
	saveToLocalStorage("user", user);
};
