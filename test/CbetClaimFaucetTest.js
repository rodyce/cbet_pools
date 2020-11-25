const BN = require("bn.js");
const { Coin } = require("../common/constants");

const CbetToken = artifacts.require("./DummyCBETBase.sol");
const TestCbetClaimFaucet = artifacts.require("./TestCbetClaimFaucet.sol");

const TOTAL_FAUCET_CAP = new BN(12_000).mul(Coin);
// Leave some addresses out of the claim faucet to test accounts not able to
// claim if not included.
const CLAIMER_ACCOUNT_COUNT = 4;
const EXPECTED_ACCOUNT_BALANCE = TOTAL_FAUCET_CAP.div(
  new BN(CLAIMER_ACCOUNT_COUNT)
);
const ZERO = new BN(0);

contract("CBET claim faucet", function (accounts) {
  let cbetToken;
  let rewardClaimFaucet;

  beforeEach(async () => {
    // Create Cbet token.
    // TODO: FIXME
    const cbetOwnerAccount = accounts[0];
    cbetToken = await CbetToken.new(cbetOwnerAccount);

    // Configure claimer info (claimers and their amounts).
    const claimerAccounts = accounts.slice(0, CLAIMER_ACCOUNT_COUNT);
    const claimerAmounts = Array(CLAIMER_ACCOUNT_COUNT).fill(
      TOTAL_FAUCET_CAP.div(new BN(CLAIMER_ACCOUNT_COUNT))
    );

    // Add an additional account that exceeds the cap. This is to validate
    // that no claim can be done passed the cap.
    claimerAccounts.push(accounts[CLAIMER_ACCOUNT_COUNT]);
    claimerAmounts.push(new BN(1_000).mul(Coin));

    // Instantiate a reward claim faucet contract with the corresponding
    // claimers and their amounts.
    rewardClaimFaucet = await TestCbetClaimFaucet.new(
      cbetToken.address,
      TOTAL_FAUCET_CAP,
      claimerAccounts,
      claimerAmounts
    );

    // Transfer all CBET tokens to faucet claim contract.
    const cbetBalance = await cbetToken.balanceOf(cbetOwnerAccount);
    await cbetToken.transfer(rewardClaimFaucet.address, cbetBalance);
  });

  it("Can see available reward", async () => {
    // Test setup.
    const expectedReward = EXPECTED_ACCOUNT_BALANCE;

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
    const sampleAccount = accounts[0];
    // Expected balance after the operation.
    const expectedAfterBalance = EXPECTED_ACCOUNT_BALANCE;

    // Get actual balance.
    const beforeBalance = await cbetToken.balanceOf(sampleAccount);

    // Method under test.
    // Claim reward.
    await rewardClaimFaucet.claim(sampleAccount, { from: sampleAccount });

    // Get actual after balance after claiming the reward.
    const afterBalance = await cbetToken.balanceOf(sampleAccount);

    // Expectations.
    // Expect that before and after balances are the expected ones.
    expect(beforeBalance.toString()).to.be.eq(ZERO.toString());
    expect(afterBalance.toString()).to.be.eq(expectedAfterBalance.toString());
  });

  it("No available reward after claim", async () => {
    // Test Setup.
    const sampleAccount = accounts[0];
    // Expected available reward before the claiming operation.
    const expectedRewardBefore = EXPECTED_ACCOUNT_BALANCE;

    // Method under test.
    const rewardBefore = await rewardClaimFaucet.getAvailableAmount({
      from: sampleAccount,
    });

    // Claim money.
    await rewardClaimFaucet.claim(sampleAccount, { from: sampleAccount });

    // Method under test. Available reward after claiming must be zero.
    const rewardAfter = await rewardClaimFaucet.getAvailableAmount({
      from: sampleAccount,
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
      await rewardClaimFaucet.claim(testAccount, { from: testAccount });
    } catch {
      // Should throw exception.
      actualThrow = true;
    }

    // Get balance after claim operation.
    const afterBalance = await cbetToken.balanceOf(testAccount);

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
      await rewardClaimFaucet.claim(account, { from: account });
    }

    // Method under test.
    // Get available reward for account after other claimers have reached cap.
    const rewardAfter = await rewardClaimFaucet.getAvailableAmount({
      from: otherAccount,
    });

    let actualThrow = false;
    try {
      // Method under test.
      await rewardClaimFaucet.claim(account, { from: testAccount });
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
