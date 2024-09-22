import React, { useEffect, useState } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import { db, storage } from "../firebase.config"; // Import storage dari firebase config
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage API
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth"; // Pastikan jalur ini benar

const HistoryPembelian = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);
  const { currentUser, loading } = useAuth(); // Ambil user yang login

  const fetchOrders = async () => {
    if (!currentUser) return; // Jika tidak ada user yang login

    try {
      const ordersCollection = collection(db, "orders");
      const q = query(
        ordersCollection,
        where("email", "==", currentUser.email)
      );
      const orderSnapshot = await getDocs(q);
      const orderList = orderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders: ", error);
      toast.error("Failed to fetch order history.");
    }
  };

  useEffect(() => {
    if (!loading) {
      // Pastikan data pengguna sudah siap
      fetchOrders();
    }
  }, [currentUser, loading]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handlePayClick = (order) => {
    setSelectedOrder(order);
    toggleModal();
  };

  const handleUpload = async () => {
    if (paymentProof && selectedOrder) {
      // Referensi untuk mengunggah ke Firebase Storage
      const storageRef = ref(storage, `paymentProofs/${paymentProof.name}`);

      try {
        // Unggah file ke Firebase Storage
        const snapshot = await uploadBytes(storageRef, paymentProof);
        // Dapatkan URL yang permanen dari Firebase Storage
        const paymentUrl = await getDownloadURL(snapshot.ref);

        // Update dokumen di Firestore dengan URL dari Firebase Storage
        const orderRef = doc(db, "orders", selectedOrder.id);
        await updateDoc(orderRef, {
          paymentProof: paymentUrl,
          status: "Sudah Bayar",
        });

        toast.success("Pembayaran berhasil, terima kasih!");
        toggleModal();
        fetchOrders(); // Refresh order history
      } catch (error) {
        console.error("Error updating order: ", error);
        toast.error("Failed to update order status.");
      }
    } else {
      toast.error("Silakan upload bukti pembayaran.");
    }
  };

  return (
    <Container>
      <h6 className="fs-5 fw-bold">Order History</h6>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Total Qty</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.postalCode}</td>
                <td>{order.totalQty}</td>
                <td>Rp.{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Belum Bayar" && (
                    <button
                      className="btn__pay"
                      onClick={() => handlePayClick(order)}
                    >
                      Bayar
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Payment */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Form Pembayaran</ModalHeader>
        <ModalBody>
          {selectedOrder && (
            <Form>
              <FormGroup>
                <label>Metode Pembayaran</label>
                <select className="form-control">
                  <option value="transfer">Transfer Bank</option>
                  <option value="cod">Cash On Delivery (COD)</option>
                  <option value="card">Kartu Kredit</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Jasa Pengiriman</label>
                <select className="form-control">
                  <option value="jne">JNE</option>
                  <option value="pos">Pos Indonesia</option>
                  <option value="grab">Grab Express</option>
                </select>
              </FormGroup>
              <div className="alert alert-info">
                <strong>Rekening Tujuan:</strong> <br />
                Nama: Fishing Store <br />
                No. Rekening: 123456789
              </div>
              <FormGroup>
                <label>Jumlah Pembayaran</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedOrder.totalAmount}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label>Upload Bukti Pembayaran</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPaymentProof(e.target.files[0])}
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpload}>
            Bayar
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default HistoryPembelian;
