const BN = require("bn.js");

const Ten = new BN(10);
const Coin = Ten.pow(new BN(18));
const DefinCoinCap = new BN(36_000).mul(Coin);

module.exports = { DefinCoinCap, Coin };
