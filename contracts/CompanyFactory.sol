// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Company.sol";
import "./Beacon.sol";

contract CompanyFactory is Initializable, AccessControlUpgradeable {
    Beacon public immutable beacon;
    Company public immutable company;

    mapping(address => address[]) public getCompany;
    mapping(string => bool) public isSymbolReserved;

    event NewCompany(string, string, address, address);

    constructor(address _admin) {
        company = new Company();
        beacon = new Beacon(address(company));
       _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    // add access controls
    function deployCompanyContract(
        string memory _name,
        string memory _symbol,
        address  _admin
    ) external {
        require(!isSymbolReserved[_symbol], "reserved");

        BeaconProxy tokenContract = new BeaconProxy(
            address(beacon),
            abi.encodeWithSelector(
                Company(address(0)).initialize.selector,
                _name,
                _symbol,
                _admin
            )
        );

        isSymbolReserved[_symbol] = true;
        getCompany[msg.sender].push(address(tokenContract));
        emit NewCompany(
            _symbol,
            _name,
            address(tokenContract),
            msg.sender
        );
    }
}
