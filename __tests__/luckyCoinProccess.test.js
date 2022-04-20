/**
 * @jest-environment jsdom
*/

import Balance from "../src/balance";
import LuckyCoinProccess from "../src/luckyCoinProccess"
import StorageManager from "../src/storageManager"
const {localStorage} = window

const process = new LuckyCoinProccess();
var luckyCoin = undefined
test("try draw lucky coin", ()=>{
    luckyCoin = process.execute();
    expect(luckyCoin).toBeDefined()
})

test("after get a free coin, put the reward in balance history as refObject 'lucky_coin'", ()=>{
    StorageManager.addBalanceHistory({
        total: luckyCoin.reward,
        refObject: "lucky_coin",
        type: Balance.TYPE.COIN
    })
    let allRewards = StorageManager.getBalanceHistoryWithRefObject(Balance.TYPE.COIN, "lucky_coin")
    expect(allRewards.find(e=>e.total == luckyCoin.reward)).toBeDefined()
})

test("in lucky coin only get 50K just once", ()=>{})
test("put 50.000 as reward from lucky coin for test", ()=>{
    StorageManager.addBalanceHistory({
        total: 50000,
        refObject: "lucky_coin",
        type: Balance.TYPE.COIN
    })
})

test("run 100x draw and collect to array for check only once 50K", ()=>{})

test("------------ running 100x draw  -----------", ()=>{
    var arrayCoinRewards = []
    let idx = 0
    while(idx < 100){
        let proc = new LuckyCoinProccess()
        arrayCoinRewards.push(proc.execute().reward)
        idx++
    }
    // console.log(arrayCoinRewards)
    // check in 100x draw has 50000 or not
    expect(arrayCoinRewards.includes(50000)).toBe(false)
})