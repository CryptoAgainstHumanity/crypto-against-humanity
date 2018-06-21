var Web3 = require('web3');
var infuraKey = require('./keys/infuraKey.json');
var IPFS_KEY = require('./keys/ipfsKey.json');
var ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

console.log("Getting Contracts");
try {
	web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/" + infuraKey));
} catch(err) {
	web3 = "undefined";
}


const address = "0xb2849e2b554c4a36a1d438642f5d1a8a18033c15";
const WhiteCardFactoryAbi = [
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

var WhiteCardFactory = "undefined";
if (web3 != "undefined") {
	WhiteCardFactory = new web3.eth.Contract(WhiteCardFactoryAbi, address);
} else {
	console.log("Unable to get white card factory contract from web3")
}

const EthPolynomialCurveTokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"numTokens","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"exponent","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"numTokens","type":"uint256"}],"name":"getBurningReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"poolBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"numTokens","type":"uint256"}],"name":"mint","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"numTokens","type":"uint256"}],"name":"priceToMint","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"numTokens","type":"uint256"}],"name":"rewardForBurn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"numTokens","type":"uint256"}],"name":"getMintingPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"symbol","type":"string"},{"name":"_exponent","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"totalCost","type":"uint256"},{"indexed":false,"name":"caller","type":"address"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"reward","type":"uint256"},{"indexed":false,"name":"caller","type":"address"}],"name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
var EthPolynomialCurveToken = "undefined";
if (web3 != "undefined") {
	EthPolynomialCurveToken = new web3.eth.Contract(EthPolynomialCurveTokenAbi);
} else {
	console.log("Unable to get curve contract from web3")
}


const whiteCardAbi = [
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
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
		"name": "ipfsHash",
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
		"inputs": [],
		"name": "bondingCurve",
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
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"name": "_creator",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

var WhiteCard = "undefined";
if (web3 != "undefined") {
	WhiteCard = new web3.eth.Contract(whiteCardAbi);
} else {
	console.log("Unable to get white card contract from web3")
}


ipfs.files.mkdir('/' + IPFS_KEY, {parents:true}, async (err) => {
  	if (!err) {
	  	console.log("Created IPFS Directory");
		ipfs.files.stat('/' + IPFS_KEY + '/' , (err, stats) => {
	      if (!err){
	        ipfs.pin.add(stats.hash, function (err) {
		      if (!err) {
		        console.log("Pinned IPFS Directory");
		      }
		    })
	      }
	    })
	}
})

var EventLog = {
	CreateEvents: [],
	MintBurnEvents: []
};

var whiteCardEvents = [];
var numCards = 9999999999
setTimeout(getWhiteCardCreatedEvents, 5000);
setTimeout(getMintBurnEvents, 5000);


function getWhiteCardCreatedEvents() {
	console.log("Getting White Card Created Events");
	WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
	fromBlock: 3418530,
	toBlock: 'latest'
	}, async (err, events) => {
		numCards = events.length;
		for(var i = 0; i < events.length; i++) {
			WhiteCard.options.address = events[i].returnValues.card;
			let bondingCurveTokenAddress = await WhiteCard.methods.bondingCurve().call();
			let ipfsHash = await WhiteCard.methods.ipfsHash().call()
			let text = (await ipfs.object.data(ipfsHash)).toString('utf8')
	       	EventLog.CreateEvents.push({
	       		txHash: events[i].transactionHash,
	       		cardAddress: events[i].returnValues.card,
	       		blockNumber: events[i].blockNumber,
	       		tokenAddress: bondingCurveTokenAddress,
	       		text: text
	        })
		}
	})
}

function getMintBurnEvents() {
	if (EventLog.CreateEvents.length == numCards) {
		console.log("Got Create Events");
		setTimeout(cacheHelper, 60000);
		var mintBurnEvents = [];
		for (var i = 0; i < EventLog.CreateEvents.length; i++) {
			EthPolynomialCurveToken.options.address = EventLog.CreateEvents[i].tokenAddress;
			EthPolynomialCurveToken.getPastEvents(['Minted', 'Burned'], {
			fromBlock: 3418530,
			toBlock: 'latest'
			}, async (err, events) => {
				for(var j = 0; j < events.length; j++) {
					if (events[j].event == "Minted") {
				       	EventLog.MintBurnEvents.push({
				       		txHash: events[j].transactionHash,
				       		blockNumber: events[j].blockNumber,
				       		type: events[j].event,
				       		amount: events[j].returnValues.amount,
				       		costReward: events[j].returnValues.totalCost,
				       		caller: events[j].returnValues.caller,
				       		tokenAddress: events[j].address,
				       		blockNumber: events[j].blockNumber
				        })
			       	} else {
				       	EventLog.MintBurnEvents.push({
				       		txHash: events[j].transactionHash,
				       		blockNumber: events[j].blockNumber,
				       		type: events[j].event,
				       		amount: events[j].returnValues.amount,
				       		costReward: events[j].returnValues.reward,
				       		caller: events[j].returnValues.caller,
				       		tokenAddress: events[j].address,
				       		blockNumber: events[j].blockNumber
				        })
			       	}
				}
			})
		}
	} else {
		setTimeout(getMintBurnEvents, 1000);
		process.stdout.write('.')
	}
} 

