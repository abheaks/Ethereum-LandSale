import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LandscapeIcon from "@mui/icons-material/Landscape";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { create } from "ipfs-http-client";

const districts = [
  "Thiruvanathapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Wayanad",
  "Kozhikode",
  "Kannur",
  "Kasargod",
];
const types = [
  "No Bid",
  "Instant Bid",
  "Expiry Bid"
];

export default function NewLand(props) {
  const myContract = props.myContract;
  const ethereum = window.ethereum;
  const web3 = props.web3;

  const ipfs = create("https://ipfs.infura.io:5001/api/v0");

  const [district, setDistrict] = React.useState("");
  const [taluk, setTaluk] = useState("");
  const [surveyNo, setSurveyNo] = useState("");
  const [village, setVillage] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [hash, setHash] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [bidType, setBidType] = useState("");
  const [expiry, setBidExpiry] = useState("");
  var expired = false;


  const handleDistricChange = (event) => {
    setDistrict(event.target.value);
  };


  const talukChangeHandler = (event) => {
    setTaluk(event.target.value);
  };

  const surveyNoChangeHandler = (event) => {
    setSurveyNo(event.target.value);
  };

  const villageChangeHandler = (event) => {
    setVillage(event.target.value);
  };

  const blockNoChangeHandler = (event) => {
    setBlockNo(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const areaChangeHandler = (event) => {
    setArea(event.target.value);
  };

  const fileChangeHandler = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const bidTypeChangeHandler = (event) => {
    setBidType(event.target.value);
  };

  const expiryChangeHandler = (event) => {


    setBidExpiry(new Date(event.target.value).getTime() / 1000);
  };


  const submitHandler = async (event) => {
    event.preventDefault();

    let url;
    try {
      const added = await ipfs.add(file);
      url = 'https://ipfs.infura.io/ipfs/' + added.path;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }

    //Uploading all the land data to the IPFS
    try {
      const client = new NFTStorage({ token: NFT_STORAGE_KEY });
      const metadata = await client.store({
        surveyNo, district, taluk, village, blockNo, price, area, web3.utils.asciiToHex(url), expiry, bidType, expired
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }


    const date = new Date(expiry * 1000);
    if (new Date().toLocaleDateString() >= date.toLocaleDateString()) {
      expired = true;
      console.log("Expired1", expired);
    }
    let LandID = await myContract.methods.registerNewLand(surveyNo, district, taluk, village, blockNo, price, area, web3.utils.asciiToHex(url), expiry, bidType, expired).send({ from: ethereum.selectedAddress });
    await myContract.methods.approveforSale(LandID);
    // if(bidType=='Instant Bid')
    // await myContract.methods.approveforSale(LandID);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Back to Marketplace">
              <IconButton
                size="large"
                color="inherit"
              >
                <NavLink to="/" ><ArrowBackIcon /></NavLink>
              </IconButton>
            </Tooltip>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              LAND MARKETPLACE
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ paddingLeft: 30, paddingTop: 2, flexGrow: 1, maxWidth: "80%" }}>
        <div>
          <Typography variant="h4">
            Register a Land for Sale!{" "}
            <LandscapeIcon fontSize="large" color="secondary" />
          </Typography>
        </div>
        <br />
        <form noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                required
                label="DISTRICT"
                value={district}
                onChange={handleDistricChange}
                helperText="Select the district where the land is located"
                variant="outlined"
                sx={{ width: "100%" }}
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                label="TALUK"
                id="taluk"
                helperText="Provide the taluk name where the land is located"
                variant="outlined"
                onChange={talukChangeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                label="VILLAGE"
                id="village"
                helperText="Provide the village name where the land is located"
                variant="outlined"
                onChange={villageChangeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                required
                label="Survey No."
                variant="outlined"
                helperText="Provide the Survey No. of the land"
                onChange={surveyNoChangeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Block No."
                helperText="Provide the Block No of the ward where the land is loacted"
                variant="outlined"
                onChange={blockNoChangeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Area"
                helperText="Provide the land area (in ares)"
                variant="outlined"
                onChange={areaChangeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="PRICE"
                variant="outlined"
                helperText="Provide the auction start price for the land (specify in wei)"
                onChange={priceChangeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  select
                  required
                  label="BID TYPE"
                  value={bidType}
                  onChange={bidTypeChangeHandler}
                  helperText="Select Bid type"
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  {types.map((bidType) => (
                    <MenuItem key={bidType} value={bidType}>
                      {bidType}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {props.bidType == "Expiry Bid" ?
                <Grid item xs={4}>
                  <TextField

                    label="Expiry"
                    id="expiry"
                    helperText="Mention the expiry date"
                    variant="outlined"
                    onChange={expiryChangeHandler}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                :
                <Grid item xs={4}>
                  <TextField

                    label="Expiry"
                    id="expiry"
                    helperText="Mention the expiry date"
                    variant="outlined"
                    onChange={expiryChangeHandler}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              }

            </Grid>


            <Grid item xs={12}>
              <div>
                <Typography>
                  Upload all the required documents in a single PDF file.
                </Typography>
                <input
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  style={{ display: "none" }}
                  id="button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="button-file">
                  <Button variant="contained" component="span">
                    Upload Documents
                  </Button>
                  <p>{fileName}</p>
                </label>
              </div>
              <div>


                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Register Land for Auction
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
