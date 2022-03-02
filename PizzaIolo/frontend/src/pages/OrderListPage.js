import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/appActions";
import { useNavigate, Link } from "react-router-dom";
import AdminNav from "../components/AdminNav";

function OrderListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div className="wrapper">
      <AdminNav orderspage />
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Row>
          <Col md={12}>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE & TIME</th>
                  <th>COST</th>
                  <th>PAID</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.d}>
                    <td>{order.id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt}</td>
                    <td>₦{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>{order.status}</td>
                    <td>
                      <Link className="fa-custom" to={`/order/${order.id}/`}>
                        <b>Details</b>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default OrderListPage;
