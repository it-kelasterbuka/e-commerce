import React, { useState } from "react";

import "../Style/login.css";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      const user = (await userCredential).user;

      // Ambil data pengguna dari Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      console.log(userData);

      // Arahkan berdasarkan role
      if (userData?.role === "admin") {
        navigate("/dashboard"); // Arahkan ke dashboard jika admin
      } else {
        navigate("/checkout"); // Arahkan ke checkout jika user biasa
      }

      // console.log(user);
      setLoading(false);
      toast.success("Successfully looged in");
      // navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <Form className="auth__form" onSubmit={signIn}>
                  <h3 className="fw-bold fs-4">Form Login</h3>
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
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <button className="auth__btn">Login</button>
                  <p>
                    Don't have an acount?{" "}
                    <Link to={"/signup"}>Singup Acount</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
