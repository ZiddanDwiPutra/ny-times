export default function Dialog({ app, title = "Dialog", children, footer, type, callback }){

    const confirmationButton = (
        <div className="dialog-footer">
            <button className="btn-blue" onClick={()=>handleConfirmation(true, callback, app)}>Accept</button>
            <button className="btn-gray" onClick={()=>handleConfirmation(false, callback, app)}>Cancel</button>
        </div>
    )

    return (
        <div className="dialog">
            <div className="dialog-title bold">{title}</div>
            <div className="dialog-body">{children}</div>
            {type === "CONFIRMATION"? confirmationButton : footer}
        </div>
    )
}

function handleConfirmation(condition, callback, app){
    callback(condition)
    app.closeDialog()
}