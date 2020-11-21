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

contract RopstenDefinClaimFaucet is CbetClaimFaucetBase {
    using Address for address;
    using SafeMath for uint256;

    // Claimers with their respective amounts in constructor.
    constructor()
        public
        CbetClaimFaucetBase(
            0x4025D1F29F7FA22B2508516D18d45D3e29d4C178,
            14_400 ether
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
