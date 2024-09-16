import React, { useState, useEffect, useRef } from "react";
import "../Style/product-details.css";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProdukList";

const ProductDetails = () => {
  const sectionRef = useRef(null);
  const [tab, setTab] = useState("desc");

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);
  return (
    <Helmet>
      <CommonSection title={productName} />

      <section ref={sectionRef}>
        <Container>
          <Row>
            <Col lg="6" className="product__img pt-0">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating">
                  <div>
                    <span>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span>Ratings)
                  </p>
                </div>
                <span className="product__price">{price}</span>
                <p className="mt-3">{shortDesc}</p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  Add To Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrraper d-flex align-items-center gap-4 mb-3">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-3">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__reviews mt-3">
                  <div className="reviews__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-2">
                          <h6>Ahmad Bedul</h6>
                          <span>{item.rating} ( rating )</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Provide value to the product</h4>
                      <form action="">
                        <div className="form__group">
                          <input type="text" placeholder="Enter Name" />
                        </div>
                        <div className="form__group d-flex align-items-center gap-3">
                          <span>
                            1<i class="ri-star-s-fill"></i>
                          </span>
                          <span>
                            2<i class="ri-star-s-fill"></i>
                          </span>
                          <span>
                            3<i class="ri-star-s-fill"></i>
                          </span>
                          <span>
                            4<i class="ri-star-s-fill"></i>
                          </span>
                          <span>
                            5<i class="ri-star-s-fill"></i>
                          </span>
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                          />
                        </div>

                        <button className="buy__btn">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12 my-4">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
