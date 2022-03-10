// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./Land.sol";

contract LandSale is LandRegistration {
    //address public owner;
    struct BidDetail {
        uint256 highestBid;
        address highestBidder;
        mapping(address => uint256) bids;
        address[] bidders;
    }

    // constructor() {
    //     owner = msg.sender;
    // }

    mapping(uint256 => BidDetail) BidDetails;

    modifier ownerRestricted() {
        if (msg.sender != owner()) _;
    }

    function bid(uint256 landID) public payable {
        require(
            BidDetails[landID].bids[msg.sender] + msg.value >
                BidDetails[landID].highestBid,
            "cant't bid, make a higher Bid"
        );
        BidDetails[landID].highestBidder = msg.sender;
        BidDetails[landID].bidders.push(msg.sender);
        BidDetails[landID].highestBid =
            BidDetails[landID].bids[msg.sender] +
            msg.value;
        BidDetails[landID].bids[msg.sender] += msg.value;
        emit BidEvent(
            landID,
            BidDetails[landID].highestBidder,
            BidDetails[landID].highestBid
        );
    }

    function acceptBid(uint256 landID) public {
        payable(msg.sender).transfer(BidDetails[landID].highestBid);
        safeTransferFrom(msg.sender, BidDetails[landID].highestBidder, landID);
        for (uint256 i = 0; i < BidDetails[landID].bidders.length; i++) {
            if (
                BidDetails[landID].bidders[i] ==
                BidDetails[landID].highestBidder
            ) {
                continue;
            }
            payable(BidDetails[landID].bidders[i]).transfer(
                BidDetails[landID].bids[BidDetails[landID].bidders[i]]
            );
        }
        LandDetails[landID].salesStatus = true;
    }

    function instantBuy(uint256 landID) public payable {
        //require(msg.sender!=ownerOf(landID));
        BidDetails[landID].highestBidder = msg.sender;
        BidDetails[landID].bidders.push(msg.sender);
        BidDetails[landID].highestBid =
            BidDetails[landID].bids[msg.sender] +
            msg.value;
        BidDetails[landID].bids[msg.sender] += msg.value;
        LandDetails[landID].salesStatus = true;
        emit BidEvent(
            landID,
            BidDetails[landID].highestBidder,
            BidDetails[landID].highestBid
        );
    }

    function assetTransfer(uint256 landID) public {
        payable(ownerOf(landID)).transfer(BidDetails[landID].highestBid);
        safeTransferFrom(
            ownerOf(landID),
            BidDetails[landID].highestBidder,
            landID
        );
        LandDetails[landID].salesStatus = true;
    }

    function approveforSale(uint256 landID) public {
        approve(BidDetails[landID].highestBidder, landID);
        safeTransferFrom(
            ownerOf(landID),
            BidDetails[landID].highestBidder,
            landID
        );
        LandDetails[landID].salesStatus = true;
    }

    fallback() external {
        revert();
    }

    event BidEvent(
        uint256 indexed landID,
        address highestBidder,
        uint256 highestBid
    );
}
