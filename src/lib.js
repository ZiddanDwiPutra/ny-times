export default class Lib{
	static get month(){
		return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	}
    static dateFormat(value){
		const date = new Date(value)
		const yyyy = date.getFullYear()
		let mm = this.month[date.getMonth()]
		let dd = date.getDate()
		dd += this.getOrdinal(dd)

		return mm + ' ' + dd + ', ' + yyyy
	}

	static getOrdinal(date){
		if(String(date).endsWith(1) && date!=11)return "st"
		else if(String(date).endsWith(2) && date!=12)return "nd"
		else if(String(date).endsWith(3) && date!=13)return "rd"
		else return "th"
	}

    static encodeAsParamUri(value){
		return encodeURIComponent(JSON.stringify(value))
	}
	
	static decodeFromParamUri(value){
		const decodeResult = decodeURIComponent(value)
		return JSON.parse(decodeResult)
	}
}