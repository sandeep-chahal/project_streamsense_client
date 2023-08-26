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
		</div>
	);
}

export default App;
