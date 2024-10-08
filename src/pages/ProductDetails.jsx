import React, { useState, useEffect, useRef } from "react";
import "../Style/product-details.css";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
// import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProdukList";
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetDataProduct from "../hooks/useGetDataProduct";

const ProductDetails = () => {
  // Product Set Array kosong
  const [product, setProduct] = useState({});
  const sectionRef = useRef(null);
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const { id } = useParams();
  const { data: products } = useGetDataProduct("products");
  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProduct(productData);
      } else {
        console.log("no product!");
      }
    };
    getProduct();
  }, [docRef]);

  const {
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHendler = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    toast.success("Review submit");
  };

  const addToCart = () => {
    dispatch(
      cartAction.addItem({
        id,
        imgUrl: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added to cart successfully");
  };

  if (!Object.keys(product).length) {
    return <p>Loading...</p>; // Atau komponen loading lainnya
  }

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
                    <motion.span
                      whileTap={{ scale: 1.3 }}
                      onClick={() => setRating(1)}
                    >
                      <i class="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.3 }}
                      onClick={() => setRating(2)}
                    >
                      <i class="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.3 }}
                      onClick={() => setRating(3)}
                    >
                      <i class="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.3 }}
                      onClick={() => setRating(4)}
                    >
                      <i class="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.3 }}
                      onClick={() => setRating(5)}
                    >
                      <i class="ri-star-half-s-line"></i>
                    </motion.span>
                  </div>
                  <p>{/* (<span>{avgRating}</span>Ratings) */}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="product__price">{price}</span>
                  <span>Category : {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
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
                  Reviews
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-3">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__reviews mt-3">
                  <div className="reviews__wrapper">
                    {/* <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-2">
                          <h6>Ahmad Bedul</h6>
                          <span>{item.rating} ( rating )</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul> */}

                    <div className="review__form">
                      <h4>Provide value to the product</h4>
                      <form action="" onSubmit={submitHendler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
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
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
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
