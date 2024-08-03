// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Beacon is Ownable{
    UpgradeableBeacon immutable beacon;
    address public Implementation;

    constructor(address _Implementation) {
        beacon = new UpgradeableBeacon(_Implementation);
        Implementation = _Implementation;
        transferOwnership(tx.origin);
    }

    function upgrade(address _Implementation) public onlyOwner{
        beacon.upgradeTo(_Implementation);
        Implementation = _Implementation;
    }

    function implementation() public view returns(address) {
        return beacon.implementation();
    }

}