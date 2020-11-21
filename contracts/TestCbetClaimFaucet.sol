pragma solidity ^0.5.17;

import "./CbetClaimFaucetBase.sol";

contract TestCbetClaimFaucet is CbetClaimFaucetBase {
    using SafeERC20 for DummyCBET;
    using Address for address;
    using SafeMath for uint256;

    constructor(
        address tokenAddr,
        uint256 cap,
        address[] memory claimers,
        uint256[] memory amounts
    ) public CbetClaimFaucetBase(tokenAddr, cap) {
        require(claimers.length == amounts.length, "not same len found");

        for (uint256 i = 0; i < claimers.length; i++) {
            address claimer = claimers[i];
            uint256 amount = amounts[i];

            rewardClaimInfo.claimAmounts[claimer] = amount;
        }
    }
}
