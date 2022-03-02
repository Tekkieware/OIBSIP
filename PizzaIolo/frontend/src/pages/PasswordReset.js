import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../actions/userActions";

function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const passwordReset = useSelector((state) => state.passwordReset);
  const { error, loading, success } = passwordReset;

  useEffect(() => {
    if (success) {
      setMsg(
        "Email Sent, Check your email address to find password reset link"
      );
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email == "") {
      setErr("Enter a valid email address.");
    } else {
      dispatch(resetPassword(email));
    }
  };
  return (
    <div className="wrapper">
      <FormContainer>
        <h4 className="pt-5">Get password reset email:</h4>
        {error && <Message variant="danger" children={error} />}
        {msg && <Message variant="success" children={msg} />}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="pt-3">
          <Form.Group controlId="email">
            <Form.Label className="py-2">Email Address</Form.Label>
            {err && <p className="red">{err}</p>}
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-4 btn-primary">
            Proceed
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Remember your password?{" "}
            <Link to={"/login"} className="fa-custom">
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default PasswordReset;
