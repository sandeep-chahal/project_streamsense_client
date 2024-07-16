import { createContext, useState, useContext, useEffect } from "react";
import { getInitialUser } from "../services/utils";
import { getUser } from "../services/authentication";

export interface IUser {
	name: string;
	email: string;
	credit: number;
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
	loadingUser: boolean;
}

const DEFAULT_CONTEXT_VALUE = {
	user: {
		name: "",
		email: "",
		credit: 0,
		authenticated: false,
		_id: "",
	},
	loadingUser: true,
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
	const [user, setUser] = useState<IUser>(getInitialUser() || DEFAULT_CONTEXT_VALUE.user);
	const [loadingUser, setLoadingUser] = useState<boolean>(true);
	const [videoId, setVideoId] = useState<string>(DEFAULT_CONTEXT_VALUE.videoId);
	const [conversation, setConversation] = useState<IConversation>([]);

	useEffect(() => {
		(async () => {
			const response = await getUser();
			if (response.success) {
				setUser(response.data.user);
			} else {
				setUser(null);
			}
			setLoadingUser(false);
		})();
	}, []);

	return (
		<Context.Provider
			value={{
				loadingUser,
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
