import Lib from "./lib"

export default class StorageManager{
    static get KEY(){
        return {
            TRANSACTION: "TRANSACTION",
            PURCHASED_ARTICLES: "PURCHASED_ARTICLES"
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
}