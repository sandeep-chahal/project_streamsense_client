import { createContext, useState, useContext, useEffect } from "react";
import { getIntialUser } from "../services/utils";

export interface IUser {
	name: string;
	email: string;
	credits: number;
	authenticated: boolean;
	_id: string;
}
export interface IMessage {
	type: "ASSISTANT" | "USER";
	content: string;
	done?: boolean;
	creditUsed?: number;
	error?: boolean;
}

type IConversation = IMessage[];

interface IContext {
	user: IUser;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	conversation: IConversation;
	setConversation: React.Dispatch<React.SetStateAction<IConversation>>;
	videoId: string;
	setVideoId: React.Dispatch<React.SetStateAction<string>>;
	loginPopup: boolean;
	setLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_CONTEXT_VALUE = {
	user: {
		name: "",
		email: "",
		credits: 0,
		authenticated: false,
		_id: "",
	},
	videoId: "",
	loginPopup: false,
	setVideoId: () => {},
	conversation: [],
	setUser: () => {},
	setConversation: () => {},
	setLoginPopup: () => {},
} as IContext;

export const Context = createContext(DEFAULT_CONTEXT_VALUE);

type IProps = {
	children: React.ReactNode;
};

const Provider = ({ children }: IProps) => {
	const [loginPopup, setLoginPopup] = useState<boolean>(DEFAULT_CONTEXT_VALUE.loginPopup);
	const [user, setUser] = useState<IUser>(getIntialUser() || DEFAULT_CONTEXT_VALUE.user);
	const [videoId, setVideoId] = useState<string>(DEFAULT_CONTEXT_VALUE.videoId);
	const [conversation, setConversation] = useState<IConversation>([]);

	useEffect(() => {}, []);

	return (
		<Context.Provider
			value={{
				user,
				setUser,
				conversation,
				setConversation,
				videoId,
				setVideoId,
				loginPopup,
				setLoginPopup,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStore = () => useContext(Context);

export default Provider;
