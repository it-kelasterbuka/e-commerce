import React from "react";
import "./styles/all-product.css";

import { Container, Row, Col } from "reactstrap";
import useGetDataProduct from "../hooks/useGetDataProduct";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const { data: productsData } = useGetDataProduct("products");
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Delete product successfully");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="table-container">
              <div className="all__product-add-product">
                <button
                  onClick={() => navigate(`/dashboard/add-product`)}
                  className="btn btn-success mb-2"
                >
                  Add Product
                </button>
              </div>
              <table className="table ">
                <thead>
                  <tr>
                    <td>Image</td>
                    <td>Title</td>
                    <td>Category</td>
                    <td>Price</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="img-all-product" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>Rp.{item.price}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            navigate(`/dashboard/edit-product/${item.id}`)
                          }
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
