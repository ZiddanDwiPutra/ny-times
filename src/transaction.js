import Balance from "./balance"
import StorageManager from "./storageManager"

export default class Transaction{
    constructor(item = {id : ""}, type = Transaction.TYPE.COIN){
        this.itemId = item.id
        this.dateTime = new Date().toString()
        this.type = type
        this.item = item
    }

    purchase(){
        if(this.type == Transaction.TYPE.COIN) {
            this.price = this.item.priceNum
            StorageManager.addPurchasedArticles(this.item)
        }else if(this.type == Transaction.TYPE.TICKET){
            this.price = 1
        }

        this.saveTransaction()
    }

    saveTransaction(){
        const {itemId, dateTime, type, price} = this
        StorageManager.addTransactions({itemId, dateTime, type, price})
        if(this.type == Transaction.TYPE.COIN) this.saveBalanceHistory({itemId, price, type: Balance.TYPE.COIN})
        if(this.type == Transaction.TYPE.TICKET) this.saveBalanceHistory({itemId, price, type: Balance.TYPE.TICKET})
    }
    
    saveBalanceHistory({itemId, price, type}){
        StorageManager.addBalanceHistory({
            total: -price,
            refId: itemId,
            refObject: "transaction",
            type: type
        })
    }

    static get TYPE(){
        return {
            COIN: "COIN",
            TICKET: "TICKET"
        }
    }
}