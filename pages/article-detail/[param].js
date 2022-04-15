import Components from "../../styles/Components.module.css"
import { useRouter } from 'next/router'
import Image from "next/image"

export default function ArticleDetail({ app }){
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
    console.log(article)
    
    if(article == undefined) return <h1>404 - Page Not Found</h1>
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

                    <div className={Components.purchaseSection}>
                        <div className={Components.price}>{article.price > 0 ? article.price+" NYT Coin" : "FREE"}</div>
                        <button onClick={()=>buyClick(app, article)}>BUY</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function buyClick(app, article){
    const body = (
        <div>Are You Sure</div>
    )
    app.showConfirmation("Purchase Confirmation", body, condition=>{
        if(condition){
            alert(true);
        }
    })
}
