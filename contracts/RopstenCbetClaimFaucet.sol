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

pragma solidity ^0.5.17;

import "./CbetClaimFaucetBase.sol";

// ROPSTEN: This contract has been deployed to address 0x88f80796714811eb52431abd51355236a9a334ad.
contract RopstenCbetClaimFaucet is CbetClaimFaucetBase {
    using Address for address;
    using SafeMath for uint256;

    // Claimers with their respective amounts in constructor.
    // The address for dCBET is specified.
    constructor()
        public
        CbetClaimFaucetBase(
            0x8B76B453A93389158Ad6569490be11418160C502,
            105 ether
        )
    {
        rewardClaimInfo
            .claimAmounts[0x9C9F3908702296C2F9683F1E62BfD08DFb7Cc35E] = 5 ether;
        rewardClaimInfo
            .claimAmounts[0x99f9a7E3dd8E69745375789f036410dE47b51448] = 10 ether;
        rewardClaimInfo
            .claimAmounts[0x02819f781a0c8d17283Ea1f3320454f18afEd8F6] = 15 ether;
        rewardClaimInfo
            .claimAmounts[0xfa1543543676DD692A3A55A2324a5385A80230Bf] = 20 ether;
        rewardClaimInfo
            .claimAmounts[0x1530687611dC67810dA83878A6Fc02799dDE8d12] = 25 ether;
        rewardClaimInfo
            .claimAmounts[0x08aC0605d7dca266735E9686dd90285B9E4952F0] = 30 ether;
    }
}
