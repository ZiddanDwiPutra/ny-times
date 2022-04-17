import Components from "../../styles/Components.module.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Image from "next/image"
import PurchaseConfirmationBody from "../../components/purchase-confirmation-body"
import StorageManager from "../../src/storageManager"
import Lib from "../../src/lib"
import Transaction from "../../src/transaction"

export default function ArticleDetail({ app }){
    const [isPurchased, setIsPurchased] = useState(false);
    const router = useRouter()
    const { param } = router.query
    
    const article = decodeParam(app, param)
    effectByParam(param, setIsPurchased, article ? article.id : "")
    
    if(article == undefined) return
    
    return (
        <div className={Components.pageBox + " container-fluid"}>
            <div className={Components.pageTextHeader}>Article Detail</div>
            <div className="row">
                <div className="col-md-4">
                    {article.hasMetaData? <Image src={article.metadata.url} width={article.metadata.width} height={article.metadata.height}/>: ""}
                </div>
                <div className="col-md-8">
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

function effectByParam(param, callback, articleId){
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
    if(coins < article.priceNum)return alert("money not available")
    app.showDialog({
        title: "Purchase Confirmation", 
        type: app.dialogType.CONFIRMATION, 
        body: <PurchaseConfirmationBody app={app} article={article}/>, 
        dialogSize: app.dialogSize.LG,
        callback: condition=>{
            const transaction = new Transaction(article)
            if(condition) {
                transaction.purchase()
                location.reload()
            }
        }
    })
}
