import Components from "../styles/Components.module.css"
import UserCoin from "./user-coin"
import Link from "next/link"
import { useRouter } from "next/router"
export default function SideBar({ app }){
    const router = useRouter()
    const resetHint = "for reset all of data to start again"

    return (
        <div className={Components.sideBarBox}>
            <UserCoin app={app} />
            <nav>
                <Link href={"/"}><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/")}>Articles</button></Link>
                <Link href={"/purchased-articles"}><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/purchased-articles")}>Purchased Articles</button></Link>
                <Link href={"/lucky-coin"}><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/lucky-coin")}>Lucky Coin</button></Link>
            </nav>
            <div align="center">
                <a className="fs-10" style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>reset()} title={resetHint}>reset</a>
            </div>
        </div>
    )
}

function isActive(routerPath, pathname){
    if(routerPath == pathname) return 'active'
}

function reset(){
    localStorage.clear()
    location.href = "/"
}