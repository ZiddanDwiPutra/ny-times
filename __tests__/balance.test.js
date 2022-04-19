/**
 * @jest-environment jsdom
 */

import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
const {localStorage} = window
const balance = new Balance()

test("Balance init", ()=>{
    expect(balance).toBeDefined()
})

test("coins & tickets is defined", ()=>{
    expect(balance.coins).toBeDefined()
    expect(balance.tickets).toBeDefined()
})

test("balance type is defined", ()=>{
    expect(Balance.TYPE.COIN).toBeDefined()
    expect(Balance.TYPE.TICKET).toBeDefined()
})

test("get total history by type", ()=>{
    // start coins is 0
    expect(balance.getTotalInHistory(Balance.TYPE.COIN)).toBe(0)
    
    //add coin 1000
    StorageManager.addBalanceHistory({total: 1000, type: Balance.TYPE.COIN})
    //check is coin 1000
    expect(balance.getTotalInHistory(Balance.TYPE.COIN)).toBe(1000)
    
    //subtract coins by 500
    StorageManager.addBalanceHistory({total: -500, type: Balance.TYPE.COIN})
    //check is coin has been substract
    expect(balance.getTotalInHistory(Balance.TYPE.COIN)).toBe(500)

    // start ticket is 0
    expect(balance.getTotalInHistory(Balance.TYPE.TICKET)).toBe(0)
    //add tickets 3
    StorageManager.addBalanceHistory({total: 3, type: Balance.TYPE.TICKET})
    //check is TICKETS 3
    expect(balance.getTotalInHistory(Balance.TYPE.TICKET)).toBe(3)
    
    //subtract TICKETS by 1
    StorageManager.addBalanceHistory({total: -1, type: Balance.TYPE.TICKET})
    //check is TICKETS has been substract
    expect(balance.getTotalInHistory(Balance.TYPE.TICKET)).toBe(2)
})