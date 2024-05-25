import { IMessage } from "../context/main";
import Markdown from "react-markdown";

interface IProps {
	message: IMessage;
}

const Message = ({ message }: IProps) => {
	if (message.type === "ASSISTANT") {
		return (
			<div className="my-6">
				<div className={`${message.error ? "bg-red" : "bg-gray-200"} my-1 p-2 rounded-md w-5/6`}>
					{message.content ? (
						<span className="">
							{" "}
							<Markdown>{message.content}</Markdown>
						</span>
					) : (
						<div>....</div>
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
