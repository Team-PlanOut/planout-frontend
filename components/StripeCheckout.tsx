import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { FaCcStripe } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51L7UpKF9KFH9wctxGfqKckcUDmzhVUEkGZQTCeXZjSYvI5k33s1oXe3rIPJP5I8Un5qV5q016WE0aW4NcI3wThOx00OFftpTkL" //this is hard coded
  //process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckout() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link" className="inline-flex">
          <FaCcStripe className="relative top-1 mr-1" />
          Settle expenses
        </button>
      </section>
    </form>
  );
}
