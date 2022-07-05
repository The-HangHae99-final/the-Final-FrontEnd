import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    :root{
        --point-main: #7D8BDB;
        --FEFEFE: #FEFEFE;

        /* grey */
        --main-grey: #7A858E;
    }
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
