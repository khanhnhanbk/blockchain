const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('62a0634a53171d1ecc6b2c015f06856367e6df585ebde222069bd802b71be1f4');
const myWalletAddress = myKey.getPublic('hex');

const anotherKey = ec.keyFromPrivate('e1f2c51debc92cfad2fffd9196e10e000a5160da417bfbce36d5cee6edc9b350');   
const anotherWalletAddress = anotherKey.getPublic('hex');

let myCoin = new Blockchain(3);

const tx1 = new Transaction(myWalletAddress, anotherWalletAddress, 10);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
myCoin.miningPendingTransactions(myWalletAddress);
console.log('\n Balance of me is', myCoin.checkBalance(myWalletAddress));
console.log('\n Balance of another', myCoin.checkBalance(anotherWalletAddress));

console.log('\n Starting the miner again...');
myCoin.miningPendingTransactions(myWalletAddress);
console.log('\n Balance of me', myCoin.checkBalance(myWalletAddress));
console.log('\n Balance of another', myCoin.checkBalance(anotherWalletAddress));