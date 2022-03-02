import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AdminNav({ inventorypage, userspage, orderspage }) {
  return (
    <div>
      <Nav className="justify-content-center mb-4">
        {userspage ? (
          <Nav.Item>
            <LinkContainer to="/admin/users">
              <Nav.Link className="step-done">Manage Users</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <LinkContainer to="/admin/users">
              <Nav.Link>Manage Users</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        {inventorypage ? (
          <Nav.Item>
            <LinkContainer to="/admin">
              <Nav.Link className="step-done">Inventory</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <LinkContainer to="/admin">
              <Nav.Link>Inventory</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        {orderspage ? (
          <Nav.Item>
            <LinkContainer to="/admin/orders">
              <Nav.Link className="step-done">Manage Orders</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <LinkContainer to="/admin/orders">
              <Nav.Link>Manage Orders</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
}

export default AdminNav;
