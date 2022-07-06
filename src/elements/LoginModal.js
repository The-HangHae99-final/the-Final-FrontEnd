import React from "react";
import Modal from "../components/Modal";
import Signup from "../components/Signup";

const LoginModal = ({ text }) => {
  return (
    <>
      {
        text ? <Modal text={text} /> : null
        // <Signup
        //   closeModal={closeModal}
        //   setIsLoginModalOpen={setIsLoginModalOpen}
        //   setIsSignupModalOpen={setIsSignupModalOpen}
        // />
      }
    </>
  );
};

export default LoginModal;
