import { HelpCircleIcon } from "lucide-react";

const qna = [
	{
		question: "How does Streamsense summarize YouTube videos?",
		answer:
			"Streamsense utilizes advanced algorithms and natural language processing techniques to analyze YouTube videos and generate concise summaries that capture the key points and insights.",
	},
	{
		question: "Can I specify the length or duration of the video summaries?",
		answer:
			"Currently, Streamsense does not support the ability to specify the length or duration of the video summaries. However, we understand that this is a valuable feature, and we are actively working to implement it in the near future.",
	},
	{
		question: "What payment methods does Streamsense accept?",
		answer:
			"Streamsense utilizes Stripe, a widely used and secure third-party payment service, to handle payment transactions. Through Stripe, we are able to support a wide variety of payment methods, including major credit cards, debit cards, and popular online payment platforms.",
	},
	{
		question: "What happens if a video has already been summarized?",
		answer:
			"To optimize efficiency and cost savings, if a video has already been summarized by either yourself or another user, the summary is cached. This means that when you access the same video again, you'll be charged significantly fewer credits for retrieving the existing summary.",
	},
	{
		question: "Does video length impact the pricing?",
		answer:
			"Yes, the length of the video does impact the pricing for video summarization on Streamsense. As a general guideline, videos that are longer than approximately 10 minutes will incur an additional cost. This is because longer videos tend to have more content, requiring additional processing and analysis. Rest assured, you will be notified in advance if the summary of a particular video is expected to cost more than the standard pricing, allowing you to make an informed decision.",
	},
	{
		question: "Can the AI chatbot retain information from our conversation?",
		answer:
			"At this time, the AI chatbot does not have the capability to remember past conversations. However, there are plans underway to introduce a feature that will enable the AI to temporarily store and recall information during an ongoing session. This enhancement is intended to provide a more personalized and engaging user experience.",
	},
];

const Faqs = () => {
	return (
		<div className="mt-16">
			<h3 className="flex items-center ">
				<HelpCircleIcon className="mr-2" />
				<p className="font-bold">Faqs</p>
			</h3>

			<div>
				{qna.map((item, index) => (
					<div className="mt-2" key={index}>
						<h4 className="font-medium">Q: {item.question}</h4>
						<p>A: {item.answer}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Faqs;
