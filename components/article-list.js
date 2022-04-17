import { useState, useEffect } from "react";
import MainApi from "../services/MainApi";
import Article from "./article";
import DropDown from "./drop-down";
import SearchBar from "./search-bar";

export default function ArticleList({ app }){
    const [articles, setArticles] = useState([]);
    const [searchValue, setSearchValue] = useState("");
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
                <div className="col-md-4">
                    <DropDown items={filterItems} onInput={(id)=>filterChange(id, setArticles)} />
                </div>
                <div className="col-md-8">
                    <SearchBar onInput={(value)=>setSearchValue(value)} placeholder="Search Article by Title or Abstract " />
                </div>
            </div>
            <Articles dataList={articles} searchValue={searchValue} app={app}/>
        </div>
    )
}

function Articles({searchValue, dataList, app}){
    const [filteredList, setFilteredList] = useState([])
    useEffect(()=>{
        let result = dataList.filter(article => 
            article.title.toLowerCase().includes(searchValue.toLowerCase()) || 
            article.abstract.toLowerCase().includes(searchValue.toLowerCase()))
        setFilteredList(searchValue=="" ? dataList : result)
    }, [searchValue, dataList, app])
    
    let articles = [];
    for(let data of filteredList){
        articles.push(<Article data={data} app={app} key={data.id}/>);
    }
    return articles;
}

function filterChange(filterId, setArticles){
    if(filterId=="most_viewed") MainApi.getMostViewed(response=>setArticles(response.results))  
    if(filterId=="most_shared") MainApi.getMostShared(response=>setArticles(response.results))  
    if(filterId=="most_emailed") MainApi.getMostEmailed(response=>setArticles(response.results))  
}