/**
 * @jest-environment jsdom
 */

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
    expect(StorageManager.addPurchasedArticles(article)).toBeValid
    expect(StorageManager.getPurchasedArticles().length).toBe(1)
})
