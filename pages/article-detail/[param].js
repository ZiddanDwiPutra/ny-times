import Components from "../../styles/Components.module.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Image from "next/image"
import StorageManager from "../../core/storageManager"

export default function ArticleDetail({ app }){
    const [isPurchased, setIsPurchased] = useState(false);
    const router = useRouter()
    const { param } = router.query
    
    let article = undefined
    let hasMetadata = false
    if(param){
        article = app.decodeFromParamUri(param)
        article.metadata = app.getMetadataFromMedia(article.media, 2)
        article.publishDate = app.dateFormat(article.published_date)
        hasMetadata = article.metadata!=""
    }
    
    useEffect(()=>{
        if(param){
            const finded = StorageManager.getPurchasedArticles().find(id => id == article.id)
            if(finded) setIsPurchased(true)
        }
    }, [param])
    
    if(article == undefined) return <h1>404 - Page Not Found</h1>
    
    const purchaseSection = !isPurchased ?(
        <div className={Components.purchaseSection}>
            <div>
                <span className={Components.price}>{article.price > 0 ? article.price+" NYT Coin" : "FREE"}</span>
            </div>
            <button className="btn-green" onClick={()=>buyClick(app, article)}>BUY</button>
        </div>
    ) : (<div></div>)

    return (
        <div className={Components.pageBox + " container-fluid"}>
            <div className={Components.pageTextHeader}>Article Detail</div>
            <div className="row">
                <div className="col-md-4">
                    {hasMetadata? <Image src={article.metadata.url} width={article.metadata.width} height={article.metadata.height}/>: ""}
                </div>
                <div className="col-md-8">
                    <div className="fs-30 bold">{article.title}</div>
                    <div className="fs-10 light">{article.byline}</div>
                    <div className="fs-10 light">{article.publishDate}</div>
                    <p>{article.abstract}</p>

                    {purchaseSection}
                </div>
            </div>
        </div>
    )
}

function buyClick(app, article){
    const body = (
        <div>
            <div className="bold">Do you agree to the following purchases:</div><br/>
            <div>Article Title : <span className="light">{article.title}</span></div>
            <div>Published on : <span className="light">{article.publishDate}</span> </div>
            <div>Price : <span className="light">{article.price} NYT Coin</span></div>
            <div>
                <ul>
                    <li className="fs-10">by clicking the accept button, you mean that you have knowingly agreed to all the terms and conditions of purchase</li>
                    <li className="fs-10">Purchased content cannot be refunded</li>
                    <li className="fs-10">You have also agreed to all customer rules applied to the NY Times</li>
                </ul>
            </div>
        </div>
    )

    app.showDialog({
        title: "Purchase Confirmation", 
        type: app.dialogType.CONFIRMATION, 
        body, 
        callback: condition=>{
            if(condition){
                StorageManager.addPurchasedArticles(article.id);
                console.log(StorageManager.getPurchasedArticles());
            }
        }
    })
}
