import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    *{
        margin: 0;
  box-sizing: border-box;
    };
    body{
        padding: 0;
        margin: 0;
        width:100vw;
    };
`;

export default GlobalStyle;
