import React, { useRef, useEffect } from "react";

import { motion } from "framer-motion";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
  {
    path: "history",
    display: "History",
  },
];

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const Navigate = useNavigate();
  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc());
  });

  const menuToggle = () => menuRef.current.classList.toggle("nav__active");

  const navigateToCart = () => {
    Navigate("/cart");
  };

  const toggleProfileAction = () =>
    profileActionRef.current.classList.toggle("show__profileAction");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged  out");
        Navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <header ref={headerRef}>
      <Container className="header__container">
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>TUANMUDA FISHING</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <motion.span whileTap={{ scale: 1.1 }} className="fav__icon">
                <i class="ri-heart-line"></i>
                <span className="badge">1</span>
              </motion.span>
              <motion.span
                whileTap={{ scale: 1.1 }}
                className="cart__icon"
                onClick={navigateToCart}
              >
                <i class="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </motion.span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={currentUser ? currentUser.photoURL : user_icon}
                  alt="user_icon"
                  onClick={toggleProfileAction}
                />
                <div
                  className="profile__action"
                  ref={profileActionRef}
                  onClick={toggleProfileAction}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column menu__Profile">
                      <Link to="/signup">SignUp</Link>
                      <Link to="/login">login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span className="ri_menu_line" onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
