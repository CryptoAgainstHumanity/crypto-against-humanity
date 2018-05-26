pragma solidity ^0.4.17;

contract WhiteCardFactory {
    address[] public whiteCards;
    
    function addWhiteCard(string _ipfsHash) public {
        address _whiteCard = new WhiteCard(_ipfsHash, msg.sender);
        whiteCards.push(_whiteCard);
    }
}
contract WhiteCard {
    
    string public ipfsHash;
    address public creator;
    
    constructor(string _ipfsHash, address _creator) public {
        ipfsHash = _ipfsHash;
        creator = _creator;
    }
}
