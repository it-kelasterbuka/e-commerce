import React from "react";

import { motion } from "framer-motion";
import "../../Style/products-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProdukCard = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartAction.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        image: item.imgUrl,
      })
    );

    toast.success("Product add to cart successfuly");
  };
  return (
    <Col lg="3" md="4">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt="img produk"
          />
        </div>
        <div className="product__info">
          <h3 className="product__name">
            <Link to={`/shope/${item.id}`}>{item.productName}</Link>
          </h3>
          <span className="d-block">{item.category}</span>
        </div>
        <div className="product__card-buttom">
          <span className="price">Rp.{item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i class="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProdukCard;
