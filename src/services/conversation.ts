const SERVER_URL: string = import.meta.env.VITE_SERVER_URL!;

interface AIAPIResponse extends APIResponse {
	data?: {
		content: string;
	};
	creditUsed?: number;
	creditLeft?: number;
}

export const askMe = async (videoId: string, question: string): Promise<AIAPIResponse> => {
	try {
		const response = await fetch(`${SERVER_URL}/ai/ask-me`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				type: 1,
				question,
				video_id: videoId,
			}),
		});

		const data: AIAPIResponse = await response.json();
		return data;
	} catch (err) {
		console.log("Error while asking AI");
		console.log(err);
		return {
			success: false,
			error: err.message,
		};
	}
};
