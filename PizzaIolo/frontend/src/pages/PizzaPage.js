import React, { useEffect, useState } from "react";
import { getPizzaDetails } from "../actions/appActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container } from "react-bootstrap";
import {
  Col,
  ListGroup,
  Row,
  Button,
  Form,
  Card,
  Image,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams, useNavigate } from "react-router-dom";
import { CREATE_PIZZA_REVIEW_RESET } from "../constants/appConstants";
import { createPizzaReview } from "../actions/appActions";
import { Link } from "react-router-dom";

function PizzaPage() {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const addToBasketHandler = () => {
    navigate(`/basket/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPizzaReview(id, {
        rating,
        comment,
      })
    );
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pizzaDetails = useSelector((state) => state.pizzaDetails);
  const { loading, error, pizza, reviews, success } = pizzaDetails;

  const pizzaReviewCreate = useSelector((state) => state.pizzaReviewCreate);
  const {
    error: errorPizzaReview,
    loading: loadingPizzaReview,
    success: successPizzaReview,
  } = pizzaReviewCreate;

  useEffect(() => {
    if (successPizzaReview) {
      setRating(0);
      setComment("");
      dispatch({ type: CREATE_PIZZA_REVIEW_RESET });
    }
    dispatch(getPizzaDetails(id));
  }, [dispatch, id, successPizzaReview]);

  return (
    <div className="wrapper">
      <Container fluid className="pt-3">
        {loading && <Loader />}
        {error && <Message children={error} variant="danger" />}
        {success && (
          <div>
            <Row>
              <Col md={6}>
                <Image src={pizza.image} alt={pizza.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{pizza.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={pizza.rating}
                      text={`   ${pizza.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Crust/Base: &nbsp;</b>
                    {pizza.crust.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Sauce: &nbsp;</b>
                    {pizza.sauce.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Cheese: &nbsp;</b>
                    {pizza.cheese.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Veggie: &nbsp;</b>
                    {pizza.veggie.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>Description: {pizza.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col as="h6">
                          $
                          {Number(pizza.crust.price) +
                            Number(pizza.sauce.price) +
                            Number(pizza.cheese.price) +
                            Number(pizza.veggie.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(pizza.crust.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Button
                          onClick={addToBasketHandler}
                          disabled={pizza.countInStock == 0}
                          className="btn-header2"
                          type="button"
                        >
                          Add To Basket
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h4 className="py-3">Reviews</h4>
                {pizza.reviews.length == 0 && (
                  <Message variant="info" children="No reviews yet" />
                )}

                <ListGroup variant="flush">
                  {pizza.reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                      <Row>
                        <Col>
                          <h5>{review.name}</h5>
                          <p className="pt-2">{review.comment}</p>
                          <Rating value={review.rating} color="#f8e825" />
                        </Col>
                        <Col>
                          <p className="text-muted">{review.createdAt}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4>Write a review</h4>
                    {loadingPizzaReview && <Loader />}
                    {successPizzaReview && (
                      <Message variant="success" children="Review Submitted" />
                    )}
                    {errorPizzaReview && (
                      <Message variant="danger" children={errorPizzaReview} />
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Review</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingPizzaReview}
                          type="submit"
                          variant="primary"
                          className="mt-4"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        <Link to="/login">
                          <strong>Login</strong>
                        </Link>{" "}
                        to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

export default PizzaPage;
