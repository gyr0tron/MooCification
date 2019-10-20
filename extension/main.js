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

// CONTRACT ADDRESS
const address = '0x09e68b6bd407612a3c7141f1a79a6eb621ac6e93'

// ACCOUNTS
window.accounts;
let serv_accounts;

// WEB3
let user_web3;
let serv_web3;

// Contract
let user_contract;
let server_contract;

// SEEDWORDS
const seedwords =
  "ranch hospital false mirror despair expose enable control consider security cute defy"
const user_seedwords =
  "chair inch unusual slam lava present office position address easy valley junior"

// window.login = async seedwords => {
//   const provider = new HDWalletProvider(
//     seedwords,
//     "https://testnet2.matic.network"
//   );
//   user_web3 = new Web3(provider);
//   // contract = new web3.eth.Contract(abi, address);
//   accounts = await user_web3.eth.getAccounts();
//   console.log("user logged in");
// };

window.user_login = async user_seedwords => {
  const provider = new HDWalletProvider(
    user_seedwords,
    "https://testnet2.matic.network"
  );
  user_web3 = new Web3(provider);
  user_contract = new user_web3.eth.Contract(abi, address);
  user_contract.options.gasPrice = "0";
  accounts = await user_web3.eth.getAccounts();
  console.log("user logged in", accounts);
  return accounts;
};

const serv_login = async seedwords => {
  const provider = new HDWalletProvider(
    seedwords,
    "https://testnet2.matic.network"
  );
  serv_web3 = new Web3(provider);
  server_contract = new serv_web3.eth.Contract(abi, address);
  server_contract.options.gasPrice = "0";
  serv_accounts = await serv_web3.eth.getAccounts();
  console.log("server logged in");
};

const serv_user_transfer = async (user_accounts, tokens) => {
  console.log(server_contract);
  console.log(user_accounts[0]);
  await contract.methods.transfer(user_accounts[0], tokens).send({
    from: serv_accounts[0]
  });
  console.log("init trans");
};

const user_serv_transfer = async (user_accounts, tokens) => {
  console.log(user_contract);
  console.log(user_accounts[0]);
  await user_contract.methods.transfer(serv_accounts[0], tokens).send({
    from: user_accounts[0]
  });
  console.log("init trans");
};


const get_balance = async(wallet_id) => {
  return user_contract.methods.balanceOf(wallet_id).div(1e18);
}

serv_login(seedwords);

// console.log(window.accounts);

//sinit_transfer();
