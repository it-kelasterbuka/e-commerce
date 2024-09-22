import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const toggleDropdown = (orderId) => {
    setDropdownOpen((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const orderDoc = doc(db, "orders", orderId);
    await updateDoc(orderDoc, { status: newStatus });

    toast.success(`Status pembayaran telah diubah menjadi ${newStatus}`);
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewPaymentProof = (paymentProof) => {
    setSelectedPaymentProof(paymentProof);
    toggleModal();
  };

  return (
    <Container>
      <h2 className="text-center my-4">Orders</h2>
      <Row>
        <Col lg="12">
          <Table striped>
            <thead>
              <tr>
                <th>ID Order</th>
                <th>Nama</th>
                <th>Total</th>
                <th>Status Pembayaran</th>
                <th>Aksi</th>
                <th>Bukti Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>Rp.{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>
                    <Dropdown
                      isOpen={dropdownOpen[order.id] || false}
                      toggle={() => toggleDropdown(order.id)}
                    >
                      <DropdownToggle caret>Status</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() =>
                            handleStatusUpdate(order.id, "Dipacking")
                          }
                        >
                          Dipacking
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleStatusUpdate(order.id, "Pengiriman")
                          }
                        >
                          Pengiriman
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleStatusUpdate(order.id, "Sampai")}
                        >
                          Sampai
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                  <td>
                    {order.paymentProof && (
                      <button
                        className="btn__view btn btn-warning fs-6"
                        onClick={() =>
                          handleViewPaymentProof(order.paymentProof)
                        }
                      >
                        Bukti
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal untuk Menampilkan Bukti Pembayaran */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Bukti Pembayaran</ModalHeader>
        <ModalBody>
          {selectedPaymentProof && (
            <img
              src={selectedPaymentProof}
              alt="Bukti Pembayaran"
              style={{ width: "100%" }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={toggleModal}>
            Tutup
          </button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Orders;
