/**
 * @jest-environment jsdom
 */

import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
const {localStorage} = window

test("StorageManager is Defined", ()=>{
    expect(StorageManager).toBeDefined()
})
test("StorageManager all key is defined", ()=>{
    expect(StorageManager.KEY.BALANCE_HISTORY).toBeDefined()
    expect(StorageManager.KEY.PURCHASED_ARTICLES).toBeDefined()
    expect(StorageManager.KEY.TOTAL_PURCHASING).toBeDefined()
    expect(StorageManager.KEY.TRANSACTION).toBeDefined()
    expect(StorageManager.KEY.USER_NAME).toBeDefined()
})

test("add and get purchased articles", ()=>{
    const article = {id: "test", title: "test"}
    StorageManager.addPurchasedArticles(article)
    expect(StorageManager.getPurchasedArticles().length).toBe(1)
})

test("add and get balance history", ()=>{
    const balanceHistory = {
        total: 1000,
        refObject: "test",
        type: Balance.TYPE.COIN
    }
    StorageManager.addBalanceHistory(balanceHistory)
    
    // select by type coin
    expect(StorageManager.getBalanceHistory(Balance.TYPE.COIN).length).toBe(1)
    
    // select by type tickets
    expect(StorageManager.getBalanceHistory(Balance.TYPE.TICKET).length).toBe(0)

    // select by type coin and refObject test
    expect(StorageManager.getBalanceHistoryWithRefObject(Balance.TYPE.COIN, "test").length).toBe(1)
})