import React, { useState } from "react";
import "../Style/checkout.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handlePlaceOrder = async () => {
    // Validasi form
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode ||
      !country
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      totalQty,
      totalAmount,
      status: "Belum Bayar",
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      toast.success("Order placed successfully!");

      // Redirect ke halaman history setelah berhasil
      navigate("/history-pembelian");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to place order.");
    }
  };

  return (
    <Helmet title={"Checkout"}>
      <CommonSection title={"Checkout"} />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <Form className="billing__form">
                <h6 className="fs-5 fw-bold text-center">
                  Billing Information
                </h6>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} Item</span>
                </h6>
                <h6>
                  Subtotal: <span>Rp.{totalAmount}</span>
                </h6>
                <h4>
                  Total Cost <span>{totalAmount}</span>
                </h4>
              </div>
              <button className="btn__place w-100" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
