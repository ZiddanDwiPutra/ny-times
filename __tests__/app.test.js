/**
 * @jest-environment jsdom
 */

import App from "../src/app"
import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
const {localStorage} = window
const app = new App()

test("App init", ()=>{
    expect(app).toBeDefined()
})

test("App property is defined", () => {
    for(let prop of ["dialogType", "dialogSize", "appName", "userName", "coins", "tickets"]){
        expect(app[prop]).toBeDefined()
    }
})

test("App functions is defined", () => {
    const functions = ["toggleDialog", "setBalance", "getBalance", "showDialog", "refreshBalance", "closeDialog", "getMetadataFromMedia"]
    for(let prop of functions){
        expect(app[prop]).toBeDefined()
    }
})

test("init user balance 100.000", ()=>{
    StorageManager.addBalanceHistory({
        total: 100000,
        refId: "",
        refObject: "INITIAL_COINS",
        type: Balance.TYPE.COIN
    })
    expect(app.getBalance().coins).toBe(100000)
})