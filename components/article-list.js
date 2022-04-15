import { useState } from "react";
import Article from "./article";

export default function ArticleList({ type = "card-list" }){
    const [articles] = useState([
        {id: 1, title: "Juice title", abstract: "Wowo"},
        {id: 2, title: "Juice title", abstract: "Wowo"},
    ]);

    return (
        <div>
            {getArticleList(articles)}
        </div>
    )
}

function getArticleList(dataList){
    let articles = [];
    for(let data of dataList){
        articles.push(<Article title={data.title} abstract={data.abstract} key={data.id}/>);
    }
    return articles;
}