import { useState, useEffect } from 'react'
import App from "../core/app"
import Layout from '../components/layout'
import Dialog from '../components/dialog'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	const [app, setApp] = useState(new App())
	const [isDialog, setIsDialog] = useState(false)
	const [dialogData, setDialogData] = useState({})
	
	useEffect(()=>{
		app.toggleDialog = (value, {title, type, body, callback})=>{
			setIsDialog(value)
			setDialogData({title, type, body, callback})
		}
	}, [])

	if(isDialog) return (
		<Dialog app={app} title={dialogData.title} type={dialogData.type} callback={dialogData.callback}>
			{dialogData.body}
		</Dialog>
	)

	return (
		<Layout>
			<Component {...pageProps} app={app} />
		</Layout>
  	)
}


export default MyApp
