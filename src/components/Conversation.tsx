import { useStore } from "../context/main";
import { SendIcon } from "lucide-react";
import { FAKE_CONVERSATION } from "../services/utils";
import Message from "./Message";

const Conversation = () => {
	const { conversation, setConversation, videoId } = useStore();

	return (
		<div className="mx-64 mt-14 rounded-lg p-1 bg-gradient-to-b from-yellow to-red2">
			<div className="bg-white">
				<div className="w-[97%] mx-auto rounded-xl relative pb-4">
					<div className="h-80 max-h-[80vh] px-8 py-4 overflow-auto flex flex-col">
						{videoId ? (
							FAKE_CONVERSATION.length ? (
								FAKE_CONVERSATION.map((message, index) => <Message message={message} key={index} />)
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
					<div className="bg-gray-100 rounded-lg flex justify-evenly w-full mt-3">
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
