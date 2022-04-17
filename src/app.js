import Balance from "./balance"

export default class App{
	constructor(){
		this.appName = "NYTimes"
		this.isShowDialog = false
		this.userName = "@UserDemo_01"
		this.coins = 0
		this.tickets = 0
	}

	get dialogType(){
		return {
			CONFIRMATION: "CONFIRMATION",
			DIALOG: "DIALOG",
		}
	}

	get dialogSize(){
		return {
			FULL: "full",
			LG: "lg",
			MD: "md",
			SM: "sm",
		}
	}

	toggleDialog(isDialogShow, {title, type, body, dialogSize, footer, callback}){/* use for callback */}
	setBalance({coins, tickets}){/* use for callback */}
	getBalance(){
		return new Balance()
	}
	refreshBalance(){
		const {coins, tickets} = this.getBalance()
		this.setBalance({coins, tickets})
	}
	
	showDialog({title, type = this.dialogType.DIALOG, body, dialogSize, footer, callback}){
		this.toggleDialog(true, {title, type, body, dialogSize, footer, callback})
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