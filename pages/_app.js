import { useState, useEffect } from 'react'
import App from "../src/app"
import Layout from '../components/layout'
import Dialog from '../components/dialog'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	const [app] = useState(new App())
	const [isDialog, setIsDialog] = useState(false)
	const [dialogData, setDialogData] = useState({})
	
	effectOnce(app, {setIsDialog, setDialogData})

	return (
		<Layout app={app}>
			<Dialog app={app} isVisible={isDialog} dialogSize={dialogData.dialogSize} title={dialogData.title} type={dialogData.type} callback={dialogData.callback}>
				{dialogData.body}
			</Dialog>
			<Component {...pageProps} app={app} />
		</Layout>
  	)
}

function effectOnce(app, {setIsDialog, setDialogData}){
	useEffect(()=>{
		app.toggleDialog = (value, {title, type, body, dialogSize, callback})=>{
			setIsDialog(value)
			setDialogData({title, type, body, dialogSize, callback})
		}
	}, [])
}

export default MyApp
