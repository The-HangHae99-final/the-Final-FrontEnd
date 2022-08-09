import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
    ${reset};
    :root{
        /* Regular */
        --white: #FFFFFF;
        --black: #090909;
        
        /* Point */
        --point-main: #7D8BDB;
        --point-inactive: #BBC4F6;
        --error: #F06767;
        --left-menu: #889AFF;

        /* Light */
        --light-text: #353841;
        --light-bg: #F8F8F9;
    }   --middle-text: #7A858E;
    *{
        margin: 0;
    };

    html,
    body {
      width: 100vw;
      height: 100vh;
    }
    body{
      font-family: 'Noto Sans KR', sans-serif;
      font-family: 'Poppins', sans-serif;
      padding: 0;
      margin: 0;
      color:#000000;
    };
    div{
      box-sizing: border-box;
    }

`;

export default GlobalStyle;
