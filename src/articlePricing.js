import Lib from "./lib";

export default class ArticlePricing{
    constructor(article){
        Object.assign(this, article)
        this.setPrice()
    }

    setPrice(){
        const today = new Date()
        const articleDate = new Date(this.published_date)

        const dateRange = this.getDateRange(today, articleDate)
        if(dateRange <= 1)this.priceNum = 50000
        else if(dateRange <= 7)this.priceNum = 20000
        else this.priceNum = 0

        this.setToPriceFormat()
    }

    getDateRange(dateA, dateB){
        const dateAFormat = Lib.dateFormat(dateA)
        
        let rangeCount = 0
        let dateBFormat = Lib.dateFormat(dateB)
        while(dateAFormat != dateBFormat){
            dateB.setDate(dateB.getDate()+1)
            dateBFormat = Lib.dateFormat(dateB)
            rangeCount++
        }
        return rangeCount
    }

    setToPriceFormat(){
        let reversePrice = String(this.priceNum).split("").reverse()
        let separator = 0
        let result = ""
        for(let i of reversePrice){
            if(separator==3){
                result += "."
                separator = 0
            }
            result += i
            separator++
        }
        this.price = result.split("").reverse().join("")
    }
}