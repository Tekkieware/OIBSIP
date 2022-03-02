import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listPizzaIngredients, makePizza } from "../actions/appActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { MAKE_PIZZA_RESET } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";

function MakePizzaPage() {
  const dispatch = useDispatch();
  const pizzaIngredients = useSelector((state) => state.pizzaIngredients);
  const { loading, error, crusts, cheeses, sauces, veggies } = pizzaIngredients;
  const madePizza = useSelector((state) => state.madePizza);
  const {
    loading: makingPizza,
    error: makingError,
    success: makingSuccess,
    pizza,
  } = madePizza;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [crustId, setCrustId] = useState("");
  const [sauceId, setSauceId] = useState("");
  const [cheeseId, setCheeseId] = useState("");
  const [veggieId, setVeggieId] = useState("");
  const [validate, setValidate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listPizzaIngredients());
    if (makingSuccess) {
      dispatch({ type: MAKE_PIZZA_RESET });
      navigate(`/pizza/${pizza.id}`);
    }
  }, [dispatch, makingSuccess]);

  const submitHandler = (e) => {
    if (
      name == "" ||
      description == "" ||
      crustId == "" ||
      sauceId == "" ||
      cheeseId == "" ||
      veggieId == ""
    ) {
      setValidate(
        "Please select a Crust, Sauce, Cheese and Veggie. Also ensure that your pizza has a name or description."
      );
    } else {
      setValidate("");
      e.preventDefault();
      dispatch(
        makePizza({
          name,
          description,
          crustId,
          sauceId,
          cheeseId,
          veggieId,
        })
      );
    }
  };

  const selectCrust = () => {};
  return (
    <div className="wrapper">
      <Container fluid>
        {makingPizza && <Loader />}
        {makingError && <Message variant="danger" children={makingError} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" children={error} />
        ) : (
          <div>
            <Form>
              <Row className="py-3">
                <Col md={6} className="py-3">
                  <Form.Group controlId="name">
                    <Form.Control
                      type="name"
                      placeholder="Name your pizza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} className="py-3">
                  <Form.Group controlId="description">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Describe your pizza"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="py-3">
                <h6 className="btn-header">
                  Choose your preferred Pizza Base/Crust.
                </h6>
                {crusts.map((crust) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="py-3"
                    key={crust.id}
                  >
                    <Card
                      className={
                        crust.id == crustId
                          ? "text-center selected"
                          : "text-center"
                      }
                      onClick={() => setCrustId(crust.id)}
                    >
                      <Card.Header as="h5">{crust.name}</Card.Header>
                      <Card.Body>
                        <Card.Img
                          src={crust.image}
                          alt="Card image"
                          className="img-fluid img-small"
                        />
                      </Card.Body>
                      {crust.id == crustId && (
                        <Card.ImgOverlay>
                          <div className="marked mt-5 mb-5">
                            <i className="fas fa-4x fa-check"></i>
                          </div>
                        </Card.ImgOverlay>
                      )}
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <p className="text-small">{crust.description}</p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row className="py-3">
                <h6 className="btn-header">Choose your preferred Sauce.</h6>
                {sauces.map((sauce) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="py-3"
                    key={sauce.id}
                  >
                    <Card
                      className={
                        sauce.id == sauceId
                          ? "text-center selected"
                          : "text-center"
                      }
                      onClick={() => setSauceId(sauce.id)}
                    >
                      <Card.Header as="h5">{sauce.name}</Card.Header>
                      <Card.Body>
                        <Card.Img
                          src={sauce.image}
                          alt="Card image"
                          className="img-fluid img-small"
                        />
                      </Card.Body>
                      {sauce.id == sauceId && (
                        <Card.ImgOverlay>
                          <div className="marked mt-5 mb-5">
                            <i className="fas fa-4x fa-check"></i>
                          </div>
                        </Card.ImgOverlay>
                      )}
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <p className="text-small">{sauce.description}</p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row className="py-3">
                <h6 className="btn-header">Choose your preferred Cheese.</h6>
                {cheeses.map((cheese) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="py-3"
                    key={cheese.id}
                  >
                    <Card
                      className={
                        cheese.id == cheeseId
                          ? "text-center selected"
                          : "text-center"
                      }
                      onClick={() => setCheeseId(cheese.id)}
                    >
                      <Card.Header as="h5">{cheese.name}</Card.Header>
                      <Card.Body>
                        <Card.Img
                          src={cheese.image}
                          alt="Card image"
                          className="img-fluid img-small"
                        />
                      </Card.Body>
                      {cheese.id == cheeseId && (
                        <Card.ImgOverlay>
                          <div className="marked mt-5 mb-5">
                            <i className="fas fa-4x fa-check"></i>
                          </div>
                        </Card.ImgOverlay>
                      )}
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <p className="text-small">{cheese.description}</p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row className="py-3">
                <h6 className="btn-header">Choose your preferred Veggie.</h6>
                {veggies.map((veggie) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="py-3"
                    key={veggie.id}
                  >
                    <Card
                      className={
                        veggie.id == veggieId
                          ? "text-center selected"
                          : "text-center"
                      }
                      onClick={() => setVeggieId(veggie.id)}
                    >
                      <Card.Header as="h5">{veggie.name}</Card.Header>
                      <Card.Body>
                        <Card.Img
                          src={veggie.image}
                          alt="Card image"
                          className="img-fluid img-small"
                        />
                      </Card.Body>
                      {veggie.id == veggieId && (
                        <Card.ImgOverlay>
                          <div className="marked mt-5 mb-5">
                            <i className="fas fa-4x fa-check"></i>
                          </div>
                        </Card.ImgOverlay>
                      )}
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <p className="text-small">{veggie.description}</p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row className="text-center">
                {!validate == "" && <p className="validate">{validate}</p>}
                <p className="btn-header2" onClick={submitHandler}>
                  Finish
                </p>
              </Row>
            </Form>
          </div>
        )}
      </Container>
    </div>
  );
}

export default MakePizzaPage;
