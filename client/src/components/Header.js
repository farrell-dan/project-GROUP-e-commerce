import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaCartShopping } from "react-icons/fa6";
import React, { useState, useEffect } from "react";


const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        const totalCount = data.data.reduce((sum, item) => sum + item.quantityBuy, 0);
        setCartCount(totalCount);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  return (
    <StyledNavbar>
      <div className="navbar-container">
        <div className="logo">CouncilTech</div>
        <ul className="nav-links">
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/Cart">
              <FaCartShopping />
              {cartCount > 0 && <CartCountBadge>({cartCount})</CartCountBadge>}
            </StyledLink>
          </li>
        </ul>
      </div>
    </StyledNavbar>
  );
};

const CartCountBadge = styled.span`
  color: black;
  font-size: 1em;
`;

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center; 
    height: 40px;
  }

  .logo {
    font-size: 2rem;
    font-weight: bold;
    font-style: italic;
  }

  .nav-links {
    list-style: none;
    display: flex;

    li {
      margin-right: 30px;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: normal;
  color: black;
  font-size: 1.25em;
  display: flex;

  &:hover,
  &.active {
    font-weight: bold;
  }
`;

export default Header;