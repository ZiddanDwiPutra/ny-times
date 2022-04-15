export default function Article({title, abstract}){
    return (
        <div className="row">
            <div className="col-md-6">
                <div>{title}</div>
                <div>{abstract}</div>
            </div>
        </div>
    )
}