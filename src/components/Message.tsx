import { IMessage } from "../context/main";

interface IProps {
	message: IMessage;
}

const Message = ({ message }: IProps) => {
	if (message.type === "ASSISTANT") {
		return (
			<div className="w-max bg-red2 my-6 p-2 rounded-md">
				{message.done ? <span className="">{message.content}</span> : <div>....</div>}
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
