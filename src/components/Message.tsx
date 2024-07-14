import { IMessage } from "../context/main";
import Markdown from "react-markdown";

interface IProps {
	message: IMessage;
}

const Message = ({ message }: IProps) => {
	if (message.type === "ASSISTANT") {
		return (
			<div className="my-6">
				<div className={`my-1 w-5/6`}>
					{message.content ? (
						<div className={`${message.error ? "bg-red" : "bg-gray-200"} p-2 rounded-md`}>
							{" "}
							<Markdown>{message.content}</Markdown>
						</div>
					) : (
						// <div>....</div>
						<ChatMessageSkeleton />
					)}
				</div>
				<span className="ml-1 text-sm">
					{message.creditUsed > 0 ? "$" + message.creditUsed.toFixed(4) : ""}
				</span>
			</div>
		);
	} else
		return (
			<div className="ml-auto bg-gray-100 py-3 px-2 rounded-md ">
				<span className="">{message.content}</span>
			</div>
		);
};

export default Message;

function ChatMessageSkeleton() {
	return (
		<div className="animate-pulse flex space-x-4 my-2">
			<div className="flex-1 space-y-2 py-1">
				<div className="h-4 bg-gray-200 rounded w-1/2"></div>
				<div className="h-4 bg-gray-200 rounded w-2/5"></div>
			</div>
		</div>
	);
}
