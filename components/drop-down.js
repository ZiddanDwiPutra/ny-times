import { useEffect } from "react"

export default function DropDown({ items, onInput, value}){
    useEffect(()=>{
        if(items.length>0) onInput(items[0].id)
    }, [])
    const itemChilds = []
    for(let item of items) itemChilds.push(<option className="fs-15" key={item.id} value={item.id}>{item.name}</option>)
    return <select value={value} className="form-select fs-15 pointer" onInput={(e)=>onInput(e.target.value)}>{itemChilds}</select>
}