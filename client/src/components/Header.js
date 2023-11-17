import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaCartShopping } from "react-icons/fa6";


const Header = () => {
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
            </StyledLink>
          </li>
        </ul>
      </div>
    </StyledNavbar>
  );
};

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

  &:hover,
  &.active {
    font-weight: bold;
  }
`;

export default Header;