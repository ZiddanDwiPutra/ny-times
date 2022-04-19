import Balance from "./balance"
import StorageManager from "./storageManager"

export default class Transaction{
    constructor(item = {id : ""}, type = Transaction.TYPE.COIN){
        this.itemId = item.id
        this.dateTime = new Date().toString()
        this.type = type
        this.item = item
        this.callback = undefined // interface for callback
    }

    setCallback(callback){
        this.callback = callback
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
        if(this.type == Transaction.TYPE.COIN) {
            this._saveBalanceHistory({itemId, price, type: Balance.TYPE.COIN})
            this._saveLastTotalPurchasing(price)
        }if(this.type == Transaction.TYPE.TICKET) this._saveBalanceHistory({itemId, price, type: Balance.TYPE.TICKET})
    }
    
    _saveBalanceHistory({itemId, price, type}){
        StorageManager.addBalanceHistory({
            total: -price,
            refId: itemId,
            refObject: "transaction",
            type: type
        })
    }

    _saveLastTotalPurchasing(total){
        const lastTotal = StorageManager.getLastTotalPurchasing() + total
        const isMoreEqual50k = lastTotal >= 50000
        StorageManager.setLastTotalPurchasing( isMoreEqual50k ? 0 : lastTotal)
        if(this.callback) this.callback({isMoreEqual50k})
    }

    static get TYPE(){
        return {
            COIN: "COIN",
            TICKET: "TICKET"
        }
    }
}