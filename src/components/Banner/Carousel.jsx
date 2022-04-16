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
    color: "white",
  },
}));

function Carousel() {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency } = CrptoState();
    const fetchTrendingCoins = async () =>
    {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }
   
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);
    const items = trending.map((coin) =>
    {
        return (<Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
            <img src={coin?.image}
                alt={coin.name}
                height={80}
                style={{marginBottom:10}}
            />
        </Link>)
    })
    const responsove = {
        0: {
            items:2
        },
        512:
        {
            items:6
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