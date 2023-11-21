import { createGlobalStyle } from 'styled-components';
import background from "./images/background1.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    margin-bottom: 0;
    position: relative;
  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${background}) center/cover no-repeat;
    background-size: cover;
    opacity: 0.5; /* Adjust the opacity as needed */
    z-index: -1; /* Place the pseudo-element behind other content */
  }
`;

export default GlobalStyle;