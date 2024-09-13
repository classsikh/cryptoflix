import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { CryptoContext } from "../cryptocontext";
import Coininfo from "../components/Coininfo";
import { numberWithCommas } from "../components/CoinsTable";
import parse from "html-react-parser";
import { Button, LinearProgress, Typography } from "@mui/material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { doc, setDoc } from "firebase/firestore";
import { db } from "./fireBase"

      
   
const CoinPage = () => {
  
  const { id } = useParams();
  
  const [coin, setCoin] = useState();
  const { currency, symbol,user,watchlist,setAlert } = useContext(CryptoContext);
  
  const fetchCoins = async () => {
    try {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    console.log(coin);}catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoins();
  }, [id]);

const addToWatchlist = async() =>{
  const coinRef = doc(db,"watchlist",user.uid);

  try {
    await setDoc(coinRef,{coins: watchlist?[...watchlist,coin.id]:[coin.id]});
    setAlert({
      open: true,
      message: `Added ${coin.name} to watchlist`,
      type: "success",
    });

    
  } catch (error) {
    setAlert({
      open: true,
      message: `${error.message} Failed to add ${coin.name} to watchlist`,
      type:"error",
    });
    
  }
};


const removeFromWatchlist = async() =>{
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

const inWatchlist = watchlist ? watchlist.includes(coin?.id) : false;
  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;
  return (
    <div className="coinpage">
      <div className="sidebar">
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: "20px" }}
        />
        <Typography variant="h3" className="headingCoins">
          {coin.name}
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="headingCoins">
              Rank:
            </Typography>
            &nbsp; 
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="headingCoins">
            Current Price:
            </Typography>
            &nbsp; 
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="headingCoins">
              Market Cap:
            </Typography>
            &nbsp; 
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              
              &nbsp;M
            </Typography>
          </span>
        </div>
        {user && (
                <Button variant="extended" sx={{
                  width:"90%",
                  height:"40px",
                  backgroundColor:inWatchlist?"red":"gold",
                  color:inWatchlist?"white":"black",
                  transition: "backgroundColor 0.5s ease",
                  fontWeight:"bolder",
                }}
                onClick={inWatchlist?removeFromWatchlist:addToWatchlist}>
                  <QueryStatsIcon/>
                  {inWatchlist?"Remove from Watchlist":"Add to Watchlist"}
                </Button>
              ) }
        <Typography variant="subtitle1" className="descriptionCoins">
          {parse(coin.description.en)}
        </Typography>
      </div>
      <div className="contd">
             
            <Coininfo coin={coin} />
        
      </div>
    </div>
  );
};

export default CoinPage;
