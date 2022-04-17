import { makeStyles, CircularProgress, Typography } from "@material-ui/core";
import axios from 'axios';
import React,{useState} from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CrptoState } from ".././cryptoContext/CrptoContext";
import { SingleCoin } from '../api/config';
import CoinInfo from '../components/CoinInfo';
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    borderRight: "2px solid grey",
  },
  heading: {
    fontFamily: "Montserrat",
    fontSize: 20,
  },
  description: {
    fontFamily: "Montserrat",
    fontSize: 13,
  },
}));
const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency } = CrptoState();
  const classes = useStyles();
   const [loading, setLoading] = useState(false);
  useEffect(() =>
  {
          
    const fetchSingleCoin = async () =>
    {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data)
      setLoading(false);
    }
    fetchSingleCoin();
  }, [currency])
  console.log(coin)
  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          {loading ? (
            <CircularProgress disableShrink />
          ) : (
            <>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                style={{ marginBottom: 20 }}
              />
              <Typography variant="h3" className={classes.heading}>
                {coin?.name}
              </Typography>
              <div style={{width:'70%',textAlign:'center',marginTop:20}}>
                <Typography variant="h2" className={classes.description}>
                  {coin?.description.en.split(". ")[0]}
                </Typography>
              </div>
            </>
          )}
        </div>
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default Coin;