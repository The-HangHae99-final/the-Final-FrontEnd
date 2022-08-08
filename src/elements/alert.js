import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SuccessAlert = ({ text, handleClose, openToast }) => {
  return (
    <Alert
      onClose={handleClose}
      severity="success"
      sx={{ width: "100%", position: "absolute", top: "10px", right: "10px" }}
    >
      {text}
    </Alert>
  );
};

export const WarningAlert = ({ text, handleClose, openToast }) => {
  return (
    <Alert
      onClose={handleClose}
      severity="warning"
      sx={{ width: "100%", position: "absolute", top: "10px", right: "10px" }}
    >
      {text}
    </Alert>
  );
};

export const ErrorAlert = ({ text, handleClose, openToast }) => {
  return (
    <Alert
      onClose={handleClose}
      severity="error"
      sx={{ width: "60%", position: "absolute", top: "10px", right: "10px" }}
    >
      {text}
    </Alert>
  );
};
