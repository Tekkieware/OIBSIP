import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, For } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listPizzas } from "../actions/appActions";
import Pizza from "../components/Pizza";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const pizzaList = useSelector((state) => state.pizzaList);
  const { error, loading, pizzas } = pizzaList;

  useEffect(() => {
    dispatch(listPizzas());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Container fluid>
        <Row>
          <Col md={9}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message children={error} variant="danger" />
            ) : (
              <div className="pt-2">
                <h4 className="text-center">Availiable Pizza Varieties</h4>
                <Row>
                  {pizzas.map((pizza) => (
                    <Col key={pizza.id} md={6}>
                      <Pizza pizza={pizza} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
          <Col md={3} className="action-card">
            <h5>Not statisfied? try your own recipe:</h5>
            <ul className="py-3">
              <li>Choose your preferred Pizza Base/Crust. </li>
              <li>Select a Cheese of your choice.</li>
              <li>Tell us your ideal sauce.</li>
              <li>Choose a veggie of your choice.</li>
            </ul>
            <div className="text-center">
              <Link to={"/pizza/make"} className="btn-link">
                Start Now
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
