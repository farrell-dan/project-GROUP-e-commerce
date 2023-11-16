import styled from "styled-components";


const Header = () => {

    return (
            <StyledNavbar>
            <div className="navbar-container">
                <div className="logo">Store Name</div>
                <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/Cart">Cart</a></li>
                </ul>
            </div>
        </StyledNavbar>
    );
};

const StyledNavbar = styled.nav`
  padding: 0px 20px;
  

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;

    li {
      a {
        text-decoration: none;
        font-weight: normal; 

        &:hover,
        &.active {
          
          font-weight: bold; 
        }
      }
    }
  }
`;
export default Header