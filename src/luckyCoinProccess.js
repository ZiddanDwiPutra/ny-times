import Balance from "./balance"
import Lib from "./lib"
import StorageManager from "./storageManager"

export default class LuckyCoinProccess{
    constructor(){
        this.items = [50, 20, 10, 15, 0, 0, 20, 10, 15, 5, 5, 0, 10, 20, 0, 10, 15, 20, 10, 5, 0]
    }
    execute(){
        const isGot50k = StorageManager.getBalanceHistoryWithRefObject(Balance.TYPE.COIN, "lucky_coin").find(obj=>obj.total==50000)
        console.log(this)
        const reward = this.items[Math.floor(Math.random()*this.items.length)]
        let luckyCoin = {reward, text: ""}
        if(reward!=0) luckyCoin.reward = luckyCoin.reward * 1000
        else if(reward==50 && isGot50k!=undefined)luckyCoin.reward = 20000
        
        const coinDigit = Lib.setToDigitFormat(luckyCoin.reward);
        if(reward==0)luckyCoin.text = "Sorry you are not lucky, Try Again"
        else luckyCoin.text = `congrats you got ${coinDigit} NYT Coins`
        return luckyCoin;
    }
}