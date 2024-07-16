import React, { useState, useRef, useEffect } from "react";
import { IMessage, useStore } from "../context/main";
import { SendIcon } from "lucide-react";
// import { FAKE_CONVERSATION } from "../services/utils";
import Message from "./Message";
import { ChunkResponse, askMe } from "../services/conversation";
import { flushSync } from "react-dom";

const Conversation = () => {
	const { conversation, setConversation, videoId, setUser } = useStore();
	const [input, setInput] = useState("");
	const chatBoxRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		chatBoxRef.current?.scrollTo({ top: 2000000000000, behavior: "smooth" });
	}, [conversation]);

	const handleAsk = async () => {
		const message: IMessage = { type: "USER", content: input, error: false };
		setInput("");
		setConversation((con) => {
			return [
				...con,
				message,
				{ type: "ASSISTANT", done: false, content: "", creditUsed: 0, error: false },
			];
		});
		await askMe(videoId, input, (data: ChunkResponse) => {
			console.log(data);
			if (data.creditLeft !== null) {
				setUser((user) => ({ ...user, credit: data.creditLeft }));
			}
			flushSync(() => {
				setConversation((con) => {
					const newCon = [...con];
					const lastConv = newCon.pop();
					lastConv.content = data.error ? data.error : data.data;
					lastConv.done = data.done;
					lastConv.error = Boolean(data.error);
					lastConv.creditUsed = data.creditUsed ? data.creditUsed : lastConv.creditUsed;
					return [...newCon, lastConv];
				});
			});
		});
	};

	return (
		<div className="mx-64 mt-14 rounded-lg p-1 bg-gradient-to-b from-yellow to-red2">
			<div className="bg-white">
				<div className="w-[97%] mx-auto rounded-xl relative pb-4">
					<div className="h-80 max-h-[80vh] px-8 py-4 overflow-auto flex flex-col" ref={chatBoxRef}>
						{videoId ? (
							conversation.length ? (
								conversation.map((message, index) => <Message message={message} key={index} />)
							) : (
								<div className="text-center mt-10 font-bold text-2xl text-black2 opacity-70">
									ASK ME SOMETHING...
								</div>
							)
						) : (
							<div className="text-center mt-10 font-bold text-2xl text-black2 opacity-70">
								Enter Youtube Video URL To Start Interacting...
							</div>
						)}
					</div>
					<div className="bg-gray-100 rounded-lg flex justify-evenly w-full mt-3 border-b-4 focus-within:border-red2">
						<input
							className="input py-4 bg-gray-100 rounded-lg w-11/12 outline-none"
							placeholder="Ask me anything..."
							disabled={!videoId}
							onChange={(e) => setInput(e.target.value)}
							value={input}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleAsk();
								}
							}}
						/>
						<button
							className="p-3 hover:scale-125 transition-all"
							disabled={!videoId}
							onClick={handleAsk}
						>
							<SendIcon color="var(--color-red)" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Conversation;
