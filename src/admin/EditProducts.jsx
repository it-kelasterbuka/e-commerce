import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldSortDesc, setFieldSortDesc] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [fieldCategory, setFieldCategory] = useState("");
  const [FieldPrice, setFieldPrice] = useState("");
  const [fieldProductImg, setFieldProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProductData(docSnap.data());
        setFieldTitle(docSnap.data().productName);
        setFieldSortDesc(docSnap.data().shortDesc);
        setFieldDescription(docSnap.data().description);
        setFieldCategory(docSnap.data().category);
        setFieldPrice(docSnap.data().price);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, "products", id);
      let imgUrl;

      if (fieldProductImg) {
        // Jika ada gambar baru yang diupload
        const storageRef = ref(
          storage,
          `productImages/${Date.now()}_${fieldProductImg.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, fieldProductImg);

        await uploadTask;

        imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
      } else {
        // Jika tidak ada gambar baru, gunakan gambar yang sudah ada
        imgUrl = productData.imgUrl;
      }

      await updateDoc(docRef, {
        productName: fieldTitle,
        shortDesc: fieldSortDesc,
        description: fieldDescription,
        category: fieldCategory,
        price: FieldPrice,
        imgUrl: imgUrl,
      });

      toast.success("Product updated successfully");
      navigate("/dashboard/all-products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-3">Loading...</h4>
            ) : (
              <Form onSubmit={updateProduct}>
                <h4>Edit Product</h4>
                {productData && (
                  <>
                    <div>
                      <img
                        src={productData.imgUrl}
                        alt="Current Product"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <FormGroup className="form__group">
                      <span>Product title</span>
                      <input
                        type="text"
                        placeholder="Product title"
                        value={fieldTitle}
                        onChange={(e) => setFieldTitle(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Sort Description</span>
                      <input
                        type="text"
                        placeholder="Sort Description Product"
                        value={fieldSortDesc}
                        onChange={(e) => setFieldSortDesc(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Description product</span>
                      <input
                        type="text"
                        placeholder="Description Product"
                        value={fieldDescription}
                        onChange={(e) => setFieldDescription(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <div className="d-flex align-item-center justify-content-between gap-5">
                      <FormGroup className="form__group w-50">
                        <span>Price</span>
                        <input
                          type="text"
                          placeholder="Rp.100000"
                          value={FieldPrice}
                          onChange={(e) => setFieldPrice(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="form__group w-50">
                        <span>Category</span>
                        <select
                          className="w-100 p-2"
                          value={fieldCategory}
                          onChange={(e) => setFieldCategory(e.target.value)}
                        >
                          <option>Select Category</option>
                          <option value="rill">Rill</option>
                          <option value="sofa">Sofa</option>
                          <option value="mobile">Mobile</option>
                        </select>
                      </FormGroup>
                    </div>
                    <FormGroup className="form__group">
                      <span>Image</span>
                      <input
                        type="file"
                        onChange={(e) => setFieldProductImg(e.target.files[0])}
                      />
                    </FormGroup>
                    <button className="btn__add-product">Update Product</button>
                  </>
                )}
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProducts;
