import { Drawer, Avatar, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { CryptoContext } from "../../cryptocontext";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../config/firebaseConfig";
import { numberWithCommas } from "../CoinsTable";
import { Delete } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../pages/fireBase";
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const style = {
  container: {
    width: "350px",
    padding: "25px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap:10,
  },
  avatar: {
    flex: 1,
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    gap: "20px",
    height:"92%",
  },
  avatarImage:{
    width:200,
    height:200,
    cursor:"pointer",
    backgroundColor:"#EEBC1D",
    objectFit:"contain",
  },
  watchlist:{
    flex:1,
    width:"100%",
    backgroundColor:"grey",
    borderRadius:10,
    paddingTop:10,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:12,
    overflowY:"scroll",
  },
  watchlistItem:{
    display:"flex",
    border:"black 2px solid",
    width:"90%",
    gap:"10px",
    backgroundColor:"gold",
    padding:10,
    alignItems: "start",
    justifyContent:"space-between",
    borderRadius:"5px",
    color:"black",
    
  }
};


const UserSideBar = () => {
  const { user,setAlert,watchlist,coins,symbol } = useContext(CryptoContext);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const removeFromWatchlist = async(coin) =>{
    const coinRef = doc(db,"watchlist",user.uid);
  
    try {
      await setDoc(coinRef,{coins: watchlist.filter((watch)=> watch !== coin.id)},
      {merge: true});
    
      setAlert({
        open: true,
        message: `Removed ${coin.name} from watchlist`,
        type: "success",
      });
  
      
    } catch (error) {
      setAlert({
        open: true,
        message: `${error.message} Failed to remove ${coin.name} from watchlist`,
        type:"error",
      });
      
    }
  };
  const logout = ()=>{
signOut(auth);
setAlert({
  open:true,
  message: "LogOut Successfull.",
  type: "success"
});

toggleDrawer();

};
  return (
    <>
      {" "}
      <Avatar
        onClick={toggleDrawer(true)}
        src={user.photoURL}
        alt={user.displayName || user.email}
        sx={{
          cursor: "pointer",
        }}
      />
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <div style={style.container}>
          <div style={style.avatar}>
            <Avatar
              onClick={toggleDrawer(true)}
              src={user.photoURL}
              alt={user.displayName || user.email}
              sx={
                style.avatarImage
              }
            />
            <span
              style={{
                width: "100%",
                fontSize: 25,
                textAlign: "center",
                fontWeight: "bolder",
                wordWrap: "break-word",
              }}
            >
              {user.displayName || user.email}
            </span>
          </div>
          <div style={style.watchlist}>
            <span style={{fontSize:15,textShadow:"0 0 5px black"}}>
              Watchlist
            </span>
              {
                coins.map((coin) =>{
                  if(watchlist.includes(coin.id))
                  return(
                    <div  style={style.watchlistItem}>
                    <span>{coin.name}</span>
                    <span style={{display:"flex",gap :"8px"}}>
                      {symbol}
                      {numberWithCommas(coin.current_price.toFixed(2))}
                      <Delete sx={{cursor:"pointer"}} onClick={() => removeFromWatchlist(coin)}/>
                    </span>
                    </div>
                  )
                })
              }
          </div>
          <Button
        variant="contained"
        sx={{
          
          fontWeight:"bolder",
          backgroundColor: "#EEBC1D",
        }}
        onClick={logout}
      >
        Logout
      </Button>
        </div>
      </Drawer>
    </>
  );
};

export default UserSideBar;
