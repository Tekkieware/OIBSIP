import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/appActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setpaymentMethod] = useState("RazorPay");
  const navigate = useNavigate();

  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="wrapper">
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="RazorPay"
                id="razorPay"
                name="paymentMethod"
                checked
                onChange={(e) => setpaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-4">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PaymentPage;
