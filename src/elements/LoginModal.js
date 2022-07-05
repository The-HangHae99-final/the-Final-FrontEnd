import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginModal = ({ text }) => {
  return (
    <>
      {
        text ? <Login text={text} /> : null

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
