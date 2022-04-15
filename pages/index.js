import ArticleList from "../components/article-list"

export default function Home(props){
    return(
        <div className="container">
            <ArticleList {...props}/>
        </div>
    )
}