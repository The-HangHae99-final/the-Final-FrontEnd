// Portal 역할을 하는 Poltal.js

import reactDom from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");

  // index.html의 modal div를 가져와 children으로 넣는다
  return reactDom.createPortal(children, el);
};

export default ModalPortal;
