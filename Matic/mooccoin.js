const web3 = require('./web3')
const MoocToken = require('./build/MoocToken.json')

const mooccoin = address => {
  return new web3.eth.Contract(MoocToken.abi, address);
};

module.exports = {mooccoin}