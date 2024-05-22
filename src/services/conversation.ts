const SERVER_URL: string = import.meta.env.VITE_SERVER_URL!;

interface AIAPIResponse extends APIResponse {
	data?: {
		content: string;
	};
	creditUsed?: number;
	creditLeft?: number;
}

export interface ChunkResponse {
	data: string;
	tokens: number | null;
	done: boolean;
	error: boolean;
	message: string | null;
}

export const askMe = async (
	videoId: string,
	question: string,
	callback: (chunk: ChunkResponse) => void
): Promise<AIAPIResponse> => {
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
		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const reader = response.body!.getReader();
		let finalResponse: string = "";

		const processChunk = async () => {
			const { done, value } = await reader.read();
			if (done) {
				callback({ data: finalResponse, tokens: null, done: true, error: false, message: null });
				return;
			}

			const textChunk = new TextDecoder().decode(value);
			const jsonChunks = textChunk.split("<|>").filter(Boolean);

			for (const chunk of jsonChunks) {
				const data: ChunkResponse = JSON.parse(chunk);
				finalResponse += data.data;
				callback({ ...data, data: finalResponse });
			}

			await processChunk(); // Read the next chunk
		};

		await processChunk(); // Start reading chunks
		return;
	} catch (err) {
		console.log("Error while asking AI");
		console.log(err);
		return {
			success: false,
			error: err.message,
		};
	}
};
