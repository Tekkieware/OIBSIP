import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer>
      <Container>
        <Row className="text-center">
          <Col>
            <p>Copyright&copy;Tekkieware</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
