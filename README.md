
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
If you want to deploy and test locall you can do it in one of two ways, the 'fast' way with caching, or the 'slow' way without.

To deploy with a slow version of our site locally, all you need to do is:
1. Clone this repo.
2. Run 'npm i' to install necessary packages
3. Run 'npm start'

Simple as that. To deploy with Caching, for a 'fast' loading expirence, there are a few more steps.
1. Be sure to have a infura keys available, you can get them from [here](https://infura.io/)
2. Clone this repo.
3. Run 'npm i' to install necessary packages
4. CD into the 'caching' directory
5. Edit 'infuraKey.json' with your ROPSTEN infura key.
6. Edit 'ipfsKey.json' and think up any key -- you'll need this later.
7. Run 'node initializeCache.js' This will begin the 10 minute process of syncing your new cache on IPFS with the web3 events that have occured on our contracts. You can leave this running while developing to continually sync the cache.
8. Open a new terminal and cd into our crypto-against-humanity
9. Run 'REACT_APP_IPFS_KEY="YOUR-IPFS-KEY" npm start' where 'YOUR-IPFS-KEY' is the key you entered into the json file earlier.

