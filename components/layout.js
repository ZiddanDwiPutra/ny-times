import Header from "./header"
import SideBar from "./side-bar"

export default function Layout({children}) {
	return (
		<div>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<main className={"col-md-10"}>{children}</main>
					<div className={"col-md-2"}>
						<SideBar />
					</div>
				</div>
			</div>
		</div>
	)
}