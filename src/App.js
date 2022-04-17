
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Coin from './pages/Coin';
import { makeStyles } from '@material-ui/styles';
 const useStyles = makeStyles(() => ({
   App: {
     backgroundColor: "#091834",
     color: "white",
     minHeight: "100vh",
   },
 }));
function App() {
 
  const classes = useStyles();
  console.log(classes.App);
  return (
    <>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/coin/:id" element={<Coin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
