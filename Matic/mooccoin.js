import web3 from "./web3";
import MoocToken from "./build/MoocToken.json";

export default address => {
  return new web3.eth.Contract(MoocToken.abi, address);
};
