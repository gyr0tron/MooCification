const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

// ABI
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initialSupply",
        type: "uint256"
      }
    ],
    payable: true,
    stateMutability: "payable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "standard",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

// ADDRESS
const address = "0x09e68b6bd407612a3c7141f1a79a6eb621ac6e93";

const seedwords =
  "ranch hospital false mirror despair expose enable control consider security cute defy";

let account;
let contract;

const serv_user_transfer = async (user_account, tokens) => {
  console.log(contract);
  console.log(user_account);
  await contract.methods.transfer(user_account, tokens).send({
    from: account
  });
  console.log("done transaction");
};

const login = async () => {
  const provider = new HDWalletProvider(
    seedwords,
    "https://testnet2.matic.network"
  );
  web3 = new Web3(provider);
  contract = new web3.eth.Contract(abi, address);
  contract.options.gasPrice = "0";
  accounts = await web3.eth.getAccounts();
  console.log("server logged in", accounts);
  account = accounts[0];
};

module.exports = { serv_user_transfer, login };
// console.log(window.accounts);

//sinit_transfer();
