import Lib from "../src/lib"

export default function UserCoin({ app }){
    return (
        <div className="mb-1">
            <div align="right" className="box">
                <div className="bold fs-15">You are have : </div>
                <div className="fs-10">{Lib.setToDigitFormat(app.coins)} NYT Coins</div>
                <div className="fs-10">{app.luckyTickets} Lucky Tickets</div>
            </div>
        </div>
    )
}