import React, { useRef, useEffect } from "react";
import "../Style/cart.css";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { cartAction } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title={"Cart"}>
      <CommonSection title={"Shopping Cart"} />

      <section ref={sectionRef}>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center my-3">
                  Not item products, to the cart
                </h2>
              ) : (
                <div className="table-responsive">
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <ListCartItemProducts item={item} key={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal :
                  <span className="fs-4 fw-bold">Rp.{totalAmount}</span>
                </h6>
                <p className="fs-6 mt-2">
                  Pajak dan pengiriman akan dihitung di checkout
                </p>
                <div>
                  <button className="buy__btn w-100">
                    <Link to={"/checkout"}>Checkout</Link>
                  </button>
                  <button className="buy__btn w-100">
                    <Link to={"/shop"}>Continue Shopping</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const ListCartItemProducts = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProductItem = () => {
    dispatch(cartAction.deleteItemProductsCart(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="img-product" />
      </td>
      <td>
        <p>{item.productName}</p>
      </td>
      <td>
        <p>Rp.{item.price}</p>
      </td>
      <td>
        <p>{item.quantity}1</p>
      </td>
      <motion.td whileTap={{ scale: 1.1 }}>
        <span>
          <i class="ri-delete-bin-line" onClick={deleteProductItem}></i>
        </span>
      </motion.td>
    </tr>
  );
};

export default Cart;
