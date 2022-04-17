import Components from "../styles/Components.module.css"
import ArticleList from "../components/article-list"
export default function PurchasedArticles({ app }){
    return (
        <div className={Components.pageBox + " container-fluid"}>
            <div className={Components.pageTextHeader}>Purchased Articles</div>
            <ArticleList app={app} isPurchasedOnly={true}/>
        </div>
    )
}