import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const PaymentForm = ({ amount, paymentIntent, close }: any) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handlePayment = async (event: any) => {
		event.preventDefault();
		setLoading(true);
		if (!stripe || !elements || !paymentIntent) return;

		const { error } = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: window.location.href,
			},
		});

		if (error) {
			setError(error.message);
		} else {
			close();
			// reload
			window.location.reload();
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handlePayment}>
			<PaymentElement />
			{error && <p className="error">{error}</p>}
			<button
				type="submit"
				className={`bg-green py-1 px-4 mt-4 w-full ${loading ? "opacity-50 bg-gray-50" : ""}`}
				disabled={!stripe || loading}
			>
				Pay
			</button>
		</form>
	);
};

const PaymentPopup = ({ amount, close }: { amount: number; close: () => void }) => {
	const [paymentIntent, setPaymentIntent] = useState(null);
	const [error, setError] = useState(null);
	// const [amount, setAmount] = useState(0);

	useEffect(() => {
		const createPaymentIntent = async () => {
			try {
				const response = await fetch(
					import.meta.env.VITE_SERVER_URL + "/payment/create-payment-intent",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ amount }),
						credentials: "include",
					}
				);

				if (!response.ok) {
					throw new Error("Failed to create payment intent");
				}

				const data = await response.json();
				setPaymentIntent(data.client_secret);
			} catch (err) {
				setError(err.message);
			}
		};

		createPaymentIntent();
	}, [amount]);

	return (
		<div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-30 z-[500000]">
			<div className="relative bg-white w-[500px] max-w-[90%] max-h-[80vh] overflow-auto m-auto top-20 p-10 rounded-lg">
				<button
					className="absolute right-5 top-5 button bg-rose-600 text-white px-3 py-1 rounded-sm"
					onClick={close}
				>
					X
				</button>
				{paymentIntent && !error ? (
					<Elements
						stripe={stripePromise}
						options={{
							clientSecret: paymentIntent,
						}}
					>
						<PaymentForm
							amount={amount}
							paymentIntent={paymentIntent}
							onClose={() => {
								close();
							}}
						/>
					</Elements>
				) : error ? (
					<p className="error text-red">{error}</p>
				) : (
					<p>Loading payment details...</p>
				)}
			</div>
		</div>
	);
};

export default PaymentPopup;
