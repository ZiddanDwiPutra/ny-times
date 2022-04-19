import Components from "../styles/Components.module.css"
import img from "../public/assets/wavy_gen.jpg"
import WavyBus from "../public/assets/wavy_bus.jpg"
import happy from "../public/assets/happy.jpg"
import unlucky from "../public/assets/unlucky.jpg"
import Image from "next/image"
import Balance from "../src/balance"
import Transaction from "../src/transaction"
import LuckyCoinProccess from "../src/luckyCoinProccess"
import StorageManager from "../src/storageManager"

export default function LuckyCoin({ app }){
    return (
        <div className={Components.pageBox + " container-fluid"}>
            <div className={Components.pageTextHeader}>Lucky Coins</div>
            <div className="fs-15">{"Click \"DRAW\" button below to get random free coins"}</div>
            <div className="fs-10">{"* 1x Lucky Ticket Required"}</div>
            <div align="center" className="mb-3">
                <Image src={img} alt="background" width={300} height={300}/>
                <div>
                    <button className="btn-green" onClick={()=>drawClick(app)}>DRAW</button>
                </div>
            </div>
            <div className="box">
                <ul className="line-height-20">
                    <li className="fs-15 light">You can only get 50k coins only once</li>
                    <li className="fs-15 light">while for 20k, 10k, and 5k coins it can be many times</li>
                    <li className="fs-15 light">also you still have a chance to get nothing</li>
                </ul>
            </div>
        </div>
    )
}

function drawClick(app, balance){
    const { tickets } = app.getBalance()
    if(tickets == 0) return openInsufficientTickets(app)
    const transaction = new Transaction({id: "NO_ID"}, Transaction.TYPE.TICKET)
    transaction.purchase()
    const process = new LuckyCoinProccess()
    const result = process.execute()
    openResultDialog(app, result)
}

function openResultDialog(app, result){
    const body = (
        <div align="center">
            <div className="fs-15">{result.text}</div>
            <Image src={result.reward == 0 ? unlucky : happy} alt="result expression" width={150} height={150}/>
        </div>
    )
    const footer = (
        <div align="center" className="absolute-bottom">
            <button className="fs-15 btn-blue" onClick={()=>_addBalance(app, result.reward)}>OK</button>
        </div>
    )
    app.showDialog({
        title: "Reward Result", 
        body, 
        footer,
        dialogSize: app.dialogSize.SM
    })
}

function _addBalance(app, total){
    if(total!=0){
        StorageManager.addBalanceHistory({
            total: total,
            refId: "",
            refObject: "lucky_coin",
            type: Balance.TYPE.COIN
        })
    }
    app.refreshBalance()
    app.closeDialog()
}

function openInsufficientTickets(app){
    const body = (
        <div align="center">
            <div className="fs-15">{"Sorry you don't have ticket for draw free coin"}</div>
            <Image src={WavyBus} alt="image Insufficient coins" width={150} height={150}/>
        </div>
    )
    const footer = (
        <div align="center" className="absolute-bottom">
            <button className="fs-15 btn-blue" onClick={()=>app.closeDialog()}>Close</button>
        </div>
    )
    app.showDialog({
        title: "Ooopss Insufficient Ticket", 
        body, 
        footer,
        dialogSize: app.dialogSize.SM
    })
}