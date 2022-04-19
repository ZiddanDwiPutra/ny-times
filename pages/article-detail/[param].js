import Components from "../../styles/Components.module.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import PurchaseConfirmationBody from "../../components/purchase-confirmation-body"
import StorageManager from "../../src/storageManager"
import Lib from "../../src/lib"
import Transaction from "../../src/transaction"
import wavyBus from "../../public/assets/wavy_bus.jpg"
import ticket from "../../public/assets/ticket.png"
import happy from "../../public/assets/happy.jpg"
import Balance from "../../src/balance"

function purchaseAction(condition){} // interface

export default function ArticleDetail({ app }){
    const [isPurchased, setIsPurchased] = useState(false);
    const router = useRouter()
    const { param } = router.query
    purchaseAction = setIsPurchased
    
    const article = decodeParam(app, param)
    useEffectByParam(param, setIsPurchased, article ? article.id : "")
    
    if(article == undefined) return
    
    return (
        <div className={Components.pageBox + " container-fluid"}>
            <div className={Components.pageTextHeader}>Article Detail</div>
            <div className="row">
                <div className={article.hasMetaData ? "col-md-4": ""}>
                    {article.hasMetaData? <Image src={article.metadata.url} width={article.metadata.width} height={article.metadata.height}/>: ""}
                </div>
                <div className={article.hasMetaData ? "col-md-8": ""}>
                    <div className="fs-30 bold">{article.title}</div>
                    <div className="fs-10 light">{article.byline}</div>
                    <div className="fs-10 light">{article.publishDate}</div>
                    <p>{article.abstract}</p>

                    <PurchaseAction isPurchased={isPurchased} article={article} app={app} />
                </div>
            </div>
        </div>
    )
}

function PurchaseAction({isPurchased, article, app}){
    return !isPurchased ?(
        <div className={Components.purchaseSection}>
            <div>
                <span className={Components.price}>{article.price > 0 ? article.price+" NYT Coin" : "FREE"}</span>
            </div>
            <button className="btn-green fs-15" onClick={()=>buyClick(app, article)}>BUY</button>
        </div>
    ) : (
        <div>
            <button className="fs-15" onClick={()=>openOriginalClick(article.url)}>Open Original Article <i className="bi-box-arrow-up-right"/></button>
        </div>
    )
}

function decodeParam(app, param){
    let article = undefined
    if(param){
        article = Lib.decodeFromParamUri(param)
        article.publishDate = Lib.dateFormat(article.published_date)
        article.metadata = app.getMetadataFromMedia(article.media, 2)
        article.hasMetaData = article.metadata!=""
    }
    return article
}

function useEffectByParam(param, callback, articleId){
    useEffect(()=>{
        if(param){
            const isPurchased = StorageManager.getPurchasedArticles().find(obj => obj.id == articleId)
            if(isPurchased) callback(true)
        }
    }, [param])
}

function openOriginalClick(url){
    window.open(url, "_blank", "");
}

function buyClick(app, article){
    const {coins} = app.getBalance()
    if(coins < article.priceNum)return openInsufficientCoins(app)
    openPurchaseConfirmation(app, article)   
}

function openPurchaseConfirmation(app, article){
    app.showDialog({
        title: "Purchase Confirmation", 
        type: app.dialogType.CONFIRMATION, 
        body: <PurchaseConfirmationBody app={app} article={article}/>, 
        dialogSize: app.dialogSize.LG,
        callback: condition=>{
            const transaction = new Transaction(article)
            if(condition) {
                transaction.setCallback((emit)=>handleMoreEqual50k(emit, app))
                transaction.purchase()
                purchaseAction(true)
                app.refreshBalance()
            }
        }
    })
}

function handleMoreEqual50k({ isMoreEqual50k }, app){
    if(isMoreEqual50k) setTimeout(()=>openGotLuckyTickets(app), 100)
}

function openInsufficientCoins(app){
    const body = (
        <div align="center">
            <div className="fs-15">go to lucky coin page if you want to draw free coin by using 1 lucky ticket</div>
            <Image src={wavyBus} alt="image Insufficient coins" width={150} height={150}/>
        </div>
    )
    const footer = (
        <div align="center" className="absolute-bottom">
            <Link passHref href={"/lucky-coin"}>
                <button className="fs-15 btn-blue" onClick={()=>app.closeDialog()}>Lucky Coins</button>
            </Link>
        </div>
    )
    app.showDialog({
        title: "Ooopss Insufficient Coins", 
        body, 
        footer,
        dialogSize: app.dialogSize.SM
    })
}

function openGotLuckyTickets(app){
    const closeDialog = ()=>{
        app.closeDialog()
        _add3LuckyTicket(app)
    }

    const body = (
        <div align="center">
            <div className="fs-15">congrats you got 3 lucky tickets, go to lucky coin page and get free coins</div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4"><Image src={ticket} alt="image got lucky tickets" width={100} height={100}/></div>
                <div className="col-md-4"><Image src={happy} alt="image happy" width={150} height={150}/></div>
            </div>
        </div>
    )
    const footer = (
        <div align="center" className="absolute-bottom">
            <button className="fs-15 btn-blue" onClick={()=>closeDialog()}>OK</button>
        </div>
    )
    
    app.showDialog({
        title: "Free Tickets", 
        body, 
        footer,
        dialogSize: app.dialogSize.SM
    })
}

function _add3LuckyTicket(app){
    StorageManager.addBalanceHistory({
        total: 3,
        refId: "",
        refObject: "lucky_ticket_addition",
        type: Balance.TYPE.TICKET
    })
    app.refreshBalance()
}