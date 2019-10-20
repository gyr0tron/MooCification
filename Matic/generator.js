const web3 = require('web3')
const compiledGenerator = require('./build/MoocToken.json')
const keys = require('../.env')

const abi = compiledGenerator.abi;
const bytecode = compiledGenerator.evm.bytecode.object;

const instance = new web3.eth.Contract(abi, keys.ADDRESS);

module.exports = {instance}