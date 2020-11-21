const BN = require("bn.js");
const { Coin } = require("../common/constants");

const CbetToken = artifacts.require("./DummyCBETBase.sol");
const TestCbetClaimFaucet = artifacts.require("./TestCbetClaimFaucet.sol");

const TOTAL_FAUCET_CAP = new BN(14_400).mul(Coin);
const CLAIMER_ACCOUNT_COUNT = 6;
const ZERO = new BN(0);

contract("Cbet claim faucet", function (accounts) {
  let CbetToken;
  let rewardClaimFaucet;

  beforeEach(async () => {
    // Create Cbet token.
    // TODO: FIXME
    CbetToken = await CbetToken.new();

    // Configure claimer info (claimers and their amounts).
    // Include an additional claimer for testing.
    const claimerAccounts = accounts.slice(0, CLAIMER_ACCOUNT_COUNT + 1);
    const claimerAmounts = Array(CLAIMER_ACCOUNT_COUNT).fill(
      TOTAL_FAUCET_CAP.div(new BN(CLAIMER_ACCOUNT_COUNT))
    );
    claimerAmounts.push(
      TOTAL_FAUCET_CAP.div(new BN(2 * CLAIMER_ACCOUNT_COUNT))
    );

    // Instantiate a reward claim faucet contract with the corresponding
    // claimers and their amounts.
    rewardClaimFaucet = await TestCbetClaimFaucet.new(
      CbetToken.address,
      TOTAL_FAUCET_CAP,
      claimerAccounts,
      claimerAmounts
    );
  });

  it("Can see available reward", async () => {
    // Test setup.
    const expectedReward = new BN(2_400).mul(Coin);

    // Method under test.
    const rewardAvailable = await rewardClaimFaucet.getAvailableAmount({
      from: accounts[0],
    });

    // Expectations.
    // Reward available for the account must be the expected one.
    expect(expectedReward.toString()).to.be.eq(rewardAvailable.toString());
  });

  it("Can claim reward", async () => {
    // Test Setup.
    // Expected balance after the operation.
    const expectedAfterBalance = new BN(2_400).mul(Coin);

    // Get actual balance.
    const beforeBalance = await CbetToken.balanceOf(accounts[0]);

    // Method under test.
    // Claim reward.
    await rewardClaimFaucet.claim({ from: accounts[0] });

    // Get actual after balance after claiming the reward.
    const afterBalance = await CbetToken.balanceOf(accounts[0]);

    // Expectations.
    // Expect that before and after balances are the expected ones.
    expect(beforeBalance.toString()).to.be.eq(ZERO.toString());
    expect(afterBalance.toString()).to.be.eq(expectedAfterBalance.toString());
  });

  it("No available reward after claim", async () => {
    // Test Setup.
    // Expected available reward before the claiming operation.
    const expectedRewardBefore = new BN(2_400).mul(Coin);

    // Method under test.
    const rewardBefore = await rewardClaimFaucet.getAvailableAmount({
      from: accounts[0],
    });

    // Claim money.
    await rewardClaimFaucet.claim({ from: accounts[0] });

    // Method under test. Available reward after claiming must be zero.
    const rewardAfter = await rewardClaimFaucet.getAvailableAmount({
      from: accounts[0],
    });

    // Expectations.
    // Available reward before must be the expected. After claiming, it must
    // be ZERO.
    expect(rewardBefore.toString()).to.be.eq(expectedRewardBefore.toString());
    expect(rewardAfter.toString()).to.be.eq(ZERO.toString());
  });

  it("Can NOT claim reward if not in list", async () => {
    // Sample account that is not a registered claimer.
    const testAccount = accounts[accounts.length - 1];

    let actualThrow = false;
    try {
      // Method under test.
      await rewardClaimFaucet.claim({ from: testAccount });
    } catch {
      // Should throw exception.
      actualThrow = true;
    }

    // Get balance after claim operation.
    const afterBalance = await CbetToken.balanceOf(testAccount);

    // Expectations.
    // Exception thrown when claiming.
    expect(actualThrow).to.be.true;
    // Balance MUST be zero after claiming.
    expect(afterBalance.toString()).to.be.eq(ZERO.toString());
  });

  it("Can NOT claim reward if cap exceeded", async () => {
    // Test setup.
    // Setup account that will attempt to claim a reward after the has been
    // reached.
    const otherAccount = accounts[CLAIMER_ACCOUNT_COUNT];
    const rewardBefore = await rewardClaimFaucet.getAvailableAmount({
      from: otherAccount,
    });

    // Claim until reaching cap.
    for (let i = 0; i < CLAIMER_ACCOUNT_COUNT; i++) {
      const account = accounts[i];
      await rewardClaimFaucet.claim({ from: account });
    }

    // Method under test.
    // Get available reward for account after other claimers have reached cap.
    const rewardAfter = await rewardClaimFaucet.getAvailableAmount({
      from: otherAccount,
    });

    let actualThrow = false;
    try {
      // Method under test.
      await rewardClaimFaucet.claim({ from: testAccount });
    } catch {
      // Should throw exception.
      actualThrow = true;
    }

    // Expectations.
    // Reward must be GREATER than zero before all people have claimed.
    expect(rewardBefore.gt(ZERO)).to.be.true;
    // Reward must be ZERO when cap has been reached.
    expect(rewardAfter.eq(ZERO)).to.be.true;
    // Trying to claim after reaching cap must throw exception.
    expect(actualThrow).to.be.true;
  });
});
