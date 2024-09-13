import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { Tab, Tabs } from "@mui/material";
import LogInPage from "./login";
import SignUpPage from "./signup";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../config/firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const goggle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

export default function BasicModal() {
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("login");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value);

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Welcome ${res.user.displayName} `,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message:error.message,
          type: "error",
        });
        return;
      });
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: "85px",
          height: "40px",

          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="login" label="Log In" />
            <Tab value="signup" label="Sign Up" />
          </Tabs>
          {value === "login" ? (
            <LogInPage handleClose={handleClose} />
          ) : (
            <SignUpPage handleClose={handleClose} />
          )}
          <Box sx={goggle}>
            <span style={{ textAlign: "center" }}>OR</span>
            <GoogleButton
              style={{ width: "90%" }}
              onClick={() => {
                signInWithGoogle();
              }}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
