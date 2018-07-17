import web3 from '../web3';

const address = "0xb2849e2b554c4a36a1d438642f5d1a8a18033c15";
//const address = "0x00efbf6a7333c6c6be5c8fa2e368b111a8a0b074"; OLD ADDRESS THAT DOESN'T EMIT ADDRESS ON BURN AND MINT EVENTS
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

var contract = "undefined";
if (web3 !== "undefined") {
	contract = new web3.eth.Contract(abi, address);
}
export default contract;
