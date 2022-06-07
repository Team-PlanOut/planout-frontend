import React from 'react'

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe( "pk_test_51L7UpKF9KFH9wctxGfqKckcUDmzhVUEkGZQTCeXZjSYvI5k33s1oXe3rIPJP5I8Un5qV5q016WE0aW4NcI3wThOx00OFftpTkL" //this is hard coded
  //process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
);

export default function StripeCheckout() {
    React.useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
      if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
      }
  
      if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      }
    }, []);
  
    return (
      <form action="/api/checkout_sessions" method="POST">
        <section>
            
          <button type="submit" role="link">
            Checkout
          </button>
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 10em;
              height: 1em;
              border-radius: .5em;
              justify-content: space-between;
            }
            button {
              height: 4em;
              background: #556cd6;
              border-radius: .25em;
              color: white;
              border: 0;
              font-weight: 20em;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0em .2em .5em 0em rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form>
    );
  }