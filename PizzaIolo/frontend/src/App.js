import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SideBar from "./components/SideBar";
import BasketPage from "./pages/BasketPage";
import MakePizzaPage from "./pages/MakePizzaPage";
import PizzaPage from "./pages/PizzaPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserEditPage from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";
import OrderListPage from "./pages/OrderListPage";
import AdminPage from "./pages/AdminPage";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid>
          <Row>
            <Col md={2}>
              <SideBar />
            </Col>
            <Col md={10}>
              <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user/profile" element={<ProfilePage />} />
                <Route
                  path="/users/reset_password"
                  element={<PasswordReset />}
                />
                <Route
                  path="/users/reset_password/confirm/:uid/:token"
                  element={<PasswordResetConfirm />}
                />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/placeorder" element={<PlaceOrderPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/users" element={<UserListPage />} />
                <Route path="/admin/orders" element={<OrderListPage />} />
                <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
                <Route path="/basket/" element={<BasketPage />} />
                <Route path="/basket/:id" element={<BasketPage />} />
                <Route path="/pizza/make" element={<MakePizzaPage />} />
                <Route path="/pizza/:id" element={<PizzaPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
