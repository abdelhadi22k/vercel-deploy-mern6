import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckoutSteps from "../components/CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { troyspaymentMethod } from "../redux/cart/cartAction";
import { Helmet } from "react-helmet-async";

function PaymentMethod() {

  const dispatcht = useDispatch();
  const navigate = useNavigate();

  const shippingAddress = useSelector(
    (state) => state.cart.cart.shippingAddress
  );
  const paymentMethod = useSelector((state) => state.cart.cart.paymentMethod);
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatcht({
      type: "SAVE_PAYMENT_METHOD",
      payload: paymentMethodName,
    });

    localStorage.setItem("paymentMethod", paymentMethodName);

    navigate("/placeorder");
  };
  return (
    <div className="shipping">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default PaymentMethod;
