import { useState } from 'react'
import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	const [app, setApp] = useState(new App());
	
	return (
		<Layout>
			<Component {...pageProps} app={app} />
		</Layout>
  	)
}

class App{
	constructor(){
		this.appName = "NYTimes"
		this.isShowDialog = false
	}

	get month(){
		return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	}

	encodeAsParamUri(value){
		return encodeURIComponent(JSON.stringify(value))
	}
	
	decodeFromParamUri(value){
		const decodeResult = decodeURIComponent(value)
		return JSON.parse(decodeResult)
	}

	getMetadataFromMedia(media = [], imageIdx){
		const image = media.find(e=>e.type==="image")
		const hasMetadata = image? image["media-metadata"] : false
		return hasMetadata ? image["media-metadata"][imageIdx] : ""
	}

	dateFormat(value){
		const today = new Date(value)
		const yyyy = today.getFullYear()
		let mm = this.month[today.getMonth()]
		let dd = today.getDate()
		dd += this.getOrdinal(dd)

		return mm + ' ' + dd + ', ' + yyyy
	}

	getOrdinal(date){
		if(String(date).endsWith(1) && date!=11)return "st"
		else if(String(date).endsWith(2) && date!=12)return "nd"
		else if(String(date).endsWith(3) && date!=13)return "rd"
		else return "th"
	}

	toggleClassOfElement(target, className){
		const el = document.body.querySelector(target)
		if(el){
			const isActive = el.className.includes(className)
			if(isActive)el.className = el.className.replace(" "+className, "")
			else el.className += className
		} 
	}

	showDialog(title, body, callback){
		this.isShowDialog = true
		this.toggleClassOfElement(".dialog", "display-none")
		document.body.querySelector(".dialog").innerHTML = body.toString()
		// this.handleDialog(title, body, callback);
	}

	showConfirmation(title, body, callback){
		this.showDialog(title, body, callback)
	}
}

export default MyApp
