import web3 from '../web3';

// const address = '0x9b7a5781f8d6f43cf3a0326fcf17f75744ad22aa';
const address = '0x107c9d25d9d626b51ef07df255ac0e4766850b56'

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "challenges",
    "outputs": [
      {
        "name": "rewardPool",
        "type": "uint256"
      },
      {
        "name": "challenger",
        "type": "address"
      },
      {
        "name": "resolved",
        "type": "bool"
      },
      {
        "name": "stake",
        "type": "uint256"
      },
      {
        "name": "totalTokens",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "listings",
    "outputs": [
      {
        "name": "applicationExpiry",
        "type": "uint256"
      },
      {
        "name": "whitelisted",
        "type": "bool"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "unstakedDeposit",
        "type": "uint256"
      },
      {
        "name": "challengeID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "parameterizer",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "voting",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_tokenAddr",
        "type": "address"
      },
      {
        "name": "_plcrAddr",
        "type": "address"
      },
      {
        "name": "_paramsAddr",
        "type": "address"
      },
      {
        "name": "_name",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "deposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "appEndDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "data",
        "type": "string"
      },
      {
        "indexed": true,
        "name": "applicant",
        "type": "address"
      }
    ],
    "name": "_Application",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "data",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "commitEndDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "revealEndDate",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "challenger",
        "type": "address"
      }
    ],
    "name": "_Challenge",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "added",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "newTotal",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "withdrew",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "newTotal",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_Withdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      }
    ],
    "name": "_ApplicationWhitelisted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      }
    ],
    "name": "_ApplicationRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      }
    ],
    "name": "_ListingRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      }
    ],
    "name": "_ListingWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      }
    ],
    "name": "_TouchAndRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "rewardPool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalTokens",
        "type": "uint256"
      }
    ],
    "name": "_ChallengeFailed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "listingHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "rewardPool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalTokens",
        "type": "uint256"
      }
    ],
    "name": "_ChallengeSucceeded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "reward",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "_RewardClaimed",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "apply",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "exit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      },
      {
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "challenge",
    "outputs": [
      {
        "name": "challengeID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "updateStatus",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_challengeID",
        "type": "uint256"
      },
      {
        "name": "_salt",
        "type": "uint256"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_voter",
        "type": "address"
      },
      {
        "name": "_challengeID",
        "type": "uint256"
      },
      {
        "name": "_salt",
        "type": "uint256"
      }
    ],
    "name": "voterReward",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "canBeWhitelisted",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "isWhitelisted",
    "outputs": [
      {
        "name": "whitelisted",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "appWasMade",
    "outputs": [
      {
        "name": "exists",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "challengeExists",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_listingHash",
        "type": "bytes32"
      }
    ],
    "name": "challengeCanBeResolved",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_challengeID",
        "type": "uint256"
      }
    ],
    "name": "determineReward",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_challengeID",
        "type": "uint256"
      },
      {
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "tokenClaims",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

var contract = "undefined";
if (web3 !== "undefined") {
  contract = new web3.eth.Contract(abi, address);
}
export default contract;
