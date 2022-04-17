import Components from "../styles/Components.module.css"
import { useEffect, useState } from "react"
import ArticleList from "../components/article-list"
import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
export default function PurchasedArticles({ app }){
    return (
        <div className={Components.pageBox + " container-fluid"}>
            <div className={Components.pageTextHeader}>Purchased Articles</div>
            <ArticleList app={app} isPurchasedOnly={true}/>
        </div>
    )
}