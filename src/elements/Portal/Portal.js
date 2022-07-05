import reactDom from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  console.log(el);

  // index.js의 modal div를 가져와 children으로 넣는다
  return reactDom.createPortal(children, el);
};

export default ModalPortal;
