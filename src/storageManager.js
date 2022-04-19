import Lib from "./lib"

export default class StorageManager{
    static get KEY(){
        return {
            TRANSACTION: "TRANSACTION",
            PURCHASED_ARTICLES: "PURCHASED_ARTICLES",
            BALANCE_HISTORY: "BALANCE_HISTORY",
            USER_NAME: "USER_NAME",
            TOTAL_PURCHASING: "TOTAL_PURCHASING",
        }
    }

    static getPurchasedArticles(){return Lib.getFromStorage(this.KEY.PURCHASED_ARTICLES, true)}
    
    static addPurchasedArticles(article){
        Lib.addToStorage(this.KEY.PURCHASED_ARTICLES, article, true)
    }

    static getTransactions(){return Lib.getFromStorage(this.KEY.TRANSACTION, true)}
    
    static addTransactions(transaction){
        Lib.addToStorage(this.KEY.TRANSACTION, transaction, true)
    }

    static getBalanceHistory(type){
        return Lib.getFromStorage(this.KEY.BALANCE_HISTORY, true).filter(obj=>obj.type == type)
    }

    static getBalanceHistoryWithRefObject(type, refObject){
        return Lib.getFromStorage(this.KEY.BALANCE_HISTORY, true).filter(obj=>obj.type == type && obj.refObject == refObject)
    }
    
    static addBalanceHistory({total, refId, refObject, type}){
        Lib.addToStorage(this.KEY.BALANCE_HISTORY, {total, refId, refObject, type}, true)
    }

    static getUserName(){
        return localStorage.getItem(this.KEY.USER_NAME)
    }

    static setUserName(value){
        localStorage.setItem(this.KEY.USER_NAME, value)
    }

    static getLastTotalPurchasing(){
        const value = localStorage.getItem(this.KEY.TOTAL_PURCHASING)
        return value == null ? 0 : Number(value)
    }
    static setLastTotalPurchasing(value){
        localStorage.setItem(this.KEY.TOTAL_PURCHASING, value)
    }

}