import React,{useContext, useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../config/firebaseConfig";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { CryptoContext } from "../../cryptocontext";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




const LogInPage = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAlert} = useContext(CryptoContext);

  const handleSubmit = async() => {
    if(!email || !password){
      setAlert({
        open:true,
        message:"Please fill in all fields",
      type:"error"});
      return;

    }
    try {
      const result = await signInWithEmailAndPassword (auth, email, password );
      console.log(result);
      
        setAlert({
          open:true,
          message: `Sign In Successfull. Welcome ${result.user.email}`,
          type: "success"
        });
        handleClose();
        return;
    } catch (error) {
      const errorMessage = error.message;
    setAlert({open:true,
    message: `${errorMessage}  `,
    type: "error",});
    return;
    }
  };
  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: "#EECB1D" }}
        onClick={handleSubmit}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LogInPage;
