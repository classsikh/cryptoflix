import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { CryptoContext } from "../cryptocontext";

const UserAlert = () => {
  const { alert, setAlert } = useContext(CryptoContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      ...alert,
      open: false,
    });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose} >
      <Alert
        onClose={handleClose}
        severity={alert.type}
        variant="filled"
        key=" top"
      
        sx={{ width: "100%" }}
      >
       {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default UserAlert;
