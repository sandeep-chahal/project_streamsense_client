import { useStore } from "../context/main";
import { SendIcon } from "lucide-react";

const Conversation = () => {
	const { conversation, setConversation, videoId } = useStore();
	return (
		<div className="mx-64 mt-14 rounded-lg p-1 bg-gradient-to-b from-yellow to-red2">
			<div className="bg-white">
				<div className="w-[97%] mx-auto rounded-xl relative">
					<div className="h-96 px-8 py-4">
						{videoId ? (
							conversation.length ? null : (
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
					<div className="bg-gray-100 rounded-lg flex justify-evenly absolute bottom-6 w-full c-center">
						<input
							className="py-4 bg-gray-100 rounded-lg w-11/12"
							placeholder="Ask me anything..."
							disabled={!videoId}
						/>
						<button className="p-3" disabled={!videoId}>
							<SendIcon color="var(--color-red)" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Conversation;
