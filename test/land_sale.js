const LandSale = artifacts.require("LandSale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
var instance;
contract("LandSale", function (accounts ) {
  it("The contracts are deployed correctly", async function () {
    instance = await LandSale.deployed();
    return assert.isNotNull(instance.address);
  });

  it("Create a new land asset",async function () {
    await instance.registerNewLand(101,"malappuram","kvk","kerala",08,80,500,{from: accounts[0]})
    const data = await instance.getLandDetails(0);
    assert.equal(data[0], 101);
    assert.equal(data[1], "malappuram");
    assert.equal(data[2], "kvk");
    assert.equal(data[3], "kerala");
    assert.equal(data[4], 08);
    assert.equal(data[5], 80);
    assert.equal(data[6], 500);
  })

  it("Bid for the Land Asset",async function (){
    await instance.bid(0,{from : accounts[1],value: 90})
  })
  it("Confirm and close the bidding for the Land asset",async function () {
    await instance.acceptBid(0,{from: accounts[0]})
  })

});
