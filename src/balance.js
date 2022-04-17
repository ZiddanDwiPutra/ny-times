import Lib from "./lib"
import StorageManager from "./storageManager"

export default class Balance{
    constructor(){
        this.coins = this.getCurrentCoins()
        this.tickets = this.getCurrentTickets()
    }

    getCurrentCoins(){return this.getTotalInHistory(Balance.TYPE.COIN)}
    getCurrentTickets(){return this.getTotalInHistory(Balance.TYPE.TICKET)}

    getTotalInHistory(type){
        const allHistory = StorageManager.getBalanceHistory(type).map(obj=> obj.total)
        return Lib.arraySum(allHistory)
    }

    static get TYPE(){
        return{
            COIN: "COIN",
            TICKET: "TICKET"
        }
    }
}