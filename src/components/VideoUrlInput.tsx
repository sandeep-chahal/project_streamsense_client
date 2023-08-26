import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useStore } from "../context/main";

const VideoUrlInput = () => {
	const { setVideoId } = useStore();
	const [url, setUrl] = useState("");
	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		let id = "";
		if (url.includes("watch?v=")) {
			id = url.split("watch?v=")[1].split("?")[0].split("&")[0];
		} else if (url.includes("youtu.be/")) {
			id = url.split("youtu.be/")[1].split("?")[0].split("&")[0];
		}
		if (id && typeof id === "string" && id.length > 4) {
			setVideoId(id);
		} else {
			alert("Invalid Video URL");
		}
	};

	return (
		<div className="flex bg-white mx-64 mt-6 p-1 rounded-md">
			<input
				className="w-full font-semibold text-black2 text-lg"
				placeholder="Type Video Url..."
				value={url}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<button className="bg-red p-3 rounded-md ml-auto" onClick={handleSubmit}>
				<SearchIcon color="white" className="" />
			</button>
		</div>
	);
};

export default VideoUrlInput;
