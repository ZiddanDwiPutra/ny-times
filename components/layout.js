import Header from "./header"
import SideBar from "./side-bar"
import Dialog from '../components/dialog'
import { useState, useEffect } from 'react'
import Footer from "./footer"

export default function Layout({ children , app}) {
	const [isDialog, setIsDialog] = useState(false)
	const [dialogData, setDialogData] = useState({})
	
	useEffectOnce(app, {setIsDialog, setDialogData})
	return (
		<div>
			<Header />
			<Dialog app={app} isVisible={isDialog} {...dialogData}>
				{dialogData.body}
			</Dialog>
			<div className="container-fluid">
				<div className="row">
					<div className={"d-lg-none col-md-12"}>
						<SideBar app={app}/>
					</div>
					<main className={"col-md-12 col-lg-9 col-xl-10"}>{children}</main>
					<div className={"d-none d-lg-block col-lg-3 col-xl-2"}>
						<SideBar app={app}/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

function useEffectOnce(app, {setIsDialog, setDialogData}){
	useEffect(()=>{
		app.toggleDialog = (value, {title, type, body, dialogSize, footer, options, callback})=>{
			setIsDialog(value)
			setDialogData({title, type, body, dialogSize, footer, options, callback})
			if(value)document.body.style.overflowY = "hidden"
			else document.body.style.overflowY = "auto"
		}
	})
}