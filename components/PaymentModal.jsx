import {React,useState,useEffect,ChangeEvent} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import styles from '../components/styles/myCustom.module.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function PaymentModal({data}) {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal_content}>
        <div className={styles.modalTitle}></div>
        <div className={styles.modalText} data-simplebar data-simplebar-auto-hide="false">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm data={data}/>
            </Elements>
          )}
        </div>
        </div>
    </div>
    </>
  );
}

