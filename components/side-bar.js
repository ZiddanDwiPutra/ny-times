import Components from "../styles/Components.module.css"
import UserCoin from "./user-coin"
import Link from "next/link"
import { useRouter } from "next/router"
export default function SideBar({ app }){
    const router = useRouter()

    return (
        <div className={Components.sideBarBox}>
            <UserCoin app={app} />
            <nav>
                <Link href={"/"} passHref><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/")}>Articles</button></Link>
                <Link href={"/purchased-articles"} passHref><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/purchased-articles")}>Purchased Articles</button></Link>
                <Link href={"/lucky-coin"} passHref><button className={"fs-10 bold mb-1 " + isActive(router.pathname, "/lucky-coin")}>Lucky Coin</button></Link>
            </nav>
        </div>
    )
}

function isActive(routerPath, pathname){
    if(routerPath == pathname) return 'active'
}
