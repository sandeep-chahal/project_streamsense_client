import Conversation from "./components/Conversation";
import Nav from "./components/Nav";
import Faqs from "./components/Faqs";
import Pricing from "./components/Pricing";
import VideoUrlInput from "./components/VideoUrlInput";
import { useStore } from "./context/main";
import LoginPopup from "./components/LoginPopup";

function App() {
	const { loginPopup } = useStore();
	const { loadingUser } = useStore();

	if (loadingUser) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			{loginPopup ? <LoginPopup /> : null}
			<Nav />
			<p className="block text-center mt-12 text-black1">
				Uncover More In Less Time With StreamSense.
			</p>
			<VideoUrlInput />
			<Conversation />
			<Pricing />
			<Faqs />
		</div>
	);
}

export default App;
