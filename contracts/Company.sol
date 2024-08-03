// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Company is
    Initializable,
    ERC20Upgradeable,
    AccessControlUpgradeable
{

    event ControllerTransfer(
        address _controller,
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event ControllerRedemption(
        address _controller,
        address indexed _tokenHolder,
        uint256 _value
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string calldata _name,
        string calldata _symbol,
        address _admin
    ) public initializer {
        __ERC20_init(_name, _symbol);
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    function bulkMint(
        address[] memory to,
        uint256[] memory amount
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint i; i < to.length; i++) {
            _mint(to[i], amount[i]);
        }
    }

    // The following functions are overrides required by Solidity.

    function controllerTransfer(
        address _from,
        address _to,
        uint256 _value
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _transfer(_from, _to, _value);
        emit ControllerTransfer(msg.sender, _from, _to, _value);
    }

    function controllerRedeem(
        address _tokenHolder,
        uint256 _value
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(_tokenHolder, _value);
        emit ControllerRedemption(msg.sender, _tokenHolder, _value);
    }
}
