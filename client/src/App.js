import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import NewLand from "./components/NewLand";
import Auction from "./components/Auction";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";

function App() {
  const ethereum = window.ethereum;
  const web3 = new Web3(ethereum);
  //const networkId = web3.eth.net.getId()
  const MyContractJSON = require("./build/LandSale.json")
  
  const contractAddress = MyContractJSON.networks["5777"].address;
  const contractAbi = MyContractJSON.abi;

  
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  // const ethereum = window.ethereum;
  const [Auth,setAuth]=React.useState(false);

  const loginHandler=async(event)=>{
    await ethereum.request({ method: "eth_requestAccounts" }).then(
      setAuth(true)
      );    
  
  }
    
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage myContract={myContract} web3={web3} />
          </Route>
          <Route path="/register">
            <NewLand myContract={myContract} web3={web3} />
          </Route>
          <Route path="/land/:landId">
            <Auction myContract={myContract} web3={web3} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;