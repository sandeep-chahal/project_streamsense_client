const SERVER_URL: string = import.meta.env.VITE_SERVER_URL!;

export interface ChunkResponse {
	data: string;
	creditUsed: number | null;
	creditLeft: number | null;
	done: boolean;
	error: string;
}

export const askMe = async (
	videoId: string,
	question: string,
	callback: (chunk: ChunkResponse) => void
): Promise<any> => {
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
			const data = await response.json();
			return callback({ ...data, done: true, creditUsed: 0, creditLeft: 0 });
		}

		const contentType = response.headers.get("Content-Type");
		console.log({ contentType });

		const reader = response.body!.getReader();
		let finalResponse: string = "";

		const processChunk = async () => {
			const { done, value } = await reader.read();
			if (done) {
				callback({
					data: finalResponse,
					creditLeft: null,
					done: true,
					error: null,
					creditUsed: null,
				});
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
		console.log(err.message);
		return callback({
			data: "",
			creditLeft: null,
			creditUsed: null,
			done: true,
			error: err.message,
		});
	}
};
