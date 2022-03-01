import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";

function App() {
  const ethereum = window.ethereum;

  const MyContractJSON = require("./build/LandSale.json")

  const contractAddress = MyContractJSON.networks["3"].address;
  const contractAbi = MyContractJSON.abi;

  const web3 = new Web3(ethereum);

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
      Hello
      {!Auth&&(<button onClick={loginHandler}>Login</button>)}
    </div>
  );
}

export default App;