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
			<div className="anim1">
				<div className="anim2">
					<div className="anim3"></div>
				</div>
			</div>
			{loginPopup ? <LoginPopup /> : null}
			<Nav />
			<p className="block text-center mt-6 text-black2 font-bold">
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
