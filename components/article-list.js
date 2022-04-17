import { useState, useEffect } from "react";
import MainApi from "../services/MainApi";
import Article from "./article";

export default function ArticleList({ app }){
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        // console.log(app)
        MainApi.getMostViewed(response=>{
            setArticles(response.results);
        })    
    }, []);

    return (
        <div>
            {getArticleList(articles, app)}
        </div>
    )
}

function getArticleList(dataList, app){
    let articles = [];
    for(let data of dataList){
        articles.push(<Article data={data} app={app} key={data.id}/>);
    }
    return articles;
}