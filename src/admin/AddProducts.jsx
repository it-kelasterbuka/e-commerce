import React, { useState } from "react";
import "./styles/add-product.css";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

//Firebase import add
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldSortDesc, setFieldSortDesc] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [fieldCategory, setFieldCategory] = useState("");
  const [FieldPrice, setFieldPrice] = useState("");
  const [fieldProductImg, setfieldProductImg] = useState(null);
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi untuk memastikan semua field terisi
    if (
      !fieldTitle ||
      !fieldSortDesc ||
      !fieldDescription ||
      !fieldCategory ||
      !FieldPrice ||
      !fieldProductImg
    ) {
      toast.error("Please fill all the fields!");
      return;
    }

    try {
      // Dapatkan referensi koleksi produk
      const docRef = collection(db, "products");

      // Buat referensi penyimpanan untuk gambar
      const storageRef = ref(
        storage,
        `productImages/${Date.now()}_${fieldProductImg.name}`
      );

      // Upload gambar ke Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, fieldProductImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Menampilkan progres upload (opsional)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Menangani error saat upload
          console.error("Error during image upload:", error);
          toast.error("Image upload failed!");
        },
        async () => {
          // Dapatkan URL gambar setelah berhasil diupload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Tambahkan dokumen produk ke Firestore
          await addDoc(docRef, {
            productName: fieldTitle,
            shortDesc: fieldSortDesc,
            description: fieldDescription,
            category: fieldCategory,
            price: FieldPrice,
            imgUrl: downloadURL,
          });

          setLoading(false);

          // Notifikasi sukses
          toast.success("Product successfully added");

          // Reset field input setelah sukses
          setFieldTitle("");
          setFieldSortDesc("");
          setFieldDescription("");
          setFieldCategory("");
          setFieldPrice("");
          setfieldProductImg(null);

          navigate("/dashboard/all-products");
        }
      );
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
      toast.error("Error adding product!");
    }
  };

  // const addProduct = async (e) => {
  //   e.preventDefault();

  //   // Add product to the firebase database
  //   try {
  //     const docRef = await collection(db, "products");
  //     const storageRef = ref(
  //       storage,
  //       `productImages/${Date.now() + fieldProductImg.name}`
  //     );

  //     const uploadTask = uploadBytesResumable(storageRef, fieldProductImg);

  //     uploadTask.on(
  //       () => {
  //         toast.error("image not uploaded!");
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           await addDoc(docRef, {
  //             title: fieldTitle,
  //             shortDesc: fieldSortDesc,
  //             description: fieldDescription,
  //             category: fieldCategory,
  //             price: FieldPrice,
  //             imgUrl: downloadURL,
  //           });
  //         });
  //         toast.success("Product successfully added");
  //       }
  //     );
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-3">Loading...</h4>
            ) : (
              <Form onSubmit={addProduct}>
                <div className="all__product-all-product">
                  <button
                    onClick={() => navigate(`/dashboard/all-products`)}
                    className="btn btn-info my-2"
                  >
                    All Products
                  </button>
                </div>
                <h4>Add Product</h4>

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
                <div>
                  <FormGroup className="form__group">
                    <span>Image</span>
                    <input
                      type="file"
                      required
                      onChange={(e) => setfieldProductImg(e.target.files[0])}
                    />
                  </FormGroup>
                </div>

                <button className="btn__add-product">Add Product</button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
