import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/styles";
import axios from 'axios';
import { TrendingCoins } from '../../api/config';
import { CrptoState } from '../../cryptoContext/CrptoContext';
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
 
const useStyles = makeStyles((theme) => ({
  Carousel: {
    display: "flex",
    height: "50%",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "gold",
    fontFamily: "Montserrat",
  },
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Carousel() {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency, symbol } = CrptoState();
    console.log(symbol);
  
   
  useEffect(() => {
        const fetchTrendingCoins = async () =>
    {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }
        fetchTrendingCoins();
    }, [currency]);
    const items = trending.map((coin) =>
    {
        let profit = coin.price_change_percentage_24h>= 0;
        return (
          <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
            <img
              src={coin?.image}
              alt={coin.name}
              height={80}
              style={{ marginBottom: 10 }}
            />
            <span>
              {coin?.symbol}&nbsp;
              <span style={{color:profit>0?'green':'red',fontWeight:500}}>
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
              </span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
              {symbol}
              {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
          </Link>
        );
    })
    const responsove = {
        0: {
            items:2
        },
        512:
        {
            items:4
        }
    }
  return (
    <>
      <div className={classes.Carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
                  disableDotsControls
                  disableButtonsControls
                  responsive={responsove}
                  autoPlay
                  items={items}
        />
      </div>
    </>
  );
}

export default Carousel