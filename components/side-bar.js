import Components from "../styles/Components.module.css"
import UserCoin from "./user-coin"
import Link from "next/link"
import { useRouter } from "next/router"
import StorageManager from "../src/storageManager"
import Balance from "../src/balance"

export default function SideBar({ app }){
    const router = useRouter()
    
    return (
        <div className={Components.sideBarBox}>
            <UserCoin app={app} />
            <nav>
                <Link href={"/"}><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/")}>Articles</button></Link>
                <Link href={"/purchased-articles"}><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/purchased-articles")}>Purchased Articles</button></Link>
                <Link href={"/lucky-coin"}><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/lucky-coin")}>Lucky Coin</button></Link>
                <button className="fs-10 bold mb-1" onClick={()=>_addTenThousand(app)}>Add 100.000</button>
            </nav>

            <br/>
        </div>
    )
}

function isActive(routerPath, pathname){
    if(routerPath == pathname) return 'active'
}

function _addTenThousand(app){
    StorageManager.addBalanceHistory({
        total: 100000,
        refId: "",
        refObject: "INITIAL_COIN",
        type: Balance.TYPE.COIN
    })
    const {coins, tickets} = new Balance()
    app.setBalance({coins, tickets})
}