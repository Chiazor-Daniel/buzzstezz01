import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Nunito", sans-serif;
  }

  .MuiButtonBase-root {
    color: #f9f9f9 !important;
  }

  .MuiButtonBase-root:hover {
    color: #00f7df !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :root {
    --background: #040714;
    --text-primary: #f9f9f9;
    --logo-color: #2662d9;
  }

  body {
    background: var(--background);
    
    color: var(--text-primary);
    font-family: "Nunito", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #011432;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #2662d9;
  }
`;

export default GlobalStyle;
