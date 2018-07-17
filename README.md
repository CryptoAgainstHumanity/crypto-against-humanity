
## Crypto Against Humanity

- [Crypto Against Humanity](cryptoagainsthumanity.io)
- [Crypto Against Humanity Medium](https://medium.com/crypto-against-humanity)
- [Crypto Against Humanity Trello Board](https://trello.com/b/YkufNwH7/kanban)
- [Crypto Against Humanity Twitter](https://twitter.com/CryptoVHumanity)

### What is Crypto Against Humanity?
Crypto Against Humanity is a never ending game of Cards Against Humanity, where all participants compete to find the best matches. Crypto-economic primitives incentivize and reward card creation and curation. Users submit black cards to a Token Curated Registry and create white cards that each have an associated bonding curve market. Players participate by buying into the white cards that match best with the black card in the current round. One black card is chosen at random for the round every 12 hours. Players can make money by selling a white card they bought into early, or by creating black cards that the community deems valuable!

### How Can I Play?
We are still building Crypto Against Humanity, but you can test it out at CryptoAgainstHumanity.io! We are currently running it on the Ropsten test network, but plan to launch on mainnet as soon as possible!


### How Can I Deploy this Locally?
If you want to deploy and test locall you can do it in one of two ways, the normal way with caching, or the 'stale' way without.

To deploy with a stale version of our site locally, all you need to do is:
1. Clone this repo.
2. Run 'npm i' to install necessary packages
3. Run 'npm start'

Simple as that. To deploy with Caching, for the true interactive expirence, there are a few more steps.
1. Be sure to have a infura keys available, you can get them from [here](https://infura.io/)
2. Clone this repo.
3. Run 'npm i' to install necessary packages
4. Run 'npm install forever -g' to install forever
5. CD into the 'caching' directory
6. Edit 'infuraKey.json' with your ROPSTEN infura key.
7. Edit 'ipfsKey.json' and think up any key -- you'll need this later.
8. Run 'node initializeCache.js' This will initialize your cache.
9. Once this script has completed, run 'forever start refreshCache.js'
10. Run 'REACT_APP_IPFS_KEY="YOUR-IPFS-KEY" npm start' where 'YOUR-IPFS-KEY' is the key you entered into the json file earlier.
11. If you wish to stop your cache, run 'forever stopall'

