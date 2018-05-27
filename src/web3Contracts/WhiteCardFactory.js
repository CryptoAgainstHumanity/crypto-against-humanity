import web3 from '../web3';

const address = "0x00efbf6a7333c6c6be5c8fa2e368b111a8a0b074";
//const address = '0x832d7a0b176cef6051064e3137ce4b65fbdfd1bb'; OLD ADDRESS WITHOUT DUPLICATE CHECKING
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "card",
				"type": "address"
			}
		],
		"name": "_WhiteCardCreated",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addWhiteCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);
