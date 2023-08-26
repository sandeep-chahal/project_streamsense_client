import Conversation from "./components/Conversation";
import Nav from "./components/Nav";
import VideoUrlInput from "./components/VideoUrlInput";

function App() {
	return (
		<div>
			<Nav />
			<p className="block text-center mt-12 text-black1">
				Uncover More In Less Time With StreamSense.
			</p>
			<VideoUrlInput />
			<Conversation />
		</div>
	);
}

export default App;
