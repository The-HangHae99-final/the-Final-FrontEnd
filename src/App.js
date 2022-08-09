import GlobalStyle from "./styles/GlobalStyle";
import Router from "./routers/Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
