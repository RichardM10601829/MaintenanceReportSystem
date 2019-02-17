/*module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};*/


var HDWalletProvider = require("truffle-hdwallet-provider");
const secret = require('./secret')
const mnemonic = secret.mnemonic

module.exports = {
  networks: {
    development: {
      provider: new HDWalletProvider(
        mnemonic,
        "http://127.0.0.1:8545",
        0,
        1,
        true,
        "m/44'/237'/0'/0/",
      ),
      network_id: "*",
      host: "localhost",
      port: 8545,
    },
  }
};
