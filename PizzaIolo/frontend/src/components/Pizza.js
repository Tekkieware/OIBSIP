import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Pizza({ pizza }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/pizza/${pizza.id}`}>
        <Card.Img src={pizza.image} />
      </Link>
      <Card.Body>
        <Link to={`/pizza/${pizza._id}`}>
          <Card.Title as="h4" className="text-center mylink">
            {pizza.name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3 text-center">
            <Rating value={pizza.rating} color={"#f8e825"} />
          </div>
        </Card.Text>
        <Card.Text as="h5">
          {" "}
          Price: $
          {Number(pizza.sauce.price) +
            Number(pizza.cheese.price) +
            Number(pizza.veggie.price) +
            Number(pizza.crust.price)}
        </Card.Text>
        <ListGroup>
          <ListGroup.Item as="p">
            Base : &nbsp; {pizza.crust.name}
          </ListGroup.Item>
          <ListGroup.Item as="p">
            Cheese : &nbsp; {pizza.cheese.name}
          </ListGroup.Item>
          <ListGroup.Item as="p">
            Sauce : &nbsp; {pizza.sauce.name}
          </ListGroup.Item>
          <ListGroup.Item as="p">
            Veggie : &nbsp; {pizza.veggie.name}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Pizza;
