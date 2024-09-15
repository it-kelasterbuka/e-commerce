import React, { useState } from "react";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Style/shop.css";

import products from "../assets/data/products";
import ProductsList from "../components/UI/ProdukList";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "rill") {
      const filteredProducts = products.filter(
        (item) => item.category === "rill"
      );

      setProductsData(filteredProducts);
    } else if (filterValue === "mobile") {
      const filteredProducts = products.filter(
        (item) => item.category === "mobile"
      );

      setProductsData(filteredProducts);
    } else if (filterValue === "chair") {
      const filteredProducts = products.filter(
        (item) => item.category === "chair"
      );

      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchProduct = e.target.value;

    const searchProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchProduct.toLowerCase())
    );

    setProductsData(searchProducts);
  };
  return (
    <Helmet title={"Shop"}>
      <CommonSection title="Product" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select class="custom-select" onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="rill">Rill</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select className="custom-select">
                  <option>Sort By</option>
                  <option value="Ascrnding">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Product List Component UI */}
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4 fw-500">Not product found</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
