pragma solidity ^0.5.16;

import "./DummyCBET.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

contract CbetClaimFaucetBase {
    using SafeERC20 for DummyCBETBase;
    using Address for address;
    using SafeMath for uint256;

    struct RewardClaimInfo {
        mapping(address => uint256) claimAmounts;
        mapping(address => bool) claimers;
        uint256 totalClaimed;
    }

    // Cap to mint.
    uint256 private cap;

    DummyCBETBase public CBET_TOKEN; // Reward token specified in constructor

    // Reward claim info can be set in inheriting contracts.
    RewardClaimInfo rewardClaimInfo;

    // Event generated when someone claims his/her reward.
    event Claimed(address claimer, uint256 amount);

    constructor(address definTokenAddr, uint256 _cap) public {
        require(_cap > 0, "Cap must be > 0");

        CBET_TOKEN = DummyCBETBase(definTokenAddr);
        cap = _cap;
    }

    function getAvailableAmount() public view returns (uint256) {
        address claimer = msg.sender;

        // Check that claimer has not already done so.
        if (rewardClaimInfo.claimers[claimer]) {
            // User already claimed his/her reward. Nothing to claim.
            return 0;
        }

        // Check cap will not be exceeded.
        if (
            rewardClaimInfo.totalClaimed.add(
                rewardClaimInfo.claimAmounts[claimer]
            ) > cap
        ) {
            // Cap is exceeded. Nothing to reward.
            return 0;
        }

        // Return assigned reward to user.
        return rewardClaimInfo.claimAmounts[claimer];
    }

    function claim(address claimer) public {
        // Must not have already claimed.
        require(rewardClaimInfo.claimers[claimer] == false, "already claimed");
        // Must have some reward to claim.
        require(rewardClaimInfo.claimAmounts[claimer] > 0, "nothing to claim");
        // Total claim must not exceed cap.
        require(
            rewardClaimInfo.totalClaimed.add(
                rewardClaimInfo.claimAmounts[claimer]
            ) <= cap,
            "cap exceeded"
        );

        // Obtain claimer's reward by transferring the tokens to him/her.
        uint256 reward = rewardClaimInfo.claimAmounts[claimer];
        CBET_TOKEN.transfer(claimer, reward);

        // Register claimer.
        rewardClaimInfo.claimers[claimer] = true;

        // Accumulate total claimed tokens, so cap is not exceeded.
        rewardClaimInfo.totalClaimed = rewardClaimInfo.totalClaimed.add(reward);

        // Emit claimed event.
        emit Claimed(claimer, reward);
    }
}
