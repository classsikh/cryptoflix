import React, { useState, useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {SingleCoin} from "../config/api"
import { CryptoContext } from '../cryptocontext';
import Coininfo from '../components/Coininfo';
import { numberWithCommas } from "../components/CoinsTable";
import parse from 'html-react-parser';
import { LinearProgress, Typography } from '@mui/material';
import {useSummary} from 'use-react-summary';
const CoinPage = () => {
  const {id } = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol} = useContext(CryptoContext);
  
  const fetchCoins = async () =>{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoins();
  },[])
  if(!coin) return <LinearProgress sx={{backgroundColor:"gold"}}/>;
  return (
    <div className='coinpage'>

    <div className='sidebar'>
      <img
      src={coin.image.large}
      alt={coin.name}
      height="200"
      style={{marginBottom: "20px"}}

      />
       <Typography variant="h3" className="headingCoins">
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className="descriptionCoins">
          { parse(coin.description.en)
          }
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="headingCoins">
              Rank:
            </Typography>
            &nbsp; &nbsp;
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
            &nbsp; &nbsp;
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
            &nbsp; &nbsp;
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
               M
            </Typography>
            </span>
    </div>
      {/* {chart} */}</div>
      <Coininfo coin={coin} />
    
    </div>
  )
}

export default CoinPage;