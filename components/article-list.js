import { useState, useEffect } from "react";
import MainApi from "../services/MainApi";
import Article from "./article";
import DropDown from "./drop-down";

export default function ArticleList({ app }){
    const [articles, setArticles] = useState([]);
    const filterItems = [
        {id: "most_emailed", name: "Most Emailed"},
        {id: "most_shared", name: "Most Shared"},
        {id: "most_viewed", name: "Most Viewed"},
    ]

    useEffect(()=>{
        if(filterItems.length>0) filterChange(filterItems[0].id, setArticles)
    }, []);

    return (
        <div className="container m-1">
            <div className="row">
                <div className="col-md-4"><DropDown app={app} items={filterItems} onInput={(id)=>filterChange(id, setArticles)} /></div>
            </div>
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

function filterChange(filterId, setArticles){
    if(filterId=="most_viewed") MainApi.getMostViewed(response=>setArticles(response.results))  
    if(filterId=="most_shared") MainApi.getMostShared(response=>setArticles(response.results))  
    if(filterId=="most_emailed") MainApi.getMostEmailed(response=>setArticles(response.results))  
}