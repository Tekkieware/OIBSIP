import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../logo.PNG";
function Header() {
  return (
    <Navbar bg="light" className="justify-content-center sticky-top">
      <Link to={"/"}>
        <Navbar.Brand>
          <img
            src={logo}
            className="d-inline-block"
            alt="PizzaIolo logo"
            fluid="true"
            height={80}
          />
        </Navbar.Brand>
      </Link>
    </Navbar>
  );
}

export default Header;
