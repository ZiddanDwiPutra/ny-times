import { useState, useEffect } from "react";
import MainApi from "../services/MainApi";
import StorageManager from "../src/storageManager";
import Article from "./article";
import DropDown from "./drop-down";
import SearchBar from "./search-bar";

export default function ArticleList({ app , isPurchasedOnly = false }){
    const [articles, setArticles] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [filterBy, setFilterBy] = useState("")

    const filterItems = [
        {id: "most_emailed", name: "Most Emailed"},
        {id: "most_shared", name: "Most Shared"},
        {id: "most_viewed", name: "Most Viewed"},
    ]

    useEffect(()=>{
        if(filterItems.length>0 && isPurchasedOnly) filterChange("purchased", setArticles)
    }, []);
    
    useEffect(()=>setPageNumber(1), [searchValue, filterBy])

    return (
        <div className="container m-1">
            <div className="row">
                {   
                    isPurchasedOnly? "" :
                    <div className="col-md-4">
                        <DropDown items={filterItems} onInput={(id)=>{filterChange(id, setArticles);setFilterBy(id)}} />
                    </div>
                }
                <div className="col-md-8">
                    <SearchBar onInput={(value)=>setSearchValue(value)} placeholder="Search Article by Title or Abstract " />
                </div>
            </div>
            
            <Articles dataList={articles} searchValue={searchValue} app={app} limitPerPage={5} pageNumber={pageNumber} setTotalPage={setTotalPage}/>
            {articles.length>0? <Pagination setPageNumber={setPageNumber} pageNumber={pageNumber} totalPage={totalPage} /> : <div>No data result</div>}
        </div>
    )
}

function Articles({searchValue, dataList, limitPerPage, pageNumber, setTotalPage, app}){
    const [filteredList, setFilteredList] = useState([])
    useEffect(()=>{
        let result = dataList.filter(article => 
            article.title.toLowerCase().includes(searchValue.toLowerCase()) || 
            article.abstract.toLowerCase().includes(searchValue.toLowerCase()))
        
        setTotalPage(result.length <= limitPerPage? 1 : Math.round(result.length / 5))
        setFilteredList(result.splice(limitPerPage*(pageNumber-1), limitPerPage))
    }, [searchValue, dataList, app, limitPerPage, pageNumber])
    
    let articles = [];
    for(let data of filteredList){
        articles.push(<Article data={data} app={app} key={data.id}/>);
    }
    return articles;
}

function Pagination({pageNumber, totalPage, setPageNumber}){
    return (
        <div align="right">
            <button className="fs-15 no-min-width mr-1" disabled={pageNumber==1? true: false} onClick={()=>setPageNumber(--pageNumber)}><i className="bi-caret-left-square-fill"/></button>
            <button className="fs-15 no-min-width mr-1" style={{paddingTop: "15px"}}>{pageNumber}</button>
            <button className="fs-15 no-min-width" disabled={pageNumber==totalPage? true: false} onClick={()=>setPageNumber(++pageNumber)}><i className="bi-caret-right-square-fill"/></button>
        </div>
    )
}

function filterChange(filterId, setArticles){
    if(filterId=="most_viewed") MainApi.getMostViewed(response=>setArticles(response.results))  
    else if(filterId=="most_shared") MainApi.getMostShared(response=>setArticles(response.results))  
    else if(filterId=="most_emailed") MainApi.getMostEmailed(response=>setArticles(response.results))
    else if(filterId=="purchased"){
        setTimeout(()=>{
            setArticles(StorageManager.getPurchasedArticles())
        }, 100)
    }
}