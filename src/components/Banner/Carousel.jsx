import axios from 'axios'
import {React, useContext, useState,useEffect} from 'react'
import { CryptoContext } from '../../cryptocontext'
import { TrendingCoins } from '../../config/api'
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const [tranding,SetTranding] = useState([]);
    const {currency,symbol} = useContext(CryptoContext);

    const fetchTrandingCoins = async() =>{
        const {data} = await axios.get(TrendingCoins(currency));
        SetTranding(data);
    };
    
    useEffect(() => {
        fetchTrandingCoins();
    },[currency]);

    const items = tranding.map((coin) => {
        const profit = coin.price_change_percentage_24h > 0 ? "+" : "";
        return(
            <Link className='carouselItems' to={`/coins/${coin.id}`}>
            <img
            src={coin.image}
            alt={coin.name}
            height="80px"
            style={{marginBottom: 10}}
            />
            <span>
                {coin.symbol}
                &nbsp;
                <span style={profit?{color:"lightGreen"}:{color:"red"}}>
                    {profit+coin.price_change_percentage_24h.toFixed(2) }%
                </span>
            </span>
            <span style={{fontSize: 22, fontWeight: 500}}>
                {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
            </span>
            </Link>
    )
    });
    
    const responsive = {
        0: {items: 2,},
        512: {items: 4},
    };
  return (
    <div className='Carousel'>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div>
  )
}

export default Carousel