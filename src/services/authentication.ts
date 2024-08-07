const SERVER_URL: string = import.meta.env.VITE_SERVER_URL!;

type AUTH_TYPE = "login" | "signup";

export const handleAuth = async (
	type: AUTH_TYPE,
	email: string,
	password: string,
	name?: string
): Promise<APIResponse> => {
	try {
		console.log("-".repeat(100));
		const response = await fetch(SERVER_URL + `/auth/${type}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email,
				password,
				name,
			}),
		});
		const data: APIResponse = await response.json();
		console.log("Auth Data", data);
		return data;
	} catch (err) {
		console.log("----------Error From Auth----------");
		console.log(err);
		return {
			success: false,
			error: "Something Went Wrong!",
		};
	}
};

export const getUser = async (): Promise<APIResponse> => {
	try {
		const response = await fetch(SERVER_URL + "/auth/get-user", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const data: APIResponse = await response.json();
		return data;
	} catch (err) {
		console.log("----------Error From Auth----------");
		console.log(err);
		return {
			success: false,
			error: "Something Went Wrong!",
		};
	}
};

export const logout = async (): Promise<APIResponse> => {
	try {
		const response = await fetch(SERVER_URL + "/auth/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const data: APIResponse = await response.json();
		return data;
	} catch (err) {
		console.log("----------Error From Auth----------");
		console.log(err);
		return {
			success: false,
			error: "Something Went Wrong!",
		};
	}
};

export const deleteAccount = async (): Promise<APIResponse> => {
	try {
		const response = await fetch(SERVER_URL + "/auth/delete-account", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const data: APIResponse = await response.json();
		return data;
	} catch (err) {
		console.log("----------Error From Auth----------");
		console.log(err);
		return {
			success: false,
			error: "Something Went Wrong!",
		};
	}
};
