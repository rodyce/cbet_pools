# CryptoBet CBET pools.

Install npm dependencies

```sh
$ npm install
```

Then, run Ganache-CLI to be able to run unit tests

```sh
$ npx ganache-cli
```

Lastly, run the unit tests with `truffle`:

```sh
$ npx truffle test
```

Once everything is working fine, proceed to deploy to a network with `truffle migrate`.
By default, `truffle` uses the _'development'_ network configured in the _truffle-config.js_
file. You may also want to use the _--reset_ to force redeployment.

```sh
$ npx truffle migrate --network <network in truffle-config.js file>
```

The target network to perform migration is controlled by the \$NETWORK_NAME environment variable.

For reference regarding more environment variables, consult **.env.example** file. You can set the mnemonics to use when migrating and the _Infura_ keys to perform migrations.

## Testing with Ganache
In order to test your development, you may use _Ganache_ by connecting your **MetaMask** to it. You will need a set of predefined addresses with balances in order to test. To do so, follow the next steps:

1. Start Ganache with a set of predefined addresses with balances. Run the **start-ganache-test.sh** script located under the **scripts** directory.

```sh
$ sh scripts/start-ganache-test.sh
```

After running this command you will get a summary with each deployed contract and its deployed address.

2. With your MetaMask connected to the Ganache network, register the _private keys_ by selecting **Import Account** in the MetaMask options accessible by clicking the icon in the upper right corner. The following table contains the private keys and their corresponding ETH address with their assigned balances.

| Private Key                                                        |                ETH Address                 |   Cool |
| ------------------------------------------------------------------ | :----------------------------------------: | -----: |
| 0xfef426581d87ae07a218d570311e2f92489cb422e7da475068d6ed0f4ae82dda | 0xD1786b643d5E3e2baebbf8cAe485DAA2757BF642 |  ETH 5 |
| 0x39891bd103362f90e7d611e374e06039c4d1f90611ac75a0dfe86474952c0a3b | 0x339E0EefDc3596d1844aB269a2ab9cad03B12619 | ETH 10 |
| 0x57320ee5909a1dcc82109bdc8b5a5ff8c6a1d65ecbae1f701cb7c8369634b695 | 0xfFa83CA1bE3ED5412F0F3D1c6cC079730Cb0A2d3 | ETH 15 |
| 0x9592a05a94e8662b533aa901a772c136e1cfbc1854704647b7bd7d795490e76d | 0x8366C406A9C21888a2C6Fc5cbf25206B9aEcC365 | ETH 20 |
| 0x345efe73b8eda1ff208648db31b6dece9138832d584515fb5b81ffd721f7209d | 0x2BE8b09A0c9c864618Cc5B88e03FB786A195418f | ETH 25 |
| 0xebe00bfc086112f75dd617ca51f63c57ab9dbb63224a9f69774b4198fe7a6f9e | 0xdb5CC15EBFC948c901c7AB1E7a3Ce26Bca29fafb | ETH 30 |

3. Migrate and deploy the contracts with **truffle**. To do so, run:

```sh
$ npx truffle migrate
```

4. Feel free to experiment. Select the account you want to work with in MetaMask.
