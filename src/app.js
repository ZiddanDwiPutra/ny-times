export default class App{
	constructor(){
		this.appName = "NYTimes"
		this.isShowDialog = false
		this.userName = "@UserDemo_01"
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

	getMetadataFromMedia(media = [], imageIdx){
		const image = media.find(e=>e.type==="image")
		const hasMetadata = image? image["media-metadata"] : false
		return hasMetadata ? image["media-metadata"][imageIdx] : ""
	}
}