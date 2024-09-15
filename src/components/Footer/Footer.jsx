import React from "react";

import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/eco-logo.png";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>TUANMUDA FISHING</h1>
              </div>
            </div>
            <p className="footer__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id error
              quo accusantium tempora veniam ad similique fugit inventore
              dolorem ea!
            </p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="footer__quick-links-title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Rill</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Joran</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Umpan</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Plampung</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className="footer__quick-links">
              <h4 className="footer__quick-links-title">Useful Link</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/shope"}>Shope</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/cart"}>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/login"}>Login</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/signup"}>Signup</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="footer__quick-links-title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line"></i>
                  </span>
                  <p>Jln Pancoran Barat 4D</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-fill"></i>
                  </span>
                  <p>+62 858-8546-3153</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line"></i>
                  </span>
                  <p>itkelasterbukaa@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright">
              Copyright 2024, Developed by Bedul. All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
