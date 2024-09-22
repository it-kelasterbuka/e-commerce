import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImage from "../assets/images/herro__image.png";
import "../Style/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// import Products from "../assets/data/products";
import Service from "../Service/Service";
import ProdukList from "../components/UI/ProdukList";
import counterImg from "../assets/images/produk-tes-1-removebg-preview.png";
import Clock from "../components/UI/Clock";
import useGetDataProduct from "../hooks/useGetDataProduct";

const Home = () => {
  const { data: Product } = useGetDataProduct("products");
  const [trendingProductData, setTrendingProductData] = useState([]);
  const [bestSelesProductData, setBestSelesProductData] = useState([]);
  const [PopularProductData, setPopularProductData] = useState([]);
  const year = new Date().getFullYear();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Product) {
      setLoading(false);
    }
  }, [Product]);

  useEffect(() => {
    const filterdTrendingProducts = Product.filter(
      (item) => item.category === "rill"
    );

    const filterdBestSelesProducts = Product.filter(
      (item) => item.category === "sofa"
    );

    const filterdPopularProducts = Product.filter(
      (item) => item.category === "mobile"
    );

    setTrendingProductData(filterdTrendingProducts);
    setBestSelesProductData(filterdBestSelesProducts);
    setPopularProductData(filterdPopularProducts);
  }, [Product]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container className="container__home">
          <Row>
            <Col lg="6" md="6">
              <div className="hero__image">
                <img src={heroImage} alt="Hero Image" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">
                  Produk terbaru untuk anda {year}
                </p>
                <h1>
                  Jadikan pengalaman memancing Anda lebih sederhana dan modern.
                </h1>
                <p>
                  Temukan ketenangan dan kesederhanaan di setiap tarikan joran,
                  dengan peralatan modern yang membuat pengalaman memancing
                  lebih mudah dan menyenangkan.
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to={"/shop"}>Beli Sekarang</Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Folder Service */}
      <Service />
      {/* UI Product */}
      <section className="trending__products">
        <Container className="container__home">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {/* Folder UI Product List */}
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProdukList data={trendingProductData} />
            )}
          </Row>
        </Container>
      </section>
      {/* Baset seles product */}
      <section className="best__seles">
        <Container className="container__home">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Seles</h2>
            </Col>
            {/* Folder UI Product List */}
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProdukList data={bestSelesProductData} />
            )}
          </Row>
        </Container>
      </section>
      {/* Timer Count */}
      <section className="timer__count">
        <Container className="container__home">
          <Row>
            <Col lg="6" md="12" className="count__col">
              {/* Folder Components UI */}
              <div className="clock__top-content">
                <h4>Limited Products</h4>
                <h3>Product Discounts</h3>
              </div>
              <Clock className="clock__col" />

              <motion.button whileTap={{ scale: 1.2 }} className="store__btn">
                <Link to={"/shop"}>Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="countImage" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Popular Products */}
      <section>
        <Container className="container__home">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Popular Products</h2>
            </Col>
            {/* Folder UI Product List */}
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProdukList data={PopularProductData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
