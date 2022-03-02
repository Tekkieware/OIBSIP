import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, ListGroup, Image, Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { savePaymentMethod } from "../actions/appActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/appActions";
import { ORDER_CREATE_RESET } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.075 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
    if (success) {
      navigate(`/order/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate, dispatch, order]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="wrapper">
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Information</h2>
              <p className="py-2">
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {"  "}
                {cart.shippingAddress.postalCode},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Information</h2>
              <p className="py-2">
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Information</h2>
              {cart.cartItems.length === 0 ? (
                <Message children="Your cart is empty" variant="info" />
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col as="h6">
                          <Link to={`/pizza/${item.pizza}`}>
                            {item.qty > 1 ? `${item.name}s` : `${item.name}`}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ₦{item.price} = ₦
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Sumamry</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order:</Col>
                  <Col>₦{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₦{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₦{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>₦{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger" children={error} />}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderPage;
