import Header from "./header"
import SideBar from "./side-bar"

export default function Layout({ children , app}) {
	return (
		<div>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<div className={"d-lg-none col-md-12"}>
						<SideBar app={app}/>
					</div>
					<main className={"col-md-12 col-lg-9"}>{children}</main>
					<div className={"d-none d-lg-block col-lg-3"}>
						<SideBar app={app}/>
					</div>
				</div>
			</div>
		</div>
	)
}