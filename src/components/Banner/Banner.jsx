import React from "react";
import { data_img_URL } from "../../data/data";
import { Container, makeStyles,Typography } from "@material-ui/core";
import Carousel from "./Carousel";
const [img] = data_img_URL;
const useStyles = makeStyles(() => ({
  banner: {
    background: `url(${img.banner})`,
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));
function Banner() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography
              variant="h2"
              style={{
                color: "gold",
                flex: 1,
                fontFamily: "Montserrat",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Crypto Tracker
            </Typography>
            <Typography variant="h6"
              style={{
                color: "#fff",
                flex: 1,
                fontFamily: "Montserrat",
                textAlign: "center",
              }}
            >
              Get all the data from crypto currency app!
            </Typography>
          </div>
          <Carousel/>
        </Container>
      </div>
    </>
  );
}

export default Banner;
