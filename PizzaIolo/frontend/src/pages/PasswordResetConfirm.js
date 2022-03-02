import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import { confirmPasswordReset } from "../actions/userActions";

function PasswordResetConfirm() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [new_password, setNew_password] = useState("");
  const [re_new_password, setRe_new_password] = useState("");
  const dispatch = useDispatch();
  const [err, setErr] = useState("");

  const passwordResetConfirm = useSelector(
    (state) => state.passwordResetConfirm
  );
  const { error, loading, success } = passwordResetConfirm;

  const submitHandler = (e) => {
    e.preventDefault();
    if (new_password == "" || re_new_password == "") {
      setErr("All fields required.");
    } else {
      if (new_password != re_new_password) {
        setErr("Passwords do not match");
      } else {
        dispatch(
          confirmPasswordReset(uid, token, new_password, re_new_password)
        );
      }
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);
  return (
    <div className="wrapper">
      <FormContainer>
        <h4 className="pt-5">Set new password:</h4>
        {loading && <Loader />}
        {err && <Message variant="danger" children={err} />}
        {error && <Message variant="danger" children={error} />}
        <Form onSubmit={submitHandler} className="pt-3">
          <Form.Group controlId="password">
            <Form.Label className="py-2">New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={new_password}
              onChange={(e) => setNew_password(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label className="py-2">Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={re_new_password}
              onChange={(e) => setRe_new_password(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-4 btn-primary">
            Confirm
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PasswordResetConfirm;
