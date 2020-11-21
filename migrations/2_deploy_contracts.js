const BN = require("bn.js");
const { Coin } = require("../common/constants");
require("dotenv").config();

const DummyCBETTokenContract = artifacts.require("./DummyCBETBase.sol");
const TestCbetClaimFaucet = artifacts.require("./TestCbetClaimFaucet.sol");

module.exports = async (deployer) => {
  // Deploy CBET token contract.
  await deployer.deploy(
    DummyCBETTokenContract,
    "0xD1786b643d5E3e2baebbf8cAe485DAA2757BF642"
  );
  const cbetTokenContractInstance = await DummyCBETTokenContract.deployed();

  // Deploy dummy CBET token contract. Mint tokens to the specified address.
  await deployer.deploy(
    DummyCBETTokenContract,
    "0xD1786b643d5E3e2baebbf8cAe485DAA2757BF642"
  );
  await DummyCBETTokenContract.deployed();

  // Deploy a CBET claim faucet contract.
  await deployer.deploy(
    TestCbetClaimFaucet,
    DummyCBETTokenContract.address,
    new BN(105).mul(Coin), // Cap
    [
      "0xD1786b643d5E3e2baebbf8cAe485DAA2757BF642",
      "0x339E0EefDc3596d1844aB269a2ab9cad03B12619",
      "0xfFa83CA1bE3ED5412F0F3D1c6cC079730Cb0A2d3",
      "0x8366C406A9C21888a2C6Fc5cbf25206B9aEcC365",
      "0x2BE8b09A0c9c864618Cc5B88e03FB786A195418f",
      "0xdb5CC15EBFC948c901c7AB1E7a3Ce26Bca29fafb",
    ],
    [
      new BN(5).mul(Coin),
      new BN(10).mul(Coin),
      new BN(15).mul(Coin),
      new BN(20).mul(Coin),
      new BN(25).mul(Coin),
      new BN(30).mul(Coin),
    ]
  );
  await TestCbetClaimFaucet.deployed();

  // TODO: Send CBET tokens to faucet claim contract address.
};
