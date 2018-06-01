import Web3 from 'web3';

var web3 = "undefined"
try {
	web3 = new Web3(window.web3.currentProvider);
} catch(err) {
	web3 = "undefined";
}

export default web3;