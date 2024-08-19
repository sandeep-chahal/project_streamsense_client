import { CircleDollarSign } from "lucide-react";

const Pricing = () => {
	return (
		<div className="mt-16">
			<h3 className="flex items-center ">
				<CircleDollarSign className="mr-2" />
				<p className="font-bold">Pricing</p>
			</h3>

			<p className="mt-2">
				Introducing our unbeatable pricing structure for StreamSense! At just $0.1, you can unlock
				access to a whopping ~400k words of summarized content. With a cost of only ~$0.00000024 per
				word, we offer an affordable solution that ensures you get the most value from your
				investment. Whether you're a student conducting research, a professional seeking quick
				insights, or simply a curious individual looking to save time, our pricing allows you to
				efficiently extract key information from YouTube videos without worrying about cost.
			</p>
		</div>
	);
};

export default Pricing;
