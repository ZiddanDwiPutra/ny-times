/**
 * @jest-environment jsdom
 */

import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
import Transaction from "../src/transaction"
const {localStorage} = window
const balance = new Balance()

function initCoinBalance(total){
    StorageManager.addBalanceHistory({
        total,
        type: Balance.TYPE.COIN
    })
}

function initTicketBalance(total){
    StorageManager.addBalanceHistory({
        total,
        type: Balance.TYPE.TICKET
    })
}



function transactionArticle(priceNum, callback){
    const article = {id: "test", priceNum: 20000}
    const transaction = new Transaction(article, Transaction.TYPE.COIN)
    if(true) transaction.purchase()
}

test("init 100.000 Coin balance for test transaction", ()=>initCoinBalance(100000))

test("buy article with total price 20.000", ()=>{
    transactionArticle(20000)
    expect(StorageManager.getLastTotalPurchasing()).toBe(20000)
})

test("remaining coins owned must be 80.000", ()=>{
    expect(new Balance().coins).toBe(80000)
})

test("buy article with total price 50.000 coins for get 3 lucky ticket", ()=>{
    transactionArticle(30000, ({isMoreEqual50k})=>{
        expect(isMoreEqual50k).toBe(true)
    })
})

test("init 3 Ticket balance because purchasing article with total price 50.000 coins", ()=>{
    initTicketBalance(3)
    expect(new Balance().tickets).toBe(3)
})

test("transaction from lucky coin (1 ticket usage)", ()=>{
    const transaction = new Transaction({id: "ticket1"}, Transaction.TYPE.TICKET)
    if(true) transaction.purchase()
    const allTicketTransaction = StorageManager.getTransactions().filter(obj=>obj.type == Transaction.TYPE.TICKET)
    expect(allTicketTransaction.length).toBe(1)
})

test("remaining tickets owned must be 2", ()=>{
    expect(new Balance().tickets).toBe(2)
})
