
export default function SearchBar({ placeholder, onInput }){
    return(
        <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control fs-15" placeholder={placeholder} onInput={(e)=>onInput(e.target.value)}/>
        </div>
    )
}