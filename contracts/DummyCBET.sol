pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TokenMintERC20Token
 * @author TokenMint (visit https://tokenmint.io)
 *
 * @dev Standard ERC20 token with burning and optional functions implemented.
 * For full specification of ERC-20 standard see:
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract TokenMintERC20Token is ERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    /**
     * @dev Constructor.
     * @param name name of the token
     * @param symbol symbol of the token, 3-4 chars is recommended
     * @param decimals number of decimal places of one token unit, 18 is widely used
     * @param totalSupply total supply of tokens in lowest units (depending on decimals)
     * @param tokenOwnerAddress address that gets 100% of token supply
     */
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 totalSupply,
        address tokenOwnerAddress
    ) public payable {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;

        // set tokenOwnerAddress as owner of all tokens
        _mint(tokenOwnerAddress, totalSupply);
    }

    // optional functions from ERC20 stardard

    /**
     * @return the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
}

contract DummyCBETBase is TokenMintERC20Token {
    constructor(address tokenOwnerAddress)
        public
        TokenMintERC20Token(
            "DummyCBET",
            "dCBET",
            18,
            950000000000000000000000000,
            tokenOwnerAddress
        )
    {}
}

contract DummyCBET is DummyCBETBase {
    // Ropsten: This contract got deployed with address 0x8B76B453A93389158Ad6569490be11418160C502
    constructor()
        public
        DummyCBETBase(0x89Ac2c53dD852Fe896176CC18D73384844606247)
    {}
}
