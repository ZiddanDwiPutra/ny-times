import Image from "next/image"
import Link from "next/link";
import Components from "../styles/Components.module.css"

export default function Article({data, app, type = "2-col"}){    
    const {id, title, abstract, media} = data
    let price = 1000
    const metadata = app.getMetadataFromMedia(media, 1)
    const hasMetadata = metadata!="";
    return (
        <Link
            href={{
                pathname: '/article-detail/[param]',
                query: { param: app.encodeAsParamUri(Object.assign({price}, data)) },
            }}
        >
            <div className={`row ${Components.card}`}>
                <div className={hasMetadata? "col-md-2": "display-none"}>
                    {hasMetadata? <Image src={metadata.url} width={metadata.width} height={metadata.height} style={{float: "left"}}/>: ""}
                </div>
                <div className={"col-md-10"}>
                    <div className="bold fs-30">{title}</div>
                    <div>{abstract}</div>
                    <div className={Components.price}>{price > 0 ? price+" NYT Coin" : "FREE"}</div>
                </div>
            </div>
        </Link>
    )
}