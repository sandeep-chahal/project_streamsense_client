import { createContext, useState, useContext } from "react";

interface IUser {
	name: string;
	email: string;
	credits: number;
	authenticated: boolean;
}
interface IMessage {
	type: "ASSISTANT" | "USER";
	content: string;
}

type IConversation = IMessage[];

interface IContext {
	user: IUser;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	conversation: IConversation[];
	setConversation: React.Dispatch<React.SetStateAction<IConversation[]>>;
	videoId: string;
	setVideoId: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_CONTEXT_VALUE = {
	user: {
		name: "",
		email: "",
		credits: 0,
		authenticated: false,
	},
	videoId: "",
	setVideoId: () => {},
	conversation: [],
	setUser: () => {},
	setConversation: () => {},
} as IContext;

export const Context = createContext(DEFAULT_CONTEXT_VALUE);

type IProps = {
	children: React.ReactNode;
};

const Provider = ({ children }: IProps) => {
	const [user, setUser] = useState<IUser>(DEFAULT_CONTEXT_VALUE.user);
	const [videoId, setVideoId] = useState<string>(DEFAULT_CONTEXT_VALUE.videoId);
	const [conversation, setConversation] = useState<IConversation[]>([]);

	return (
		<Context.Provider value={{ user, setUser, conversation, setConversation, videoId, setVideoId }}>
			{children}
		</Context.Provider>
	);
};

export const useStore = () => useContext(Context);

export default Provider;
