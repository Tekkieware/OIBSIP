import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../components/AdminNav";
import { listPizzaIngredients, makePizza } from "../actions/appActions";
import { Container, ListGroup, Card, Col, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listUsers } from "../actions/userActions";
import { listOrders } from "../actions/appActions";
import Message from "../components/Message";

function AdminPage() {
  const dispatch = useDispatch();
  const pizzaIngredients = useSelector((state) => state.pizzaIngredients);
  const { loading, error, crusts, cheeses, sauces, veggies } = pizzaIngredients;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrder, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [usersCount, setUserCount] = useState();
  const [ordersCount, setOrdersCount] = useState();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPizzaIngredients());
      dispatch(listUsers());
      dispatch(listOrders());
    }
    if (orders) {
      const oCount = Object.keys(orders).length;
      setOrdersCount(oCount);
    }
    if (users) {
      const uCount = Object.keys(users).length;
      setUserCount(uCount);
    }
  }, [dispatch, usersCount, ordersCount]);

  return (
    <div className="wrapper">
      <Container fluid>
        {userInfo && userInfo.isAdmin ? (
          <div>
            <AdminNav inventorypage />
            <h3>Stock</h3>

            <Row>
              <Col xs={12} sm={6} md={4} lg={3} className="py-3">
                <Card>
                  <Card.Header as="h5" className="text-center">
                    Avialable Crusts &nbsp;
                    <Badge bg="primary">
                      <b>
                        {crusts.reduce(
                          (acc, crust) => acc + crust.countInStock,
                          0
                        )}
                      </b>
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    {crusts.map((crust) => (
                      <ListGroup variant="flush" key={crust.id}>
                        <ListGroup.Item>
                          {crust.name}&nbsp;
                          {crust.countInStock < 20 ? (
                            <Badge bg="danger">
                              <b>{crust.countInStock}</b>
                            </Badge>
                          ) : (
                            <Badge bg="info">
                              <b>{crust.countInStock}</b>
                            </Badge>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="py-3">
                <Card>
                  <Card.Header as="h5" className="text-center">
                    Avialable Sauces &nbsp;
                    <Badge bg="primary">
                      <b>
                        {sauces.reduce(
                          (acc, sauce) => acc + sauce.countInStock,
                          0
                        )}
                      </b>
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    {sauces.map((sauce) => (
                      <ListGroup variant="flush" key={sauce.id}>
                        <ListGroup.Item>
                          {sauce.name}&nbsp;
                          {sauce.countInStock < 20 ? (
                            <Badge bg="danger">
                              <b>{sauce.countInStock}</b>
                            </Badge>
                          ) : (
                            <Badge bg="info">
                              <b>{sauce.countInStock}</b>
                            </Badge>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="py-3">
                <Card>
                  <Card.Header as="h5" className="text-center">
                    Avialable Cheeses &nbsp;
                    <Badge bg="primary">
                      <b>
                        {cheeses.reduce(
                          (acc, cheese) => acc + cheese.countInStock,
                          0
                        )}
                      </b>
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    {crusts.map((cheese) => (
                      <ListGroup variant="flush" key={cheese.id}>
                        <ListGroup.Item>
                          {cheese.name}&nbsp;
                          {cheese.countInStock < 20 ? (
                            <Badge bg="danger">
                              <b>{cheese.countInStock}</b>
                            </Badge>
                          ) : (
                            <Badge bg="info">
                              <b>{cheese.countInStock}</b>
                            </Badge>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="py-3">
                <Card>
                  <Card.Header as="h5" className="text-center">
                    Avialable veggies &nbsp;
                    <Badge bg="primary">
                      <b>
                        {veggies.reduce(
                          (acc, veggie) => acc + veggie.countInStock,
                          0
                        )}
                      </b>
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    {veggies.map((veggie) => (
                      <ListGroup variant="flush" key={veggie.id}>
                        <ListGroup.Item>
                          {veggie.name}&nbsp;
                          {veggie.countInStock < 20 ? (
                            <Badge bg="danger">
                              <b>{veggie.countInStock}</b>
                            </Badge>
                          ) : (
                            <Badge bg="info">
                              <b>{veggie.countInStock}</b>
                            </Badge>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="pt-5">
              <Col md={6}>
                <Card>
                  <Card.Header as="h5" className="text-center">
                    Total Users &nbsp;
                    <Badge bg="primary">
                      <b>{usersCount}</b>
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Link
                        to={"/admin/users"}
                        className="btn-header2 text-center"
                      >
                        Manage Users
                      </Link>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Header as="h5" className="text-center">
                    Total Orders &nbsp;
                    <Badge bg="primary">
                      <b>{ordersCount}</b>
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Link
                        to={"/admin/orders"}
                        className="btn-header2 text-center"
                      >
                        Manage Users
                      </Link>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="danger" children="Forbidden page" />
        )}
      </Container>
    </div>
  );
}

export default AdminPage;
