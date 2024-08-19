import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");
