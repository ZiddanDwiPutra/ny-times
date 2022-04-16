export default class App{
	constructor(){
		this.appName = "NYTimes"
		this.isShowDialog = false
	}

	get month(){
		return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	}

	get dialogType(){
		return {
			CONFIRMATION: "CONFIRMATION",
			DIALOG: "DIALOG",
		}
	}

	toggleDialog(isDialogShow, {title, type, body, callback}){/* use for callback */}
	
	showDialog({title, type = this.dialogType.DIALOG, body, callback}){
		this.toggleDialog(true, {title, type, body, callback})
	}

	closeDialog(){
		this.toggleDialog(false, {})
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
}