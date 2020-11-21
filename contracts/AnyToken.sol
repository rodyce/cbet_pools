//  /$$$$$$                                  /$$               /$$$$$$$              /$$
//  /$$__  $$                                | $$              | $$__  $$            | $$
// | $$  \__/  /$$$$$$  /$$   /$$  /$$$$$$  /$$$$$$    /$$$$$$ | $$  \ $$  /$$$$$$  /$$$$$$
// | $$       /$$__  $$| $$  | $$ /$$__  $$|_  $$_/   /$$__  $$| $$$$$$$  /$$__  $$|_  $$_/
// | $$      | $$  \__/| $$  | $$| $$  \ $$  | $$    | $$  \ $$| $$__  $$| $$$$$$$$  | $$
// | $$    $$| $$      | $$  | $$| $$  | $$  | $$ /$$| $$  | $$| $$  \ $$| $$_____/  | $$ /$$
// |  $$$$$$/| $$      |  $$$$$$$| $$$$$$$/  |  $$$$/|  $$$$$$/| $$$$$$$/|  $$$$$$$  |  $$$$/
//  \______/ |__/       \____  $$| $$____/    \___/   \______/ |_______/  \_______/   \___/
//                      /$$  | $$| $$
//                     |  $$$$$$/| $$
//                      \______/ |__/

pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract AnyToken is ERC20, ERC20Detailed {
    // Ropsten: This contract got deployed with address 0xA26db9D5Ab21C465a25bE0F3bE2cd040197DE3D0

    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    address public governance;
    mapping(address => bool) public minters;

    constructor() public ERC20Detailed("AnyToken", "ANYT", 18) {
        governance = msg.sender;
    }

    function mint(address account, uint256 amount) public {
        require(minters[msg.sender], "!minter");
        _mint(account, amount);
    }

    function setGovernance(address _governance) public {
        require(msg.sender == governance, "!governance");
        governance = _governance;
    }

    function addMinter(address _minter) public {
        require(msg.sender == governance, "!governance");
        minters[_minter] = true;
    }

    function removeMinter(address _minter) public {
        require(msg.sender == governance, "!governance");
        minters[_minter] = false;
    }
}
