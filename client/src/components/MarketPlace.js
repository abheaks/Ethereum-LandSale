import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useHistory } from 'react-router-dom';
import LandSold from '../landSold.png';
import LandExpired from '../landexpired.png';
export default function MarketPlace(props) {
  const myContract = props.myContract;
  const history = useHistory();

  const redirectHandle = (id) => {
    history.push(`/land/${id}`);
  };

  const [landDetails, setLandDetails] = React.useState([]);

  useEffect(() => {
    getLandDetails();
  }, []);

  const getLandDetails = async () => {
    let landCount = await myContract.methods.registeredLandCount().call();
    let owner = await myContract.methods.owner().call();
    console.log("owner......", owner);

    let landDetailsList = [];
    for (let i = 0; i < landCount; i++) {
      let LandList = await myContract.methods.getLandDetails(i).call();
      let owner = await myContract.methods.ownerOf(i).call();
      let newLand = {
        key: i,
        address: owner,
        area: LandList.area,
        price: LandList.landValue,
        status: LandList.salesStatus,
        expiry: LandList.expiry,
        bidType: LandList.bidType,
        expired: LandList.expired
      };
      const date = new Date(LandList.expiry * 1000);
      console.log("Today", new Date().toLocaleDateString());
      console.log("Expire", date.toLocaleDateString())
      if (new Date().toLocaleDateString() >= date.toLocaleDateString()) {
        newLand.expired = false;
        console.log("Expired", newLand.expired);
      }
      landDetailsList.push(newLand);
    }
    setLandDetails(landDetailsList);
  };


  return (
    <Box
      sx={{
        paddingLeft: 15,
        paddingTop: 2,
        paddingBottom: 2,
        flexGrow: 1,
        maxWidth: "90%",
      }}
    >
      <Grid container spacing={2}>
        {props.Auth && landDetails.map((land) => (
          <Grid item xs={4}>
            {land.status
              ? <Card
                id={land.key}
                sx={{ maxWidth: 440 }}
                key={land.key}
                value={land}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={LandSold}
                  alt="land sold"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    ID: {land.key}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Owner:</b><br />
                    {land.address} <br />
                    <b>Area:</b> {land.area} Ares<br />
                    <b>Price:</b> N/A
                  </Typography>
                </CardContent>
                <CardActions>
                  <h4>SOLD!!</h4>
                </CardActions>
              </Card>
              : land.expired ?
                <Card
                  id={land.key}
                  sx={{ maxWidth: 440 }}
                  key={land.key}
                  value={land}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={LandExpired}
                    alt="Bid Expired"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ID: {land.key}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Owner:</b><br />
                      {land.address} <br />
                      <b>Area:</b> {land.area} Ares<br />
                      <b>Price:</b> N/A
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <h4>Bid Expired</h4>
                  </CardActions>
                </Card>
                : <Card
                  id={land.key}
                  sx={{ maxWidth: 440 }}
                  key={land.key}
                  value={land}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={process.env.PUBLIC_URL + "landSale.png"}
                    alt="land for sale"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ID: {land.key}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Owner:</b><br />
                      {land.address} <br />
                      <b>Area:</b> {land.area} Ares<br />
                      <b>Price:</b> {land.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => redirectHandle(land.key)}>More Details</Button>
                  </CardActions>
                </Card>
            }
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
