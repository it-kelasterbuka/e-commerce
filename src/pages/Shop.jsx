import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Style/shop.css";

// import products from "../assets/data/products";
import ProductsList from "../components/UI/ProdukList";

//Firebase import
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Mengambil data produk dari Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsData(productList);
      setAllProducts(productList); // Simpan semua produk
    };

    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (
      filterValue === "rill" ||
      filterValue === "mobile" ||
      filterValue === "sofa"
    ) {
      const filteredProducts = allProducts.filter(
        (item) => item.category === filterValue
      );
      setProductsData(filteredProducts);
    } else {
      setProductsData(allProducts); // Kembali ke semua produk jika filter tidak cocok
    }
  };

  const handleSearch = (e) => {
    const searchProduct = e.target.value;

    const searchProducts = allProducts.filter((item) =>
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
                  <option value="all">Filter By Category</option>
                  <option value="rill">Rill</option>
                  <option value="mobile">Mobile</option>
                  <option value="sofa">Sofa</option>
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
