# Ethereum-LandSale

In every transaction there is an exchange of value. In this use case, it is land.

Let’s try to understand the traditional land buying process.

   `A person looking to buy land either visits a listing website or a real estate broker in person.
    Based on the individual’s requirement, the website or broker suggests some sellers who are selling land matching with the buyer’s requirements.
    These intermediaries (website or broker) then contact the seller to discuss the details of the deal and negotiate.`

Currently, the registration process of land is recorded manually. So there are chances of human errors.

So following are the major challenges in the traditional land sale process.

   Transparency 
   
   `Transparency means that there is nothing hidden or unknown. You can see what’s going on. A lack of transparency means that the process involved is unclear. For example,  All the intermediate people in the land market make a profit. They have a clear business idea, which makes them more profitable. Such deals are not favoured by the buyers of that system.`
   
   Record Keeping 
 
 `Conventional record-keeping has a chance of corruption. The use of paper-based documentation complicates things further, and now we also have to worry about the proper keeping of records.`
 
   Extra cost 
 
   `The owner of the property wants to sell the land and the buyer wants to own it. Why should the seller and buyer pay some money to the intermediaries? Intermediate people charge a lot of money, they do not justify the service they deliver.`
    
   Processing time
   
  `In a conventional Land sales system, there are a lot of intermediaries. Such as broker, lawyer, etc, so these intermediary actions need more time. Paper or file-based record keeping and processing lead time loss.`
   
   Multi-party System
   
   `Every system including the land sales system works with multiple parties collaborating to achieve the result. This process can be slow and tedious.`


As we know, Ethereum World Computer is an interconnected network of computers. These computers are known as nodes; each of these nodes uses software to establish connections with each other thus forming the network.



For managing the development and testing of the Solidity smart contract, we use the Truffle Framework along with Infura Service, which is Blockchain as a Service (BaaS).

For the application to interact with the Solidity code deployed in the EVM, it needs an interface, for which we use the Web3.js library to abstract and simplify the communication.

The user needs an Ethereum address(s) to interact with the Ethereum network via the application. For the management of these address(s) and their keys, we need to use a wallet. MetaMask is a wallet that is widely accepted and also supports integration with applications. MetaMask helps Web3.js to communicate with the Ethereum blockchain network.

The application UI can be built using any web framework. For our application, we are going to use React, a Javascript library for building user interfaces. These applications built on top of Ethereum are known as Decentralized Applications or DApp.

Our application needs a file storing functionality since the Ethereum blockchain is not suitable for storing files. To this purpose, we use a peer-to-peer distributed file system known as IPFS. Meanwhile, in this application, we will be using the service provided by Infura for the interaction between the DApp and IPFS network.
