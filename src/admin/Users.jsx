import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import useGetDataProduct from "../hooks/useGetDataProduct";
import { db } from "../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Users = () => {
  const { data: usersData } = useGetDataProduct("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usersData) {
      setLoading(false);
    }
  }, [usersData]);

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted users successfully");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="pt-5 table">
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Username</td>
                  <td>Email</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h5 className="fw-bold">Loading...</h5>
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt="users-image" />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteUser(user.uid);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
