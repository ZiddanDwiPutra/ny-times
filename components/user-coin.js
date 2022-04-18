import { useEffect, useState } from "react"
import Balance from "../src/balance"
import Lib from "../src/lib"

export default function UserCoin({ app }){
    const [balance, setBalance] = useState({coins: 0, tickets: 0})
    useEffect(()=>{
        setBalance(new Balance())
        app.setBalance = setBalance
    }, [app])

    return (
        <div className="mb-1">
            <div align="right" className="box bg-black">
                <div className="bold fs-10">{app.userName}</div>
                <div className="fs-10 light">{Lib.setToDigitFormat(balance.coins)} NYT Coins</div>
                <div className="fs-10 light">{balance.tickets} Lucky Tickets</div>
            </div>
        </div>
    )
}