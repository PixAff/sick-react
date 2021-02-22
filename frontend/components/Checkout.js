import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import SickButton from "./styles/SickButton";
import { useState } from "react";
import nProgress from "nprogress";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useCart } from "../lib/CartState";
import { CURRENT_USER_QUERY } from "./User";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const { closeCart } = useCart();
  const elements = useElements();
  const [checkout, { error: graphGLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start(); // progress bar

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);

    if (error) {
      console.log({ Fehler: error });
      setError(error);
      nProgress.done();
      return; // stop checkout
    }

    console.log(paymentMethod.id);

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    console.log("finished eith the order");
    console.log(order);

    Router.push({
      pathname: "/order/[id]",
      query: { id: order.data.checkout.id },
    });

    closeCart();

    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphGLError && <p style={{ fontSize: 12 }}>{graphGLError.message}</p>}
      <CardElement />
      <SickButton>Check out now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
