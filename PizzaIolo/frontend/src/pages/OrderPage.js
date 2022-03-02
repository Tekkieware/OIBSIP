import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  ListGroup,
  Image,
  Card,
  Button,
  Col,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { savePaymentMethod } from "../actions/appActions";
import {
  getOrderDetails,
  deliverOrder,
  payOrder,
  changeOrderStatus,
} from "../actions/appActions";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import AdminNav from "../components/AdminNav";
import { CHANGE_ORDER_STATUS_RESET } from "../constants/appConstants";

function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderStatus = useSelector((state) => state.orderStatus);
  const {
    loading: loadingStatus,
    success: successStatus,
    error: errorStatus,
  } = orderStatus;

  const dispatch = useDispatch();
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || order.id !== Number(id) || successStatus) {
      dispatch({ type: CHANGE_ORDER_STATUS_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id, navigate, userInfo, successStatus]);

  const orderStatusHandler = (e) => {
    if (status == "") {
      setStatusMsg("Select a valid status");
    } else {
      e.preventDefault();
      dispatch(changeOrderStatus(order, { status }));
    }
  };

  //orderpayment

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await Axios({
        url: "/api/app/payment/success/",
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          dispatch(getOrderDetails(id));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    loadScript();

    let bodyData = new FormData();

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user
    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: order.totalPrice,
      currency: "INR",
      name: "Pizzalolo",
      description: `Test for Order ${order.id}`,
      image: "", // add image url
      order_id: order.orderPaymentId,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.email,
      },
      notes: {
        address: "Pizalolo address",
      },
      theme: {
        color: "rgb(255, 0, 212)",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error} />
  ) : (
    <div className="wrapper">
      {userInfo && userInfo.isAdmin && <AdminNav orderspage />}
      <h1>Order: {order.id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="py-3">Shipping Information</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="py-3">Payment Information</h2>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Information</h2>
              {order.orderItems.length === 0 ? (
                <Message children="Your order is empty" variant="info" />
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                        <Col>
                          <Link to={`/pizza/${item.pizza}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = $
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Sumamry</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{order.status}</Col>
                </Row>
              </ListGroup.Item>

              {userInfo && userInfo.isAdmin && order.isPaid && (
                <ListGroup.Item>
                  <Row>
                    <Form onSubmit={orderStatusHandler}>
                      <Col>
                        <Form.Group controlId="status">
                          <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="">Select Status...</option>
                            <option value="Order Recieved">
                              Order Recieved
                            </option>
                            <option value="In Kitchen">In Kitchen</option>
                            <option value="Sent To Delivery">
                              Sent To Delivery
                            </option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      {loadingStatus && <Loader />}
                      {errorStatus && (
                        <Message variant="danger" children={errorStatus} />
                      )}
                      {!statusMsg == "" && (
                        <Message variant="danger" children={statusMsg} />
                      )}
                      <Col className="text-center">
                        <Row>
                          <Button
                            type="submit"
                            variant="primary"
                            className="mt-4"
                          >
                            Submit
                          </Button>
                        </Row>
                      </Col>
                    </Form>
                  </Row>
                </ListGroup.Item>
              )}

              {!order.isPaid && (
                <ListGroup.Item>
                  <Row>
                    <button
                      onClick={showRazorpay}
                      className="btn btn-primary py-3"
                      disabled={userInfo.isAdmin}
                    >
                      Pay Now with RazorPay!!!
                    </button>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPage;
