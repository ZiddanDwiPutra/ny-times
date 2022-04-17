export default function DropDown({ items, onInput}){
    const itemChilds = []
    for(let item of items) itemChilds.push(<option className="fs-15" key={item.id} value={item.id}>{item.name}</option>)
    return <select className="form-select fs-15 pointer" onInput={(e)=>onInput(e.target.value)}>{itemChilds}</select>
}