function cacheHelper() {
	setTimeout(startContinuousCaching, 10000);
	uploadCache();
}


var isUpdatingIpfs = false;
var lastEventLogLength = 0;
var lastCreateEventLogLength = 0
var lastMintBurnEventLogLength = 0
function uploadCache() {
	var eventLog = JSON.parse(JSON.stringify(EventLog));
	var logLength = eventLog.CreateEvents.length + eventLog.MintBurnEvents.length;
	if (!isUpdatingIpfs && lastEventLogLength != logLength) {
		lastEventLogLength = logLength
		if (lastCreateEventLogLength != eventLog.CreateEvents.length) {
			console.log("New Create Events!")
			for (var i = lastCreateEventLogLength; i < eventLog.CreateEvents.length; i++) {
				setInterval(refreshMintBurnCache, 5000, eventLog.CreateEvents[i].tokenAddress);
			}
			lastCreateEventLogLength = eventLog.CreateEvents.length
		}
		if (lastMintBurnEventLogLength != eventLog.MintBurnEvents.length) {
			console.log("New Mint/Burn Events!")
			lastMintBurnEventLogLength = eventLog.MintBurnEvents.length
		}
		isUpdatingIpfs = true;
		console.log("Uploading to IPFS...")
		 var content = JSON.stringify(EventLog)
	     ipfs.files.write('/' + IPFS_KEY + '/eventCache.json', Buffer.from(content), {create:true, truncate:true}, (err) => {
	      if (!err) {
	      	console.log("Success!")
	      	isUpdatingIpfs = false;
	      }
	    })
 	}
}

var isCachingCreateEvents = false;
var isCachingMintBurnEvents = false;
function startContinuousCaching() {
	setInterval(refreshCreateCache, 1000);
}

function refreshCreateCache() {
	if (!isCachingCreateEvents){
		isCachingCreateEvents = true;

		WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
		fromBlock: 3418530,
		toBlock: 'latest'
		}, async (err, events) => {
			for(var i = EventLog.CreateEvents.length; i < events.length; i++) {
				WhiteCard.options.address = events[i].returnValues.card;
				let bondingCurveTokenAddress = await WhiteCard.methods.bondingCurve().call();
				let ipfsHash = await WhiteCard.methods.ipfsHash().call()
				let text = (await ipfs.object.data(ipfsHash)).toString('utf8')
		       	EventLog.CreateEvents.push({
		       		txHash: events[i].transactionHash,
		       		cardAddress: events[i].returnValues.card,
		       		blockNumber: events[i].blockNumber,
		       		tokenAddress: bondingCurveTokenAddress,
		       		text: text
		        })
			}
			isCachingCreateEvents = false;
		})
		uploadCache();
	}
}

function refreshMintBurnCache(tokenAddress){
	var eventLog = JSON.parse(JSON.stringify(EventLog));
	EthPolynomialCurveToken.options.address = tokenAddress;
	EthPolynomialCurveToken.getPastEvents(['Minted', 'Burned'], {
	fromBlock: 3418530,
	toBlock: 'latest'
	}, async (err, events) => {
		for(var j = 0; j < events.length; j++) {
			var isNew = true;
			for (var k = 0; k < eventLog.MintBurnEvents.length; k++){
				if (events[j].transactionHash == eventLog.MintBurnEvents[k].txHash){
					isNew = false;
				}
			}
			if (isNew) {
				if (events[j].event == "Minted") {
			       	EventLog.MintBurnEvents.push({
			       		txHash: events[j].transactionHash,
			       		blockNumber: events[j].blockNumber,
			       		type: events[j].event,
			       		amount: events[j].returnValues.amount,
			       		costReward: events[j].returnValues.totalCost,
			       		caller: events[j].returnValues.caller,
			       		tokenAddress: events[j].address,
			       		blockNumber: events[j].blockNumber
			        })
		       	} else {
			       	EventLog.MintBurnEvents.push({
			       		txHash: events[j].transactionHash,
			       		blockNumber: events[j].blockNumber,
			       		type: events[j].event,
			       		amount: events[j].returnValues.amount,
			       		costReward: events[j].returnValues.reward,
			       		caller: events[j].returnValues.caller,
			       		tokenAddress: events[j].address,
			       		blockNumber: events[j].blockNumber
			        })
		       	}
	       	}
		}
	})

}











