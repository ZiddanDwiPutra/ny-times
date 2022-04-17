import Image from "next/image"
import Link from "next/link"
import Components from "../styles/Components.module.css"
import ArticlePricing from "../src/articlePricing"
import Lib from "../src/lib"
import { useEffect, useState } from "react"
import StorageManager from "../src/storageManager"

export default function Article({data, app}){    
    const [isPurchased, setIsPurchased] = useState(false);
    const articleData = new ArticlePricing(data)
    const {id, price, title, abstract, media} = articleData
    const metadata = app.getMetadataFromMedia(media, 1)
    const hasMetadata = metadata!="";
    
    effectPurchased(id, setIsPurchased)

    return (
        <Link
            href={{
                pathname: '/article-detail/[param]',
                query: { param: Lib.encodeAsParamUri(articleData) },
            }}
        >
            <div className={`row ${Components.card}`}>
                <div className={hasMetadata? "col-md-2": "display-none"}>
                    {hasMetadata? <Image src={metadata.url} width={metadata.width} height={metadata.height} style={{float: "left"}}/>: ""}
                </div>
                <div className={"col-md-10"}>
                    <div className="bold">{title}</div>
                    <div>{abstract}</div>
                    {
                        isPurchased ? (
                            <div className={Components.purchased}>{"Purchased"}</div>
                        ) : (
                            <div className={Components.price}>{price > 0 ? price+" NYT Coin" : "FREE"}</div>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

function effectPurchased(articleId, callback){
    useEffect(()=>{
        if(articleId=="") return
        const isPurchased = StorageManager.getPurchasedArticles().find(obj => obj.id == articleId)
        if(isPurchased) callback(true)
    }, [])
}