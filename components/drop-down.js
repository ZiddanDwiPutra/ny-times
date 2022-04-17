export default function DropDown({ app, items, onInput}){
    const itemChilds = []
    for(let item of items) itemChilds.push(<option key={item.id} value={item.id}>{item.name}</option>)
    return <select className="form-select" onInput={(e)=>onInput(e.target.value)}>{itemChilds}</select>
}