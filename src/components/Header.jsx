import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";
import React,{useContext} from "react";
import { CryptoContext } from "../cryptocontext";
import { useNavigate } from "react-router-dom";
import AuthModal from "./Authentication/AuthModal";
import UserSideBar from "./Authentication/UserSideBar";




const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
  },
});

const Header = () => { 
  const {currency, symbol, setCurrency,user} = useContext(CryptoContext);
  
  let navigate = useNavigate();
   const handleClick = () => {
  navigate("/");
};


  return (
    <ThemeProvider  theme={darkTheme}>

    <CssBaseline />
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            onClick={handleClick}
            sx={{
              flex: 1,
              color: "gold",
              fontFamily: "Monstserrat",
              fontWeight: "bold",
              cursor: "pointer",

            }}
          >
            CryptoFlix
          </Typography>
          <Select
            
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          {!user&&<AuthModal/>}
          {user&&<UserSideBar/>}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
