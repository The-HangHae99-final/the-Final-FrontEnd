import React from 'react';

const Login = () => {
  const googleLogin = () => {
    const googleApi = `http://localhost:3000/api/google`;
    window.location.assign(googleApi);
  };

  const reactKey = process.env.REACT_APP_GOOGLE_API_KEY;
  console.log(reactKey);
  return (
    <>
      <button
        type="button"
        onClick={googleLogin}
        styles={{
          margin: '10px auto 50px',
          background: '#fff',
          color: '#3c1e1e',
        }}
      >
        {'login with google'}
      </button>
    </>
  );
};

export default Login;
