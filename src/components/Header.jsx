import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from 'react-router-dom';
import { CrptoState } from "../cryptoContext/CrptoContext";
const useStyles = makeStyles(() => ({
  title: {
    color: "gold",
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const darkTheam = createTheme({
  palette: {
    primary:
    {
      main: '#fff',
      color: 'white'
    },
   
  },
   type: 'dark',
});
const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CrptoState();
  console.log(currency);
  return (
    <ThemeProvider theme={darkTheam}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.title} onClick={() => navigate("/")}>
              Crypto App
            </Typography>
            <Select
              className="sm"
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
                color: "white",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'INR'}>INR</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
