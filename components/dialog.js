export default function Dialog({ app, dialogSize,  isVisible, title = "Dialog", children, footer, type, options = {},callback }){

    const confirmationButton = (
        <div className="dialog-footer">
            <button className="btn-blue" onClick={()=>handleConfirmation(true, callback, app)}>Accept</button>
            <button className="btn-gray" onClick={()=>handleConfirmation(false, callback, app)}>Cancel</button>
        </div>
    )

    return (
        <div className={"wrapper ".concat(isVisible ? "":"d-none")} onClick={()=>closeDialog(app, options)}>
            <div className={"dialog ".concat( "dialog-size-" + dialogSize)}>
                <div className="dialog-title bold">{title}</div>
                <div className="dialog-body">{children}</div>
                {type === "CONFIRMATION"? confirmationButton : footer}
            </div>
        </div>
    )
}

function handleConfirmation(condition, callback, app){
    callback(condition)
    app.closeDialog()
}

function closeDialog(app, options){
    if(options.isWrapperClicked)app.closeDialog()
    if(typeof options.wrapperClicked == "function") options.wrapperClicked()
}