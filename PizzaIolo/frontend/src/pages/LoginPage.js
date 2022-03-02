import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const [validate, setValidate] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    setValidate("");
  }, [navigate, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password == "" || email == "") {
      setValidate("All credentiails are required");
    } else {
      dispatch(login(email, password));
    }
  };
  return (
    <div className="wrapper">
      <FormContainer>
        <h1 className="pt-5">Log in</h1>
        {error && <Message variant="danger" children={error} />}
        {validate && <Message variant="info" children={validate} />}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="pt-3">
          <Form.Group controlId="email">
            <Form.Label className="py-2">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="py-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-4 btn-primary">
            Log In
          </Button>
        </Form>
        <Row className="py-3">
          <Col md={6}>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="fa-custom"
            >
              Register
            </Link>
          </Col>
          <Col md={6}>
            Forgot Password?{" "}
            <Link to={"/users/reset_password"} className="fa-custom">
              Reset Password
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginPage;
