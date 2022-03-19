// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandRegistration is ERC721, Ownable {
    constructor() ERC721("Land", "LND") {}

    struct LandDetail {
        uint256 surveyNo;
        string district;
        string taluk;
        string village;
        uint256 blockNo;
        uint256 landValue; // in wei
        uint256 area;
        bool salesStatus;
        bytes documentHash;
        uint256 expiry;
        string bidType;
        bool expired;
    }

    mapping(uint256 => LandDetail) LandDetails;

    uint256 public registeredLandCount = 0;

    function registerNewLand(
        uint256 surveyNo,
        string memory district,
        string memory taluk,
        string memory village,
        uint256 blockNo,
        uint256 landValue,
        uint256 area,
        bytes memory documentHash,
        uint256 expiry,
        string memory bidType,
        bool expired
    ) public returns (uint256) {
        //function registerNewLand(uint surveyNo, string memory district, string memory taluk, string memory village, uint blockNo, uint landValue, uint area) public {
        LandDetails[registeredLandCount] = LandDetail(
            surveyNo,
            district,
            taluk,
            village,
            blockNo,
            landValue,
            area,
            false,
            documentHash,
            expiry,
            bidType,
            expired
        );

        //LandDetails[registeredLandCount] = LandDetail(surveyNo, district, taluk, village, blockNo, landValue, area, false);
        _mint(msg.sender, registeredLandCount);
        //setApprovalForAll(owner(), true);
        approve(owner(), registeredLandCount);
        registeredLandCount += 1;

        return (registeredLandCount - 1);
    }

    function getLandDetails(uint256 landID)
        public
        view
        returns (LandDetail memory)
    {
        return LandDetails[landID];
    }
}
