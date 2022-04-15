import Header from "./header"
import Home from "../styles/Home.module.css"

export default function Layout({children}) {
	return (
		<div>
			<Header />
			<main className={Home.main}>{children}</main>
		</div>
	)
}