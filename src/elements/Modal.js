import React from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";

const Modal = ({
  text,
  closeModal,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
  setIsLogin,
}) => {
  return (
    <>
      {
        text === "로그인"
          ? console.log("로그인 모달!")
          : // <Login
            //   closeModal={closeModal}
            //   setIsLoginModalOpen={setIsLoginModalOpen}
            //   setIsSignupModalOpen={setIsSignupModalOpen}
            //   setIsLogin={setIsLogin}
            // />
            console.log("회원가입 모달!")

        // <Signup
        //   closeModal={closeModal}
        //   setIsLoginModalOpen={setIsLoginModalOpen}
        //   setIsSignupModalOpen={setIsSignupModalOpen}
        // />
      }
    </>
  );
};

export default Modal;
