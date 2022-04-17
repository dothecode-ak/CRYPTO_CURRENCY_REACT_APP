import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../api/config";
import { CrptoState } from "../cryptoContext/CrptoContext";
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from "./Banner/Carousel";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  TextField,
  TableContainer,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  cointable: {
    color: "gold",
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#030c1c",
    "&:hover": {
      backgroundColor: "#02cc99",
    },
  },
  search: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
      placeholder: {
        color: "white",
      },
    },
  },
}));
const darkTheam = createTheme({
  palette: {
    primary: {
      main: "#fff",
      color: "white",
    },
  },
  type: "dark",

});
function CoinTable() {
    const classes = useStyles();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { currency, symbol } = CrptoState();
   const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);
 
  const handleSerch = () =>
  {
    console.log("fsdhfhds")
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    );
  }
  return (
    <ThemeProvider theme={darkTheam}>
      <Container style={{ textAlign: "center" }}>
        <Typography style={{ margin: 18 }} variant="h5">
          Cryptocurrency prices by Market Cap!
        </Typography>
        <TextField
          label="Search for currency..."
          className={classes.search}
          style={{ color: "white", marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          color="white"
        />
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coins", "Price", "24h Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontFamily: "Montserrat",
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSerch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`{/coins/${row.id}`)}
                      className={classes.cointable}
                    >
                      <TableCell
                        component={"th"}
                        scope={"row"}
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              color: "white",
                              textTransform: "uppercase",
                              fontSize: "22",
                            }}
                          >
                            {row?.symbol}&nbsp;
                          </span>
                          <span
                            style={{
                              color: "white",
                              textTransform: "uppercase",
                              fontSize: "17",
                            }}
                          >
                            {row?.name}&nbsp;
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{ color: "white", align: "right" }}>
                        {symbol}
                        {numberWithCommas(row?.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell style={{ align: "right" }}>
                        <span
                          style={{
                            color: profit > 0 ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}{" "}
                          {row?.price_change_percentage_24h?.toFixed(2)}
                        </span>
                      </TableCell>

                      <TableCell style={{ color: "white", align: "right" }}>
                        {symbol}
                        {numberWithCommas(
                          row?.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default CoinTable;
