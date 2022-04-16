export default class StorageManager{
    static get KEY(){
        return {
            PURCHASED_ARTICLES: "PURCHASED_ARTICLES"
        }
    }
    static getPurchasedArticles(){
        let values = localStorage.getItem(this.KEY.PURCHASED_ARTICLES)
        if(values==null)return []
        return values.split(",")
    }
    
    static setPurchasedArticles(arr = []){
        localStorage.setItem(this.KEY.PURCHASED_ARTICLES, arr.join(","))
    }

    static addPurchasedArticles(id){
        let list = this.getPurchasedArticles();
        list.push(id);
        this.setPurchasedArticles(list);
    }
}