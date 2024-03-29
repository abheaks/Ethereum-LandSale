import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MarketPlace from "./MarketPlace";
import { useHistory } from 'react-router-dom'

export default function HomePage(props) {
  const [auth, setAuth] = React.useState(false);

  const myContract = props.myContract;
  const web3=props.web3;
  const history = useHistory();

  const redirectHandle = () => {
    history.push(`/register`);
  };

  const handleChange = async (event) => {
    const ethereum = window.ethereum;
    await ethereum.request({ method: "eth_requestAccounts" }).then(
      setAuth(event.target.checked)
    
    );    
    
    if(auth==true){
      console.log("You were logged in");
      //await web3.clearCachedProvider();
      const ethereum = window.ethereum;
      //await ethereum.on('disconnect');
      ethereum.on('disconnect', function (error) { return false; });

      console.log("You have logged out",ethereum.isConnected());
     
    }
    // const logoutMeta = async (event) => {
    //   await props.web3.clearCachedProvider()
    // }
    
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="default"
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
                  />
                }
                label={auth ? "Logout" : "Login"}
              />
            </FormGroup>
            
              LAND MARKETPLACE
           
            {auth && (
              <div className="Register">
                
                  Register New Land
                
                <IconButton size="large" color="inherit">
                  <AddBoxIcon onClick={redirectHandle} />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <MarketPlace myContract={myContract} Auth={auth} />
      </Box>
    </div>
  );
}
