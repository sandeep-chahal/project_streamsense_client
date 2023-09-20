const SERVER_URL: string = import.meta.env.VITE_SERVER_URL!;

type AUTH_TYPE = "login" | "signup";

export const handleAuth = async (
	type: AUTH_TYPE,
	email: string,
	password: string,
	name?: string
): Promise<APIResponse> => {
	try {
		const response = await fetch(SERVER_URL + `/auth/${type}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
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
