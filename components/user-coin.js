import { useEffect, useState } from "react"
import Balance from "../src/balance"
import Lib from "../src/lib"

export default function UserCoin({ app }){
    const [balance, setBalance] = useState({coins: 0, tickets: 0})
    
    useEffect(()=>{
        setBalance(new Balance())
    }, [])

    return (
        <div className="mb-1">
            <div align="right" className="box">
                <div className="bold fs-15">{app.userName}</div>
                <div className="fs-10">{Lib.setToDigitFormat(balance.coins)} NYT Coins</div>
                <div className="fs-10">{balance.tickets} Lucky Tickets</div>
            </div>
        </div>
    )
}