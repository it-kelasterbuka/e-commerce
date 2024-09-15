import React, { useRef, useEffect } from "react";

import { motion } from "framer-motion";

import { NavLink } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";

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
];

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
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
              <motion.span whileTap={{ scale: 1.1 }} className="cart__icon">
                <i class="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </motion.span>

              <span>
                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={user_icon}
                  alt="user_icon"
                />
              </span>
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
