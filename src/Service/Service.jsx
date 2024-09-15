import React from "react";
import "./service.css";

import serviceData from "../assets/data/serviceData";

import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";

function Service() {
  return (
    <section className="service">
      <Container>
        <Row>
          {serviceData.map((item, index) => (
            <Col className="my-2" lg="3" md="4" key={index}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="service__item"
                style={{ background: `${item.bg}` }}
              >
                <span>
                  <i class={item.icon}></i>
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Service;
