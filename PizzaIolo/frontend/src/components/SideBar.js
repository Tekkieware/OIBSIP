import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function SideBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const disptach = useDispatch();
  const logoutHandler = () => {
    disptach(logout());
  };
  return (
    <div className="mysidebar">
      {" "}
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        className="sidebar"
      >
        <Container>
          <ul className="mylist">
            <li className="py-2 mylistitems">
              <Link to={"/basket"}>
                <Row>
                  <i className="fas fa-shopping-basket fa-3x fa-custom"></i>
                </Row>
                <Row>&nbsp;&nbsp; &nbsp;Basket</Row>
              </Link>
            </li>
            {userInfo && (
              <li className="py-2 mylistitems">
                <Link to={"/user/profile"}>
                  <Row>
                    <i className="fas fa-user fa-3x fa-custom"></i>
                  </Row>
                  <Row> &nbsp;&nbsp;&nbsp;Profile</Row>
                </Link>
              </li>
            )}

            {userInfo ? (
              <li className="py-2 mylistitems" onClick={logoutHandler}>
                <Row>
                  <i className="fas fa-sign-out-alt fa-3x fa-custom"></i>
                </Row>
                <Row> &nbsp;&nbsp;&nbsp;Logout</Row>
              </li>
            ) : (
              <li className="py-2 mylistitems">
                <Link to={"/login"}>
                  <Row>
                    <i className="fas fa-sign-in-alt fa-3x fa-custom"></i>
                  </Row>
                  <Row> &nbsp;&nbsp;&nbsp;Login</Row>
                </Link>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className="py-2 mylistitems">
                <Link to={"/admin"}>
                  <Row>
                    <i className="fas fa-store-alt fa-3x fa-custom"></i>
                  </Row>
                  <Row> &nbsp;&nbsp;&nbsp;Manage</Row>
                </Link>
              </li>
            )}
            <br />
          </ul>
          <br />
        </Container>
      </Navbar>
    </div>
  );
}

export default SideBar;
