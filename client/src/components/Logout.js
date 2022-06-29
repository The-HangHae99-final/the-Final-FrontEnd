import { GoogleLogout } from "react-google-login";

const Logout = () => {
  const clientId = process.env.REACT_APP_GOOGLE_API_KEY;

  const onSuccess = () => {
    console.log("log out successfull!");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
