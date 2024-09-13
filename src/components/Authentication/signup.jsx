import { Box,Button,TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import { CryptoContext } from '../../cryptocontext';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../config/firebaseConfig';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const SignUpPage = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {setAlert} = useContext(CryptoContext);

  const handleSubmit = async() =>{
    if(password !== confirmPassword){
    setAlert({
      open: true,
      message: "Password do not match",
      type: "error"
    });
    return;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth,email,password);
    console.log(result);
    setAlert({
      open: true,
      message: `Sign Up Successfull. Welcome ${result.user.email}`,
      type: "success",
    });
    handleClose();
  } catch (error) {
    const errorMessage = error.message;
    setAlert({open:true,
    message: `${errorMessage}  `,
    type: "error",});
    return;
  }

};
  return (
    <Box
    p={3}
    sx={{display: "flex",
    flexDirection: "column",
    gap:"20px"}}>
      <TextField
      variant = "outlined"
      type = "email"
      label = "Enter Email"
      value = {email}
      onChange = {(e) => setEmail(e.target.value)}
      fullWidth/>
      <TextField
      variant = "outlined"
      type = "password"
      label = "Enter Password"
      value = {password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth/>
      <TextField
      variant = "outlined"
      type = "password"
      label = "Confirm Password"
      value = {confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      fullWidth />
      <Button
      variant="contained"
      size='large'
      sx={{backgroundColor: "#EECB1D"}}
      onClick={handleSubmit}>Sign Up</Button>
    </Box>
  )
}

export default SignUpPage