import React, { useEffect } from "react";
import { addToBasket, removeFromBasket } from "../actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

function BasketPage() {
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const removeFromBasketandler = (pizza) => {
    dispatch(removeFromBasket(pizza));
    navigate("/basket");
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  useEffect(() => {
    if (id) {
      dispatch(addToBasket(id, qty));
    }
  }, [dispatch, id, qty]);
  return (
    <div className="wrapper">
      <Row className="pt-3">
        <Col lg={8}>
          <h2 className="text-center">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message variant="danger">
              Your Cart Is Empty &nbsp; &nbsp; &nbsp;
              <Link to="/" className="btn-header3">
                Go Back
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="pt-3">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.pizza}>
                  <Row>
                    <Col lg={2}>
                      <Image src={item.image} alt={item.image} fluid rounded />
                    </Col>
                    <Col lg={4}>
                      <strong>
                        <Link to={`/pizza/${item.pizza}`}>
                          {Number(item.qty) > 1 ? (
                            <h6>
                              <b>{item.qty}</b> {item.name}s
                            </h6>
                          ) : (
                            <h6>
                              <b>{item.qty}</b> {item.name}
                            </h6>
                          )}
                        </Link>
                      </strong>
                    </Col>
                    <Col lg={2}>
                      <h5>${item.price * item.qty}</h5>
                    </Col>
                    <Col lg={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromBasketandler(item.pizza)}
                      >
                        <i className="fas fa-2x fa-trash delete"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  total items:{" "}
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </h4>
                <h4>
                  total price: $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    {" "}
                    Proceed To Checkout
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

export default BasketPage;
